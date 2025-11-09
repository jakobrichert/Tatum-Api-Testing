# 💼 Tatum Cryptocurrency Wallet Manager

A comprehensive cryptocurrency wallet generator and manager built with the Tatum API. Generate secure HD wallets for multiple blockchains including Bitcoin, Ethereum, Litecoin, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 🌟 Features

- **Multi-Currency Support**: Generate wallets for Bitcoin, Ethereum, Litecoin, Bitcoin Cash, Dogecoin, and more
- **HD Wallet Generation**: Hierarchical Deterministic wallets with BIP44 derivation paths
- **Interactive CLI**: User-friendly command-line interface with guided wallet generation
- **Batch Generation**: Create multiple wallets or multi-currency portfolios at once
- **Address Validation**: Built-in validators for cryptocurrency addresses
- **Balance Checking**: Query wallet balances using Tatum API
- **Testnet Support**: Generate and test with testnet addresses
- **Secure**: Best practices for wallet generation and private key handling

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/jakobrichert/Tatum-Api-Testing.git
cd Tatum-Api-Testing

# Install dependencies
npm install
```

### Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your Tatum API key to `.env`:
```env
TATUM_API_KEY=your_api_key_here
```

Get your free API key at: [https://dashboard.tatum.io/](https://dashboard.tatum.io/)

## 📖 Usage

### Interactive Mode (Recommended for Beginners)

Launch the interactive CLI to generate wallets with a guided interface:

```bash
npm run cli
```

Or use the binary:

```bash
npx tatum-wallet interactive
```

### Command Line Interface

#### Generate a Single Wallet

```bash
# Generate a Bitcoin wallet
npm run cli generate -- --currency BTC

# Generate an Ethereum wallet
npm run cli generate -- --currency ETH

# Generate a testnet wallet
npm run cli generate -- --currency BTC --testnet

# Specify derivation index
npm run cli generate -- --currency BTC --index 5
```

#### Generate Multi-Currency Portfolio

```bash
# Generate BTC, ETH, and LTC wallets
npm run cli portfolio -- --currencies BTC,ETH,LTC

# Generate testnet portfolio
npm run cli portfolio -- --currencies BTC,ETH --testnet
```

#### List Supported Currencies

```bash
npm run cli list
```

### Programmatic Usage

Use the wallet generator in your own Node.js projects:

```javascript
const { generateCompleteWallet, generateMultiCurrencyWallets } = require('./src/wallet-generator');

// Generate a single Bitcoin wallet
async function example() {
    // Single wallet
    const btcWallet = await generateCompleteWallet('BTC', false, 0);
    console.log('Address:', btcWallet.address);
    console.log('Private Key:', btcWallet.privateKey);

    // Multi-currency portfolio
    const portfolio = await generateMultiCurrencyWallets(['BTC', 'ETH', 'LTC'], false);
    console.log('Portfolio:', portfolio);
}

example();
```

## 📚 API Reference

### Wallet Generator

#### `generateCompleteWallet(currencyCode, testnet, index)`

Generate a complete wallet with address and private key.

**Parameters:**
- `currencyCode` (string): Currency code (e.g., 'BTC', 'ETH')
- `testnet` (boolean): Use testnet instead of mainnet
- `index` (number): Derivation index for address generation

**Returns:** Wallet object containing:
- `currency`: Currency code
- `testnet`: Boolean indicating testnet/mainnet
- `mnemonic`: 24-word recovery phrase
- `xpub`: Extended public key
- `address`: Wallet address
- `privateKey`: Private key
- `index`: Derivation index

#### `generateMultipleWallets(currencyCode, testnet, count)`

Generate multiple wallets for the same currency.

**Parameters:**
- `currencyCode` (string): Currency code
- `testnet` (boolean): Use testnet
- `count` (number): Number of wallets to generate

**Returns:** Array of wallet objects

#### `generateMultiCurrencyWallets(currencies, testnet)`

Generate wallets for multiple currencies.

**Parameters:**
- `currencies` (array): Array of currency codes
- `testnet` (boolean): Use testnet

**Returns:** Object mapping currency codes to wallet objects

### Validators

#### `isValidAddress(address, currency)`

Validate a cryptocurrency address.

**Parameters:**
- `address` (string): Address to validate
- `currency` (string): Currency code

**Returns:** Boolean

#### `isValidMnemonic(mnemonic)`

Validate a mnemonic phrase.

**Parameters:**
- `mnemonic` (string): Mnemonic phrase

**Returns:** Boolean

#### `validateWallet(wallet)`

Validate wallet object structure.

**Parameters:**
- `wallet` (object): Wallet object to validate

**Returns:** Object with `valid` boolean and `errors` array

## 🪙 Supported Cryptocurrencies

| Currency | Code | Mainnet | Testnet |
|----------|------|---------|---------|
| Bitcoin | BTC | ✅ | ✅ |
| Ethereum | ETH | ✅ | ✅ |
| Litecoin | LTC | ✅ | ✅ |
| Bitcoin Cash | BCH | ✅ | ✅ |
| Dogecoin | DOGE | ✅ | ✅ |

## 🧪 Examples

Run the example scripts to see the wallet generator in action:

```bash
# Test wallet generation
npm test

# Validate addresses
node examples/validate-address.js
```

## 📁 Project Structure

```
Tatum-Api-Testing/
├── src/
│   ├── index.js              # Main entry point
│   ├── wallet-generator.js   # Wallet generation logic
│   └── cli.js                # CLI interface
├── utils/
│   ├── balance-checker.js    # Balance checking utilities
│   └── wallet-validator.js   # Address and wallet validation
├── examples/
│   ├── test-wallets.js       # Example wallet generation
│   └── validate-address.js   # Address validation examples
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
└── README.md                 # Documentation
```

## 🔐 Security Best Practices

⚠️ **IMPORTANT SECURITY WARNINGS:**

1. **Never share your mnemonic phrase or private keys** with anyone
2. **Never commit wallet data** to version control (`.gitignore` is configured)
3. **Use testnet** for development and testing
4. **Store mnemonics securely** using hardware wallets or encrypted storage
5. **This tool is for development and testing** - use hardware wallets for production
6. **Backup your mnemonic** - it's the only way to recover your wallet

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jakob Richert**
- GitHub: [@jakobrichert](https://github.com/jakobrichert)
- Email: jakob.richert2@gmail.com

## 🙏 Acknowledgments

- Built with [Tatum API](https://tatum.io/)
- Powered by [Node.js](https://nodejs.org/)

## 📞 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/jakobrichert/Tatum-Api-Testing/issues)
- Check [Tatum Documentation](https://docs.tatum.io/)

## 🗺️ Roadmap

- [ ] Add transaction signing and broadcasting
- [ ] Implement wallet import/export functionality
- [ ] Add QR code generation for addresses
- [ ] Create web-based UI
- [ ] Add support for more cryptocurrencies
- [ ] Implement multi-signature wallets
- [ ] Add hardware wallet integration

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
