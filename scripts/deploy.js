const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract..")
    const deployedContract = await SimpleStorageFactory.deploy()
    console.log("deploying..")
    await deployedContract.deployed()
    console.log(`contract deployed at ${deployedContract.address}`)
    if (network.config.chainId === 5 && process.env.API_KEY) {
        console.log("Waiting for block confirmations...")
        await deployedContract.deployTransaction.wait(3)
        await verify(deployedContract.address, [])
    }
    const CurrentNumber = await deployedContract.retrieve()
    console.log(`Current Number is ${CurrentNumber}`)
    const transactionResponse = await deployedContract.store(8)
    await transactionResponse.wait(1)
    const UpdatedNumber = await deployedContract.retrieve()
    console.log(`Updated Number to ${UpdatedNumber}`)
}
async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
main()
    .then(() => (process.exitCode = 0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
