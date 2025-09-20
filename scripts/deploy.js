const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying FHEtastic Synthetics Market...");

  // Get the contract factory
  const FHEtasticSynthetics = await ethers.getContractFactory("FHEtasticSynthetics");

  // Deploy the contract
  // You'll need to provide addresses for priceOracle and verifier
  const priceOracle = "0x0000000000000000000000000000000000000000"; // Replace with actual oracle address
  const verifier = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  const fhetasticSynthetics = await FHEtasticSynthetics.deploy(priceOracle, verifier);

  await fhetasticSynthetics.waitForDeployment();

  console.log("FHEtastic Synthetics deployed to:", await fhetasticSynthetics.getAddress());
  console.log("Owner:", await fhetasticSynthetics.owner());
  console.log("Price Oracle:", await fhetasticSynthetics.priceOracle());
  console.log("Verifier:", await fhetasticSynthetics.verifier());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
