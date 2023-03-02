const bip39 = require('bip39');
const hdkey = require('hdkey');
const publicKeyToAddress = require('ethereum-public-key-to-address');


function getAddressFromMnemonic (mnemonic, passphrase) {
	const PBKDF_ROUNDS = 2048;
	const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
	const master = hdkey.fromMasterSeed(seed);
	const path = "m/44'/60'/0'/0/0"
	const child = master.derive(path);
	const publicKey = child.publicKey;
	return publicKeyToAddress(publicKey);

}

function listInformation (mnemonic, passphrase) {
	const PBKDF_ROUNDS = 2048;
	const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
	const master = hdkey.fromMasterSeed(seed);

	const path = "m/44'/60'/0'/0/0"


	const child = master.derive(path);
	const privateKey = child.privateKey.slice(0, 32);
	const publicKey = child.publicKey;

	console.log("privateKey ", privateKey.toString("hex"));
	console.log("publicKey ", publicKey.toString("hex"));
	console.log("address ", publicKeyToAddress(publicKey));

}

// Put prefix here, the letters should be lower case
const prefix = "0xfad";
// Your passphrase 
const passphrase = '';
  
// const mnemonic = bip39.generateMnemonic()
for (let i = 0; i < 100000; i++){
	const mnemonic = bip39.generateMnemonic()
	const pubkey = getAddressFromMnemonic(mnemonic, passphrase);
	if (pubkey.toString('hex').slice(0, prefix.length).toLowerCase() === prefix){
		console.log("Found at iteration: ", i);
		console.log("mnemonic: ", mnemonic);
		listInformation(mnemonic, passphrase);
		break;
	}

}