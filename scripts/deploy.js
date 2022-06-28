const { ethers } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorageContract = await SimpleStorageFactory.deploy()
  await simpleStorageContract.deployed()

  console.log(`Contract deployed at: ${simpleStorageContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
