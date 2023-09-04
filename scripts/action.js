const { ethers } = require("hardhat");

async function main() {
  const [deployer, MockDAO] = await ethers.getSigners();
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const largeApproval = "100000000000000000000000000000000";

  const Treasury = await ethers.getContractFactory("MockOlympusTreasury");
  const treasury = Treasury.attach(
    "0x156fd65e8697178C95c0bD9F434BA51b9eB0137c"
  );
  const OHM = await ethers.getContractFactory("OlympusERC20Token");
  const ohm = OHM.attach("0x6404cA5d7CF04840e269017AAeFf8e2975Aa30A7");
  const DAI = await ethers.getContractFactory("DAI");
  const dai = DAI.attach("0xF512EF7c5eAfA5949fB31318590535f940E07979");
  const Frax = await ethers.getContractFactory("FRAX");
  const frax = Frax.attach("0x69702265A87A9742b53272A3e57843A03E68633C");
  const DAIBond = await ethers.getContractFactory("MockOlympusBondDepository");

  const daiBond = await DAIBond.attach(
    "0x93Cf4154c51318901355c42C2F5e50b182c79B6d"
  );
  const FraxBond = await ethers.getContractFactory("MockOlympusBondDepository");
  const fraxBond = await FraxBond.attach(
    "0x0dbf0805dF4ea7428c4F1AA334c9C1e2aE76e2F7"
  );
  const Staking = await ethers.getContractFactory("OlympusStaking");
  const staking = await Staking.attach(
    "0x45FC7eEbD8DDC8d15c8ABA823a95B68de7e86552"
  );

  const StakingHelper = await ethers.getContractFactory("StakingHelper");
  const stakingHelper = await StakingHelper.attach(
    "0xf2341d53A269Ae07751a71E743d66E0095c385Bd"
  );
  // await treasury.queue("4", deployer.address);
  // console.log("treasury queue successful  4", deployer.address);
  // await treasury.toggle("4", deployer.address, zeroAddress);
  // console.log("treasury toggle successful  4", deployer.address);
  // // Approve the treasury to spend DAI and Frax
  // await dai.approve(treasury.address, largeApproval);
  // console.log("dai approve successful  ", treasury.address, largeApproval);
  // await frax.approve(treasury.address, largeApproval);
  // console.log("frax approve successful  ", treasury.address, largeApproval);

  // // Approve dai and frax bonds to spend deployer's DAI and Frax
  // await dai.approve(daiBond.address, largeApproval);
  // console.log("dai approve successful  ", daiBond.address, largeApproval);

  // await frax.approve(fraxBond.address, largeApproval);
  // console.log("frax approve successful  ", fraxBond.address, largeApproval);

  // // Approve staking and staking helper contact to spend deployer's OHM
  // await ohm.approve(staking.address, largeApproval);
  // console.log("ohm approve successful  ", staking.address, largeApproval);

  // await ohm.approve(stakingHelper.address, largeApproval);
  // console.log("ohm approve successful  ", stakingHelper.address, largeApproval);

  // // Deposit 9,000,000 DAI to treasury, 600,000 OHM gets minted to deployer and 8,400,000 are in treasury as excesss reserves
  // await treasury.deposit(
  //   "9000000000000000000000000",
  //   dai.address,
  //   "8400000000000000"
  // );
  // console.log("treasury deposit successful  dai", dai.address);

  // // Deposit 5,000,000 Frax to treasury, all is profit and goes as excess reserves
  // await treasury.deposit(
  //   "5000000000000000000000000",
  //   frax.address,
  //   "5000000000000000"
  // );
  // console.log("treasury deposit successful  frax", frax.address);

  // Stake OHM through helper
  await stakingHelper.stake("100000000000");
  console.log("stakingHelper stake successful  ");

  // Bond 1,000 OHM and Frax in each of their bonds
  await daiBond.deposit("1000000000000000000000", "60000", deployer.address);
  console.log("daiBond deposit successful  ");

  await fraxBond.deposit("1000000000000000000000", "60000", deployer.address);
  console.log("fraxBond deposit successful  ");
}
main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
