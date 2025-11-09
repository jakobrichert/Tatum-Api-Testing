/**
 * Example: Address Validation
 *
 * Demonstrates address validation functionality
 *
 * @author Jakob Richert
 */

const { isValidAddress, isValidMnemonic, validateWallet } = require('../utils/wallet-validator');

// Test addresses
const testAddresses = {
    BTC: [
        { address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', valid: true },
        { address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy', valid: true },
        { address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', valid: true },
        { address: 'invalid_address', valid: false }
    ],
    ETH: [
        { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', valid: false }, // Missing one char
        { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbC', valid: true },
        { address: 'not_an_eth_address', valid: false }
    ]
};

console.log('\n🔍 Address Validation Examples\n');

// Test Bitcoin addresses
console.log('Bitcoin Address Validation:');
testAddresses.BTC.forEach(test => {
    const result = isValidAddress(test.address, 'BTC');
    const status = result === test.valid ? '✅' : '❌';
    console.log(`${status} ${test.address} - Expected: ${test.valid}, Got: ${result}`);
});

console.log('\nEthereum Address Validation:');
testAddresses.ETH.forEach(test => {
    const result = isValidAddress(test.address, 'ETH');
    const status = result === test.valid ? '✅' : '❌';
    console.log(`${status} ${test.address} - Expected: ${test.valid}, Got: ${result}`);
});

// Test mnemonic validation
console.log('\nMnemonic Validation:');
const testMnemonics = [
    { mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', valid: true },
    { mnemonic: 'invalid mnemonic', valid: false },
    { mnemonic: '', valid: false }
];

testMnemonics.forEach(test => {
    const result = isValidMnemonic(test.mnemonic);
    const status = result === test.valid ? '✅' : '❌';
    console.log(`${status} "${test.mnemonic.substring(0, 30)}..." - Valid: ${result}`);
});

console.log('\n✅ Validation tests completed!\n');
