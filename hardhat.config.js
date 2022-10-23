require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    for (const account of accounts) {
        console.log(account.address)
    }
})
const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY = process.env.API_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        Goerli: {
            url: RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: API_KEY,
    },
    gasReporter: {
        enabled: true,
    },
}
