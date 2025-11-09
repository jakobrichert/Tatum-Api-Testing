/**
 * Balance Checker Utility
 *
 * Check cryptocurrency wallet balances using Tatum API
 *
 * @author Jakob Richert
 */

const { getAccountBalance, Currency } = require("@tatumio/tatum");

/**
 * Check balance for a specific address
 *
 * @param {string} address - Wallet address to check
 * @param {string} currency - Currency code (BTC, ETH, etc.)
 * @returns {Object} Balance information
 */
async function checkBalance(address, currency = 'BTC') {
    try {
        console.log(`\n💰 Checking balance for ${currency} address: ${address}`);

        const balance = await getAccountBalance(Currency[currency], address);

        console.log(`✅ Balance retrieved successfully!`);
        console.log(`   Incoming: ${balance.incoming || 0}`);
        console.log(`   Outgoing: ${balance.outgoing || 0}`);
        console.log(`   Available: ${(balance.incoming || 0) - (balance.outgoing || 0)}`);

        return balance;

    } catch (error) {
        console.error(`❌ Error checking balance:`, error.message);
        throw error;
    }
}

/**
 * Check balances for multiple addresses
 *
 * @param {Array} wallets - Array of wallet objects with address and currency
 * @returns {Array} Array of balance objects
 */
async function checkMultipleBalances(wallets) {
    console.log(`\n📊 Checking balances for ${wallets.length} wallets...`);
    const balances = [];

    for (const wallet of wallets) {
        try {
            const balance = await checkBalance(wallet.address, wallet.currency);
            balances.push({
                address: wallet.address,
                currency: wallet.currency,
                balance: balance
            });
        } catch (error) {
            console.error(`Failed to check balance for ${wallet.address}:`, error.message);
        }
    }

    return balances;
}

/**
 * Display balance summary
 *
 * @param {Array} balances - Array of balance objects
 */
function displayBalanceSummary(balances) {
    console.log('\n' + '='.repeat(80));
    console.log('💼 Portfolio Balance Summary');
    console.log('='.repeat(80));

    balances.forEach(item => {
        const available = (item.balance.incoming || 0) - (item.balance.outgoing || 0);
        console.log(`\n${item.currency} - ${item.address}`);
        console.log(`  Available: ${available}`);
        console.log(`  Incoming:  ${item.balance.incoming || 0}`);
        console.log(`  Outgoing:  ${item.balance.outgoing || 0}`);
    });

    console.log('\n' + '='.repeat(80) + '\n');
}

module.exports = {
    checkBalance,
    checkMultipleBalances,
    displayBalanceSummary
};
