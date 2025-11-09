/**
 * Main entry point for Tatum Wallet Manager
 *
 * @author Jakob Richert
 * @see https://github.com/jakobrichert
 */

const walletGenerator = require('./wallet-generator');
const balanceChecker = require('../utils/balance-checker');
const walletValidator = require('../utils/wallet-validator');

// Export all modules
module.exports = {
    ...walletGenerator,
    ...balanceChecker,
    ...walletValidator
};

// Run wallet generator if executed directly
if (require.main === module) {
    require('./wallet-generator');
}
