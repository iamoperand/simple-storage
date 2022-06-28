const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorageContract = await SimpleStorageFactory.deploy()
  await simpleStorageContract.deployed()
  console.log(`Contract deployed at: ${simpleStorageContract.address}`)

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorageContract.deployTransaction.wait(6)
    await verify(simpleStorageContract.address, [])
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...")

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.error(error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
