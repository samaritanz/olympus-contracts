require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      { version: "0.5.16", settings: {} },
      { version: "0.7.5", settings: {} },
      { version: "0.6.6", settings: {} },
    ],
  },
  networks: {
    // hardhat: {
    //   forking: {
    //     url: "https://bsc.getblock.io/9ec287ec-2d1f-4574-b690-ba5ad2c29a41/mainnet/",
    //     blockNumber: 20786300,
    //   },
    //   loggingEnabled: false,
    // },
    goerli: {
      url: "https://ethereum-goerli.publicnode.com",
      accounts: [
        "24579cc4a68cdb95e6955418c3203a25c40921d8bc2afcc524cef84ba059c153",
      ],
    },
    bsctest: {
      url: "https://bsc-testnet.blockpi.network/v1/rpc/public",
      accounts: [
        "24579cc4a68cdb95e6955418c3203a25c40921d8bc2afcc524cef84ba059c153",
      ],
    },
  },
};
