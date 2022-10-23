const { assert } = require("chai")
const { ethers } = require("hardhat")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
describe("SimpleStorageTest", function () {
    let SimpleStorageFactory, deployedContract, expectedValue
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        deployedContract = await SimpleStorageFactory.deploy()
    })
    it("checking current number", async function () {
        const CurrentNumber = await deployedContract.retrieve()
        expectedValue = "0"
        console.log(`Current Number is ${CurrentNumber}`)
        assert.equal(CurrentNumber.toString(), expectedValue)
    })
    it("updated to 8", async function () {
        expectedValue = 8
        const transactionResponse = await deployedContract.store(expectedValue)
        await transactionResponse.wait(1)
        const UpdatedNumber = await deployedContract.retrieve()
        console.log(`Updated Number to ${UpdatedNumber}`)
        assert.equal(UpdatedNumber.toString(), expectedValue.toString())
    })
})
