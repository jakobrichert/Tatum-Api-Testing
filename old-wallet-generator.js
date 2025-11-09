
//Async function generate with no paramaters that generates a wallet, a btc address for that wallet 
//and a private key for that address
//Using tatum API
//Code by https://github.com/jakobrichert
var generate = async function(){
    
    //generates a bitcoin wallet
    const {generateWallet, Currency} = require("@tatumio/tatum");
    const btcWallet = await generateWallet(Currency.BTC, false);
    console.log(btcWallet);

    //generates the bitcoin address for the wallet
    const {generateAddressFromXPub} = require("@tatumio/tatum");
    const btcAddress = await generateAddressFromXPub(Currency.BTC, false, btcWallet["xpub"], 1);
    console.log(btcAddress);
    
    //generates the private key for the wallet
    const {generatePrivateKeyFromMnemonic} = require("@tatumio/tatum");
    const btcPrivateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, false, btcWallet["mnemonic"],1)
    console.log(btcPrivateKey);
    }

generate();




