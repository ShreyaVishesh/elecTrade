export const electoTokenAddress = "0x3d33C01bCC36ac6A8f872599A9c9351c11Ef07E7";
export const electoTokenAbi = [
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "approve",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "initialSupply",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "allowance",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                  }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                  }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                  }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                  }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                  }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "Approval",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "transfer",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "Transfer",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                  },
                  {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "transferFrom",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  }
            ],
            "name": "allowance",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                  }
            ],
            "name": "balanceOf",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                  {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "name",
            "outputs": [
                  {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                  {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      }
]
export const peerToPeerContractAddress = "0x39857B73EcD9846C4aC31371AC42158FcC704023";
export const peerToPeerAbi = [
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "tradeId",
                        "type": "uint256"
                  }
            ],
            "name": "acceptTrade",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "tradeId",
                        "type": "uint256"
                  }
            ],
            "name": "cancelTrade",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                  }
            ],
            "name": "createTrade",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "produceEnergy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "contract ElectoToken",
                        "name": "_token",
                        "type": "address"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "producer",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "EnergyProduced",
            "type": "event"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                  }
            ],
            "name": "LoyaltyPointsEarned",
            "type": "event"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                  }
            ],
            "name": "PointsRedeemed",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                  }
            ],
            "name": "redeemPoints",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                  },
                  {
                        "internalType": "bool",
                        "name": "isSeller",
                        "type": "bool"
                  }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tradeId",
                        "type": "uint256"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "buyer",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                  }
            ],
            "name": "TradeAccepted",
            "type": "event"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tradeId",
                        "type": "uint256"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                  }
            ],
            "name": "TradeCreated",
            "type": "event"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                  },
                  {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "isSeller",
                        "type": "bool"
                  }
            ],
            "name": "UserRegistered",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                  }
            ],
            "name": "energyBalances",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getActiveTrades",
            "outputs": [
                  {
                        "components": [
                              {
                                    "internalType": "address",
                                    "name": "seller",
                                    "type": "address"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "price",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "isActive",
                                    "type": "bool"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "duration",
                                    "type": "uint256"
                              }
                        ],
                        "internalType": "struct PeerToPeerElectricityTrading.Trade[]",
                        "name": "",
                        "type": "tuple[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                  }
            ],
            "name": "getLoyaltyPoints",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                  }
            ],
            "name": "loyaltyPoints",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "token",
            "outputs": [
                  {
                        "internalType": "contract ElectoToken",
                        "name": "",
                        "type": "address"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "tradeCounter",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "trades",
            "outputs": [
                  {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                  },
                  {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                  },
                  {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                  }
            ],
            "name": "users",
            "outputs": [
                  {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                  },
                  {
                        "internalType": "bool",
                        "name": "isSeller",
                        "type": "bool"
                  },
                  {
                        "internalType": "uint256",
                        "name": "energyProduced",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "energyConsumed",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      }
]