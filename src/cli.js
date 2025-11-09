#!/usr/bin/env node

/**
 * CLI Interface for Tatum Wallet Generator
 *
 * Interactive command-line tool for generating cryptocurrency wallets
 *
 * @author Jakob Richert
 */

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
    generateCompleteWallet,
    generateMultipleWallets,
    generateMultiCurrencyWallets,
    displayWallet,
    SUPPORTED_CURRENCIES
} = require('./wallet-generator');

// CLI version
const VERSION = '1.0.0';

/**
 * Interactive mode - guides user through wallet generation
 */
async function interactiveMode() {
    console.log(chalk.cyan.bold('\n💼 Tatum Cryptocurrency Wallet Generator\n'));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            message: 'What would you like to do?',
            choices: [
                { name: 'Generate a single wallet', value: 'single' },
                { name: 'Generate multiple wallets (same currency)', value: 'multiple' },
                { name: 'Generate multi-currency portfolio', value: 'portfolio' }
            ]
        },
        {
            type: 'list',
            name: 'currency',
            message: 'Select cryptocurrency:',
            choices: Object.keys(SUPPORTED_CURRENCIES).filter(c => !c.includes('TESTNET')),
            when: (answers) => answers.mode === 'single' || answers.mode === 'multiple'
        },
        {
            type: 'checkbox',
            name: 'currencies',
            message: 'Select cryptocurrencies for portfolio:',
            choices: Object.keys(SUPPORTED_CURRENCIES).filter(c => !c.includes('TESTNET')),
            when: (answers) => answers.mode === 'portfolio',
            validate: (input) => input.length > 0 ? true : 'Please select at least one currency'
        },
        {
            type: 'confirm',
            name: 'testnet',
            message: 'Use testnet?',
            default: false
        },
        {
            type: 'number',
            name: 'count',
            message: 'How many wallets to generate?',
            default: 3,
            when: (answers) => answers.mode === 'multiple',
            validate: (input) => input > 0 && input <= 10 ? true : 'Please enter a number between 1 and 10'
        },
        {
            type: 'number',
            name: 'index',
            message: 'Derivation index:',
            default: 0,
            when: (answers) => answers.mode === 'single'
        }
    ]);

    try {
        if (answers.mode === 'single') {
            const wallet = await generateCompleteWallet(
                answers.currency,
                answers.testnet,
                answers.index
            );
            displayWallet(wallet);
        } else if (answers.mode === 'multiple') {
            const wallets = await generateMultipleWallets(
                answers.currency,
                answers.testnet,
                answers.count
            );
            wallets.forEach(displayWallet);
        } else if (answers.mode === 'portfolio') {
            const portfolio = await generateMultiCurrencyWallets(
                answers.currencies,
                answers.testnet
            );
            Object.values(portfolio).forEach(displayWallet);
        }

        console.log(chalk.yellow.bold('⚠️  SECURITY WARNING:'));
        console.log(chalk.yellow('Keep your mnemonic and private keys secure!'));
        console.log(chalk.yellow('Never share them or commit them to version control!\n'));

    } catch (error) {
        console.error(chalk.red('❌ Error:'), error.message);
        process.exit(1);
    }
}

// Configure CLI commands
program
    .name('tatum-wallet')
    .description('Cryptocurrency wallet generator using Tatum API')
    .version(VERSION);

program
    .command('generate')
    .description('Generate a cryptocurrency wallet')
    .option('-c, --currency <currency>', 'Currency code (BTC, ETH, LTC, etc.)', 'BTC')
    .option('-t, --testnet', 'Use testnet instead of mainnet', false)
    .option('-i, --index <index>', 'Derivation index', '0')
    .action(async (options) => {
        try {
            const wallet = await generateCompleteWallet(
                options.currency.toUpperCase(),
                options.testnet,
                parseInt(options.index)
            );
            displayWallet(wallet);
        } catch (error) {
            console.error(chalk.red('❌ Error:'), error.message);
            process.exit(1);
        }
    });

program
    .command('portfolio')
    .description('Generate a multi-currency wallet portfolio')
    .option('-c, --currencies <currencies>', 'Comma-separated currency codes', 'BTC,ETH,LTC')
    .option('-t, --testnet', 'Use testnet instead of mainnet', false)
    .action(async (options) => {
        try {
            const currencies = options.currencies.split(',').map(c => c.trim().toUpperCase());
            const portfolio = await generateMultiCurrencyWallets(currencies, options.testnet);
            Object.values(portfolio).forEach(displayWallet);
        } catch (error) {
            console.error(chalk.red('❌ Error:'), error.message);
            process.exit(1);
        }
    });

program
    .command('interactive')
    .alias('i')
    .description('Launch interactive mode')
    .action(interactiveMode);

program
    .command('list')
    .description('List supported cryptocurrencies')
    .action(() => {
        console.log(chalk.cyan.bold('\n📋 Supported Cryptocurrencies:\n'));
        Object.entries(SUPPORTED_CURRENCIES).forEach(([code, info]) => {
            console.log(`  ${chalk.green(code.padEnd(15))} - ${info.name} ${info.testnet ? '(Testnet)' : ''}`);
        });
        console.log('');
    });

// Default to interactive mode if no command provided
if (process.argv.length <= 2) {
    interactiveMode();
} else {
    program.parse(process.argv);
}
