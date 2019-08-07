//To do:
//transaction feedback (console log enough for now)
// save and retrieve state on graph
// sample smart contract
	//array
	//struct
	//different types
	//
// token wallet
	//token functions
	//transaction history



let provider;
let signer;
let utils;

let contractAddress = "0x8c8048318590af2124a2e3c916ccdac53bdbd74d";
let contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
let contract;

let resolverContractAddress = "0x5FfC014343cd971B7eb70732021E26C35B744cc4"
let resolverABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "key",
				"type": "string"
			},
			{
				"name": "value",
				"type": "string"
			}
		],
		"name": "setText",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "contentTypes",
				"type": "uint256"
			}
		],
		"name": "ABI",
		"outputs": [
			{
				"name": "contentType",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "x",
				"type": "bytes32"
			},
			{
				"name": "y",
				"type": "bytes32"
			}
		],
		"name": "setPubkey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "content",
		"outputs": [
			{
				"name": "ret",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "addr",
		"outputs": [
			{
				"name": "ret",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "key",
				"type": "string"
			}
		],
		"name": "text",
		"outputs": [
			{
				"name": "ret",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "contentType",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "setABI",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "name",
		"outputs": [
			{
				"name": "ret",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "setContent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "pubkey",
		"outputs": [
			{
				"name": "x",
				"type": "bytes32"
			},
			{
				"name": "y",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "node",
				"type": "bytes32"
			},
			{
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setAddr",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "ensAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "a",
				"type": "address"
			}
		],
		"name": "AddrChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "ContentChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "NameChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "contentType",
				"type": "uint256"
			}
		],
		"name": "ABIChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "x",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "y",
				"type": "bytes32"
			}
		],
		"name": "PubkeyChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "node",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "indexedKey",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "key",
				"type": "string"
			}
		],
		"name": "TextChanged",
		"type": "event"
	}
]
let resolvercontract;

let registryContractAddress = "0x357DBd063BeA7F0713BF88A3e97B7436B0235979"
let registryABI = [{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_prices","type":"address"}],"name":"setPriceOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"commitments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"},{"name":"duration","type":"uint256"}],"name":"rentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"owner","type":"address"},{"name":"duration","type":"uint256"},{"name":"secret","type":"bytes32"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"MIN_REGISTRATION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minCommitmentAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"valid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"duration","type":"uint256"}],"name":"renew","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"available","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxCommitmentAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"commitment","type":"bytes32"}],"name":"commit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"},{"name":"owner","type":"address"},{"name":"secret","type":"bytes32"}],"name":"makeCommitment","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[{"name":"_base","type":"address"},{"name":"_prices","type":"address"},{"name":"_minCommitmentAge","type":"uint256"},{"name":"_maxCommitmentAge","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"string"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"cost","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"}],"name":"NameRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"string"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":false,"name":"cost","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"}],"name":"NameRenewed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oracle","type":"address"}],"name":"NewPriceOracle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
let resigtryContract;
//token
let tokenName;
let tokenSymbol;
let tokenDecimals;

//dom objects
let nameLabel
let symbolLabel
let supplyLabel
let contractLabel

let txHistory

async function initialize(web3) {
  ethereum.enable()

  provider = new ethers.providers.Web3Provider(web3.currentProvider);
  utils = ethers.utils;

  let accounts = await provider.listAccounts()
  signer = provider.getSigner(accounts[0])

  contract = new ethers.Contract(contractAddress,contractABI,signer)
	resolverContract = new ethers.Contract(resolverContractAddress,resolverABI,signer)
	registryContract = new ethers.Contract(registryContractAddress,registryABI,signer)


	tokenDecimals = await contract.decimals()
	tokenSymbol = await contract.symbol()
	utils = ethers.utils;

	getLabels()
  getTokenDetails()
}

async function getTxHistory(){
	console.log(provider)
	txHistory = new Array();
	let topic = ethers.utils.id("Transfer(address,address,uint256)");

	let filter = {
    address: contractAddress,
    fromBlock: 6100000,
    toBlock: 6102468,
    topics: [ topic ]
	}

	provider.getLogs(filter).then((result) => {
    console.log(result)
		for (let o = 0;o<result.length;o++){
			let tx = new Object()
			tx = result[o]
			txHistory.push(tx)
		}

});
}

async function getETHBalance(){

}

async function getLabels(){
	nameLabel = document.getElementById("nameLabel");
	symbolLabel = document.getElementById("symbolLabel")
	supplyLabel = document.getElementById("totalSupplyLabel")
	contractLink = document.getElementById("contractLink")
	balanceLabel = document.getElementById("balanceLabel")
}


async function getTokenDetails() {
	nameLabel.innerHTML += await contract.name()
	symbolLabel.innerHTML += await contract.symbol()

	supplyLabel.innerHTML +=  await getTotalSupply()
	let a = document.createElement('a');
	a.href =  "https://ropsten.etherscan.io/address/" + contractAddress
	a.innerHTML = contractAddress
	contractLink.innerHTML = "Contract: "
	contractLink.appendChild(a)
	balanceLabel.innerHTML += await getBalance()
}

async function getTotalSupply(){
	let totalSupply = await contract.totalSupply()
	totalSupply = formatAmount(totalSupply)
	return(totalSupply + " " + tokenSymbol)
}

async function getBalance(){
	let balance = await contract.balanceOf(signer._address)
	balance = formatAmount(balance)
	return(balance + " " + tokenSymbol)
}

async function transfer() {
	let to = document.getElementById("transferTo").value
	let amount = parseAmount(document.getElementById("transferAmount").value)
	await contract.transfer(to,amount)
}

async function approve() {
	console.log("asdf")
	let to = document.getElementById("approveTo").value
	let amount = parseAmount(document.getElementById("approveAmount").value)
	await contract.approve(to,amount)
}

async function transferFrom() {
	let from = document.getElementById("transferFromFrom").value
	let to = document.getElementById("transferFromTo").value
	let amount = parseAmount(document.getElementById("transferFromAmount").value)
	await contract.transferFrom(from,to,amount)
}

async function populateTxHistoryTable(){
	var txHistoryTable = document.getElementById('txHistory')

	for(var o=0;o<txHistory.length;o++){
		console.log(o)

			var newRow  = txHistoryTable.insertRow(txHistoryTable.rows.length);

			var HashCell  = newRow.insertCell(0);
			var HashText = document.createTextNode(r);
			HashCell.appendChild(addrHashTextessText);

			//
			// var from =
			//
			// var fromCell  = newRow.insertCell(1);
			// var fromText = document.createTextNode(lastwithdrawn);
			// fromCell.appendChild(fromText);
			//
			// var to =
			// var toCell  = newRow.insertCell(2);
			// var toText = document.createTextNode(lastwithdrawn);
			// toCell.appendChild(toText);

			//
	    // var time = await URPContract.start();
			// var time = new Date(time*1000);
			// var timeCell  = newRow.insertCell(1);
			// var timeText  = document.createTextNode(started);
			// timeCell.appendChild(timeText);


		}



}

function parseAmount(amount) {
	amount = ethers.utils.parseUnits(amount,tokenDecimals)
	return amount;
}

function formatAmount(amount) {
	amount = ethers.utils.formatUnits(amount,tokenDecimals)
	amount = ethers.utils.commify(amount)
	return amount;
}

function getNetwork() {
  if (typeof web3 !== 'undefined') {
     console.log('web3 is enabled')
     if (web3.currentProvider.isMetaMask === true) {
       console.log('MetaMask is active')
     } else {
       console.log('MetaMask is not available')
     }
   } else {
     console.log('web3 is not found')
   }

	 web3.eth.getAccounts(function(err, accounts){
    if (err != null) console.error("An error occurred: "+err);
    else if (accounts.length == 0) console.log("User is not logged in to MetaMask");
    else console.log("User is logged in to MetaMask");
});
  web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
      console.log('This is mainnet',netId)
      break
    case "2":
      console.log('This is the deprecated Morden test network. Network ID:',netId)
      break
    case "3":
      console.log('This is the ropsten test network. Network ID:',netId)
      break
    case "4":
      console.log('This is the rinkeby test network. Network ID:',netId)
      break
    case "5":
      console.log('This is the goerli test network. Network ID:',netId)
      break
    case "42":
      console.log('This is the kovan test network. Network ID:',netId)
      break
    default:
      console.log('This is an unknown network. Network ID:',netId)
  }
})

}

async function updateToken(){
	let ENSAddress = document.getElementById("tokenAddress").value;
	console.log(ENSAddress)
	let namehash = utils.namehash(ENSAddress)
	contractAddress = await resolverContract.addr(namehash)
 	console.log(contractAddress)
	initialize(web3)
}
