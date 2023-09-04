const { ethers } = require("hardhat");

async function main() {
  const [deployer, MockDAO] = await ethers.getSigners();
  const daiAddr = "0x93c916230BE7DcbdD72c8FFC6B07c8819c7d9b3C";
  const depositHelperAddr = "0x1e9423Ae591D932885B1aE8BC98df74DA252a891";
  const largeApproval = "100000000000000000000000000000000";

  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.attach(daiAddr);
  await dai.approve(depositHelperAddr, largeApproval);

  const allowance = await dai.allowance(deployer.address, depositHelperAddr);
  console.log("allowance: ", allowance.toString());
}
main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
