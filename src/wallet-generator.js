/**
 * Cryptocurrency Wallet Generator
 *
 * Generates wallets for multiple cryptocurrencies using Tatum API
 * Supports Bitcoin, Ethereum, Litecoin, Bitcoin Cash, Dogecoin, and more
 *
 * @author Jakob Richert
 * @see https://github.com/jakobrichert
 */

const { generateWallet, generateAddressFromXPub, generatePrivateKeyFromMnemonic, Currency } = require("@tatumio/tatum");

/**
 * Supported cryptocurrencies
 */
const SUPPORTED_CURRENCIES = {
    BTC: { name: 'Bitcoin', symbol: 'BTC', testnet: false },
    ETH: { name: 'Ethereum', symbol: 'ETH', testnet: false },
    LTC: { name: 'Litecoin', symbol: 'LTC', testnet: false },
    BCH: { name: 'Bitcoin Cash', symbol: 'BCH', testnet: false },
    DOGE: { name: 'Dogecoin', symbol: 'DOGE', testnet: false },
    BTC_TESTNET: { name: 'Bitcoin Testnet', symbol: 'BTC', testnet: true },
    ETH_TESTNET: { name: 'Ethereum Testnet', symbol: 'ETH', testnet: true }
};

/**
 * Generate a complete wallet with address and private key
 *
 * @param {string} currencyCode - Currency code (e.g., 'BTC', 'ETH')
 * @param {boolean} testnet - Use testnet instead of mainnet
 * @param {number} index - Derivation index for address generation
 * @returns {Object} Wallet object containing mnemonic, xpub, address, and private key
 */
async function generateCompleteWallet(currencyCode = 'BTC', testnet = false, index = 0) {
    try {
        console.log(`\n🔐 Generating ${testnet ? 'Testnet' : 'Mainnet'} wallet for ${currencyCode}...`);

        // Generate wallet
        const wallet = await generateWallet(Currency[currencyCode], testnet);
        console.log(`✅ Wallet generated successfully!`);

        // Generate address
        const address = await generateAddressFromXPub(
            Currency[currencyCode],
            testnet,
            wallet.xpub,
            index
        );
        console.log(`📬 Address generated: ${address}`);

        // Generate private key
        const privateKey = await generatePrivateKeyFromMnemonic(
            Currency[currencyCode],
            testnet,
            wallet.mnemonic,
            index
        );
        console.log(`🔑 Private key generated`);

        return {
            currency: currencyCode,
            testnet: testnet,
            mnemonic: wallet.mnemonic,
            xpub: wallet.xpub,
            address: address,
            privateKey: privateKey,
            index: index
        };

    } catch (error) {
        console.error(`❌ Error generating wallet for ${currencyCode}:`, error.message);
        throw error;
    }
}

/**
 * Generate multiple wallets for the same currency
 *
 * @param {string} currencyCode - Currency code
 * @param {boolean} testnet - Use testnet
 * @param {number} count - Number of wallets to generate
 * @returns {Array} Array of wallet objects
 */
async function generateMultipleWallets(currencyCode = 'BTC', testnet = false, count = 3) {
    console.log(`\n🔄 Generating ${count} wallets for ${currencyCode}...`);
    const wallets = [];

    for (let i = 0; i < count; i++) {
        const wallet = await generateCompleteWallet(currencyCode, testnet, i);
        wallets.push(wallet);
    }

    console.log(`\n✅ Generated ${count} wallets successfully!`);
    return wallets;
}

/**
 * Generate wallets for multiple currencies
 *
 * @param {Array} currencies - Array of currency codes
 * @param {boolean} testnet - Use testnet
 * @returns {Object} Object mapping currency codes to wallet objects
 */
async function generateMultiCurrencyWallets(currencies = ['BTC', 'ETH', 'LTC'], testnet = false) {
    console.log(`\n🌐 Generating multi-currency wallet portfolio...`);
    const portfolio = {};

    for (const currency of currencies) {
        try {
            portfolio[currency] = await generateCompleteWallet(currency, testnet, 0);
        } catch (error) {
            console.error(`Failed to generate ${currency} wallet:`, error.message);
        }
    }

    console.log(`\n✅ Portfolio generated with ${Object.keys(portfolio).length} currencies!`);
    return portfolio;
}

/**
 * Display wallet information in a formatted way
 *
 * @param {Object} wallet - Wallet object
 */
function displayWallet(wallet) {
    console.log('\n' + '='.repeat(80));
    console.log(`🪙  ${wallet.currency} Wallet ${wallet.testnet ? '(Testnet)' : '(Mainnet)'}`);
    console.log('='.repeat(80));
    console.log(`📝 Mnemonic:    ${wallet.mnemonic}`);
    console.log(`🔐 xPub:        ${wallet.xpub}`);
    console.log(`📬 Address:     ${wallet.address}`);
    console.log(`🔑 Private Key: ${wallet.privateKey}`);
    console.log(`#️⃣  Index:       ${wallet.index}`);
    console.log('='.repeat(80) + '\n');
}

/**
 * Main execution function
 */
async function main() {
    try {
        console.log('\n💼 Tatum Cryptocurrency Wallet Generator');
        console.log('=========================================\n');

        // Generate Bitcoin wallet
        const btcWallet = await generateCompleteWallet('BTC', false, 1);
        displayWallet(btcWallet);

        // Uncomment to generate more wallets:

        // Generate Ethereum wallet
        // const ethWallet = await generateCompleteWallet('ETH', false, 0);
        // displayWallet(ethWallet);

        // Generate multiple Bitcoin addresses
        // const btcWallets = await generateMultipleWallets('BTC', false, 3);
        // btcWallets.forEach(displayWallet);

        // Generate multi-currency portfolio
        // const portfolio = await generateMultiCurrencyWallets(['BTC', 'ETH', 'LTC'], false);
        // Object.values(portfolio).forEach(displayWallet);

        console.log('⚠️  SECURITY WARNING: Keep your mnemonic and private keys secure!');
        console.log('⚠️  Never share them with anyone or commit them to version control!\n');

    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

// Export functions for use in other modules
module.exports = {
    generateCompleteWallet,
    generateMultipleWallets,
    generateMultiCurrencyWallets,
    displayWallet,
    SUPPORTED_CURRENCIES
};

// Run main function if executed directly
if (require.main === module) {
    main();
}
