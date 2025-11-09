/**
 * Example: Test Wallet Generation
 *
 * Demonstrates various wallet generation features
 *
 * @author Jakob Richert
 */

const {
    generateCompleteWallet,
    generateMultipleWallets,
    generateMultiCurrencyWallets,
    displayWallet
} = require('../src/wallet-generator');

async function runExamples() {
    console.log('\n🧪 Running Wallet Generation Tests\n');

    try {
        // Example 1: Generate a single Bitcoin wallet
        console.log('📝 Example 1: Single Bitcoin Wallet');
        const btcWallet = await generateCompleteWallet('BTC', false, 0);
        displayWallet(btcWallet);

        // Example 2: Generate multiple Ethereum addresses
        console.log('\n📝 Example 2: Multiple Ethereum Addresses');
        const ethWallets = await generateMultipleWallets('ETH', false, 2);
        ethWallets.forEach(displayWallet);

        // Example 3: Generate a multi-currency portfolio
        console.log('\n📝 Example 3: Multi-Currency Portfolio');
        const portfolio = await generateMultiCurrencyWallets(['BTC', 'ETH', 'LTC'], false);
        Object.values(portfolio).forEach(displayWallet);

        console.log('✅ All tests completed successfully!\n');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Run examples
runExamples();
