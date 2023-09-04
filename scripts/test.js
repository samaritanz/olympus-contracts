const { ethers } = require("hardhat");

async function main() {
  const [deployer, MockDAO] = await ethers.getSigners();
  const initialRewardRate = "10000";

  const largeApproval = "100000000000000000000000000000000";
  const routerAddr = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
  const ohmAddr = "0xd333F5d8036fB2d04eA124fb933830a52A0Bb250";
  const sOHMAddr = "0x891De0a74761Bbb95DB2eFDBF43cA32d7a2Efbc5";
  const daiAddr = "0x93c916230BE7DcbdD72c8FFC6B07c8819c7d9b3C";
  const calcAddr = "0x49E83e73222195323b010827e408e8B9044f1dC8";
  const factoryAddr = "0xb7926c0430afb07aa7defde6da862ae0bde767bc";
  const pairAddr = "0x5d62682b7c8d8039c243998113772377d2ebd5f5";
  const treasuryAddr = "0x62BA9563e8b3575C585656FEeE96029bea9B6864";
  const distributorAddr = "0xA82D16DB09e2ed19238839FDCB045f101a10A277";
  const stakingAddr = "0x298E8A0E5D371Db1e9B5a7A261eF25EEdB1E9156";
  const stakingWarmupAddr = "0xcB49743313FEcd6171D899E03a6Cecc21CB9f9dB";
  const stakingHelperAddr = "0xD23F9034E04d623336fE90d54D4907B7229AB6A8";
  const daiBondAddr = "0x88f338A84ab9bF700B7A2b6c87B3c750A1d214AC";
  const redeemHelperAddr = "0x9E9c2c017B09a48489156b4eC0CC950757a1aa5f";
  const depositHelperAddr = "0x3209eC2acaac55b2757Ec43885D2b3CdB8492E3f";
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.attach(distributorAddr);
  await distributor.addRecipient(stakingAddr, initialRewardRate);
  console.log("distributor addRecipient successful  ");
  const rate = await distributor.info(0);
  console.log("rate: ", rate.toString());
  // const DAI = await ethers.getContractFactory("DAI");
  // const dai = await DAI.attach(daiAddr);
  // await dai.approve(depositHelperAddr, largeApproval);

  // const allowance = await dai.allowance(deployer.address, depositHelperAddr);
  // console.log("allowance: ", allowance.toString());
  // const OHM = await ethers.getContractFactory("OlympusERC20Token");
  // const ohm = await OHM.attach(ohmAddr);
  // const StakingWarmup = await ethers.getContractFactory("StakingWarmup");
  // // const stakingWarmup = await StakingWarmup.deploy(stakingAddr, sOHMAddr);
  // const stakingWarmup = await StakingWarmup.attach(stakingWarmupAddr);
  // console.log(
  //   "stakingWarmup deploy successful addr is ",
  //   stakingWarmup.address
  // );

  const StakingHelper = await ethers.getContractFactory("StakingHelper");
  // const stakingHelper = await StakingHelper.deploy(
  //   staking.address,
  //   ohm.address
  // await ohm.approve(stakingHelperAddr, largeApproval);
  // );
  // const Staking = await ethers.getContractFactory("OlympusStaking");
  // const staking = await Staking.attach(stakingAddr);
  // // staking.setContract("1", stakingWarmup.address);
  // await staking.setWarmup(2);
  // console.log("staking setWarmup successful  ");
  // const epoch = await staking.epoch();
  // console.log("epoch: ", epoch.toString());
  // // await staking.rebase();
  // // console.log("staking rebase successful");
  // // await staking.setContract("1", stakingWarmupAddr);
  // const warmupInfo = await staking.warmupInfo(deployer.address);
  // console.log("warmupInfo: ", warmupInfo.toString());
  // const warmupContract = await staking.warmupContract();
  // console.log("warmupContract: ", warmupContract.toString());
  // const stakingAdd = await stakingWarmup.staking();
  // const sohmAdd = await stakingWarmup.sOHM();
  // console.log("staking: ", stakingAdd.toString());
  // console.log("sohmAdd: ", sohmAdd.toString());
  // await staking.claim(deployer.address);
  // console.log("staking claim successful");
  // await staking.stake("200000000", deployer.address);
  // console.log("staking stake successful ");
  // await staking.claim(deployer.address);

  // console.log("staking claim successful");

  // console.log("staking stake successful ");
  // staking.setContract("0", distributorAddr);
  // console.log("staking setContract 0  distributor");
  // staking.setContract("1", stakingWarmupAddr);
  // console.log("staking setContract 1  stakingWarmup ");
  // const stakingHelper = await StakingHelper.attach(stakingHelperAddr);
  // console.log(
  //   "stakingHelper deploy successful addr is ",
  //   stakingHelper.address
  // );
  // await stakingHelper.stake("200000000");
  // console.log("stakingHelper stake successful ");
  const DAIBond = await ethers.getContractFactory("OlympusBondDepositoryDai");
  // const daiBond = await DAIBond.deploy(
  //   ohm.address,
  //   pairAddr,
  //   treasury.address,
  //   deployer.address,
  //   olympusBondingCalculator.address
  // );
  const daiBond = await DAIBond.attach(daiBondAddr);
  const terms = await daiBond.terms();
  console.log("terms: ", terms.toString());
}
main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
