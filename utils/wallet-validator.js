/**
 * Wallet Validator Utility
 *
 * Validate cryptocurrency addresses and wallet data
 *
 * @author Jakob Richert
 */

/**
 * Validate Bitcoin address format
 *
 * @param {string} address - Bitcoin address
 * @returns {boolean} True if valid
 */
function isValidBitcoinAddress(address) {
    // Basic Bitcoin address validation (P2PKH, P2SH, Bech32)
    const p2pkhRegex = /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const p2shRegex = /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const bech32Regex = /^(bc1|tb1)[a-z0-9]{39,59}$/;

    return p2pkhRegex.test(address) || p2shRegex.test(address) || bech32Regex.test(address);
}

/**
 * Validate Ethereum address format
 *
 * @param {string} address - Ethereum address
 * @returns {boolean} True if valid
 */
function isValidEthereumAddress(address) {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate address for any supported currency
 *
 * @param {string} address - Cryptocurrency address
 * @param {string} currency - Currency code
 * @returns {boolean} True if valid
 */
function isValidAddress(address, currency) {
    switch (currency.toUpperCase()) {
        case 'BTC':
        case 'BTC_TESTNET':
        case 'LTC':
        case 'BCH':
        case 'DOGE':
            return isValidBitcoinAddress(address);
        case 'ETH':
        case 'ETH_TESTNET':
            return isValidEthereumAddress(address);
        default:
            return false;
    }
}

/**
 * Validate mnemonic phrase
 *
 * @param {string} mnemonic - Mnemonic phrase
 * @returns {boolean} True if valid
 */
function isValidMnemonic(mnemonic) {
    if (!mnemonic || typeof mnemonic !== 'string') {
        return false;
    }

    const words = mnemonic.trim().split(/\s+/);
    // Standard mnemonic lengths: 12, 15, 18, 21, 24 words
    return [12, 15, 18, 21, 24].includes(words.length);
}

/**
 * Validate wallet object structure
 *
 * @param {Object} wallet - Wallet object
 * @returns {Object} Validation result with errors
 */
function validateWallet(wallet) {
    const errors = [];

    if (!wallet) {
        errors.push('Wallet object is null or undefined');
        return { valid: false, errors };
    }

    if (!wallet.mnemonic || !isValidMnemonic(wallet.mnemonic)) {
        errors.push('Invalid or missing mnemonic');
    }

    if (!wallet.xpub || typeof wallet.xpub !== 'string') {
        errors.push('Invalid or missing xPub');
    }

    if (!wallet.address || typeof wallet.address !== 'string') {
        errors.push('Invalid or missing address');
    }

    if (!wallet.privateKey || typeof wallet.privateKey !== 'string') {
        errors.push('Invalid or missing private key');
    }

    if (!wallet.currency) {
        errors.push('Currency not specified');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports = {
    isValidBitcoinAddress,
    isValidEthereumAddress,
    isValidAddress,
    isValidMnemonic,
    validateWallet
};
