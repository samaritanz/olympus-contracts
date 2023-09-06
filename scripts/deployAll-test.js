// @dev. This script will deploy this V1.1 of Olympus. It will deploy the whole ecosystem except for the LP tokens and their bonds.
// This should be enough of a test environment to learn about and test implementations with the Olympus as of V1.1.
// Not that the every instance of the Treasury's function 'valueOf' has been changed to 'valueOfToken'...
// This solidity function was conflicting w js object property name

const { ethers } = require("hardhat");

async function main() {
  const [deployer, MockDAO] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);
  const firstEpochBlock = "0";

  // What epoch will be first epoch
  const firstEpochNumber = "33095000";
  const initialIndex = "1000000000";

  // How many blocks are in each epoch
  // const epochLengthInBlocks = "9600";
  const epochLengthInBlocks = "10";

  // Initial reward rate for epoch
  const initialRewardRate = "10000";

  // Ethereum 0 address, used when toggling changes in treasury
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  // Large number for approval for Frax and DAI
  const largeApproval = "100000000000000000000000000000000";

  // Initial mint for Frax and DAI (10,000,000)
  const initialMint = "10000000000000000000000000";

  // DAI bond BCV
  const daiBondBCV = "10";

  // Frax bond BCV
  const fraxBondBCV = "690";

  // Bond vesting length in blocks. 33110 ~ 5 days
  const bondVestingLength = "14400";

  // Min bond price
  const minBondPrice = "317";

  // Max bond payout
  const maxBondPayout = "2000";

  // DAO fee for bond
  const bondFee = "10000";

  // Max debt bond can take on
  const maxBondDebt = "100000000000000000000000000";

  // Initial Bond debt
  const intialBondDebt = "0";
  const routerAddr = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
  const factoryAddr = "0xb7926c0430afb07aa7defde6da862ae0bde767bc";
  const ohmAddr = "0xd333F5d8036fB2d04eA124fb933830a52A0Bb250";
  const pairAddr = "0x5d62682b7c8d8039c243998113772377d2ebd5f5";
  const sOHMAddr = "0x8670dDebB2073d92DEe7D7803f6efec1620B942f";
  const daiAddr = "0x93c916230BE7DcbdD72c8FFC6B07c8819c7d9b3C";
  const calcAddr = "0x49E83e73222195323b010827e408e8B9044f1dC8";
  const treasuryAddr = "0x62BA9563e8b3575C585656FEeE96029bea9B6864";
  const distributorAddr = "0x055632dE7E8b639238053EB5bd1d4FDc6aCB9063";
  const stakingAddr = "0x59Cf2E6eb761942f102d2E84aBE676287056D77e";
  const stakingWarmupAddr = "0xE499Ebb4C8D9EA61f170dB72a9f8Fe65FF7d1Ee8";
  const stakingHelperAddr = "0xEF2f7496D6572A15126dD796ED752a9dE1f44039";
  const daiBondAddr = "0x88f338A84ab9bF700B7A2b6c87B3c750A1d214AC";
  const redeemHelperAddr = "0x9E9c2c017B09a48489156b4eC0CC950757a1aa5f";
  const depositHelperAddr = "0x3209eC2acaac55b2757Ec43885D2b3CdB8492E3f";

  // Deploy OHM
  const OHM = await ethers.getContractFactory("OlympusERC20Token");
  const ohm = await OHM.attach(ohmAddr);
  console.log("ohm deploy successful addr is ", ohm.address);

  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.attach(daiAddr);
  // await ohm.approve(routerAddr, largeApproval);
  // await dai.approve(routerAddr, largeApproval);
  console.log("dai deploy successful addr is ", dai.address);
  // Deploy bonding calc
  const OlympusBondingCalculator = await ethers.getContractFactory(
    "OlympusBondingCalculator"
  );
  const olympusBondingCalculator = await OlympusBondingCalculator.attach(
    calcAddr
  );
  console.log(
    "olympusBondingCalculator deploy successful addr is ",
    olympusBondingCalculator.address
  );
  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  const pancakeFactory = await PancakeFactory.attach(factoryAddr);
  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await PancakeRouter.attach(routerAddr);

  // create pair

  // const pair = await pancakeFactory.createPair(ohm.address, dai.address);
  // console.log("pair created successful addr is ", pair);

  // Deploy 10,000,000 mock DAI and mock Frax
  // await dai.mint(deployer.address, initialMint);
  // console.log("dai mint successful");

  // Deploy treasury
  //@dev changed function in treaury from 'valueOf' to 'valueOfToken'... solidity function was coflicting w js object property name
  const Treasury = await ethers.getContractFactory("OlympusTreasury");
  // const treasury = await Treasury.deploy(
  //   ohm.address,
  //   dai.address,
  //   pairAddr,
  //   olympusBondingCalculator.address,
  //   0
  // );
  const treasury = await Treasury.attach(treasuryAddr);
  console.log("treasury deploy successful addr is ", treasury.address);

  // Deploy staking distributor
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.attach(distributorAddr);
  // const distributor = await Distributor.deploy(
  //   treasury.address,
  //   ohm.address,
  //   epochLengthInBlocks,
  //   firstEpochNumber
  // );
  console.log("distributor deploy successful addr is ", distributor.address);

  // Deploy sOHM
  const SOHM = await ethers.getContractFactory("sOlympus");
  const sOHM = await SOHM.attach(sOHMAddr);
  // const sOHM = await SOHM.deploy();
  console.log("sOHM deploy successful addr is ", sOHM.address);

  // Deploy Staking
  const Staking = await ethers.getContractFactory("OlympusStaking");
  const staking = await Staking.attach(stakingAddr);
  // const staking = await Staking.deploy(
  //   ohm.address,
  //   sOHM.address,
  //   epochLengthInBlocks,
  //   firstEpochNumber,
  //   firstEpochBlock
  // );
  console.log("staking deploy successful addr is ", staking.address);

  // Deploy staking warmpup
  const StakingWarmpup = await ethers.getContractFactory("StakingWarmup");
  // const stakingWarmup = await StakingWarmpup.deploy(
  //   staking.address,
  //   sOHM.address
  // );
  const stakingWarmup = await StakingWarmpup.attach(stakingWarmupAddr);
  console.log(
    "stakingWarmup deploy successful addr is ",
    stakingWarmup.address
  );

  // Deploy staking helper
  const StakingHelper = await ethers.getContractFactory("StakingHelper");
  // const stakingHelper = await StakingHelper.deploy(
  //   staking.address,
  //   ohm.address
  // );
  const stakingHelper = await StakingHelper.attach(stakingHelperAddr);
  console.log(
    "stakingHelper deploy successful addr is ",
    stakingHelper.address
  );

  // Deploy DAI bond
  //@dev changed function call to Treasury of 'valueOf' to 'valueOfToken' in BondDepository due to change in Treausry contract
  const DAIBond = await ethers.getContractFactory("OlympusBondDepositoryDai");
  // const daiBond = await DAIBond.deploy(
  //   ohm.address,
  //   pairAddr,
  //   treasury.address,
  //   deployer.address,
  //   olympusBondingCalculator.address
  // );
  const daiBond = await DAIBond.attach(daiBondAddr);
  console.log(" lp daiBond deploy successful addr is ", daiBond.address);
  const RedeemHelper = await ethers.getContractFactory("RedeemHelper");
  const redeemHelper = await RedeemHelper.attach(redeemHelperAddr);
  // const redeemHelper = await RedeemHelper.deploy();
  console.log("redeemHelper deploy successful addr is ", redeemHelper.address);

  const DepositHelper = await ethers.getContractFactory("DepositHelper");
  const depositHelper = await DepositHelper.attach(depositHelperAddr);
  // const depositHelper = await DepositHelper.deploy(
  //   daiBond.address,
  //   routerAddr,
  //   pairAddr,
  //   ohm.address,
  //   dai.address,
  //   treasury.address
  // );
  console.log(
    "depositHelper deploy successful addr is ",
    depositHelper.address
  );

  // // // Initialize sOHM and set the index
  // // const initializer = await sOHM.initializer();
  // // console.log("sohm initializer is ", initializer);
  // // if (initializer !== zeroAddress) {
  // await sOHM.initialize(staking.address);
  // console.log("sOHM initialize successful  ");

  // await sOHM.setIndex(initialIndex);
  // console.log("sOHM setIndex successful  ");
  // // // }
  // staking.setContract("0", distributor.address);
  // console.log("staking setContract 0  distributor");
  // staking.setContract("1", stakingWarmup.address);
  // console.log("staking setContract 1  stakingWarmup ");
  // ohm.setVault(treasury.address);
  // console.log("ohm setVault  treasury ");

  // // Add staking contract as distributor recipient
  await distributor.addRecipient(staking.address, initialRewardRate);
  console.log(
    "distributor addRecipient successful  ",
    staking.address,
    initialRewardRate
  );
  await distributor.setAdjustment(0, true, 5000, 10000);
  // redeemHelper.addBondContract(daiBond.address);
  // console.log("redeemHelper addBondContract successful  ", daiBond.address);
  // // ---------------------- ---------------------- //
  // // // queue and toggle reward manager
  // await treasury.queue("8", olympusBondingCalculator.address);
  // console.log("treasury queue successful  8", olympusBondingCalculator.address);
  await treasury.queue("8", distributor.address);
  console.log("treasury queue successful  8", distributor.address);
  await treasury.toggle("8", distributor.address, distributor.address);
  console.log("treasury toggle successful  8", distributor.address);

  // // queue and toggle DAI and Frax bond reserve depositor
  // await treasury.queue("0", deployer.address);
  // console.log("treasury queue successful  0 deployer");
  // await treasury.toggle("0", deployer.address, deployer.address);
  // console.log("treasury toggle successful  0 deployer", deployer.address);

  // await treasury.queue("4", daiBond.address);
  // console.log("treasury queue successful  4", daiBond.address);
  // await treasury.toggle("4", daiBond.address, daiBond.address);
  // console.log("treasury toggle successful  4", daiBond.address);

  // // // Set staking for DAI and Frax bond
  await daiBond.setStaking(staking.address, false);
  console.log("daiBond setStaking successful  ");
  // // // Set DAI and Frax bond terms
  // await daiBond.initializeBondTerms(
  //   daiBondBCV,
  //   bondVestingLength,
  //   minBondPrice,
  //   maxBondPayout,
  //   bondFee,
  //   maxBondDebt,
  //   intialBondDebt
  // );
  // console.log("daiBond initializeBondTerms successful  ");

  // // // Approve the treasury to spend DAI and Frax
  // // await dai.approve(treasury.address, largeApproval);
  // // console.log("dai approve successful  ", treasury.address, largeApproval);

  // // // Approve dai and frax bonds to spend deployer's DAI and Frax
  // await dai.approve(daiBond.address, largeApproval);
  // console.log("dai approve successful  ", daiBond.address, largeApproval);
  // await dai.approve(routerAddr, largeApproval);
  // console.log("dai approve successful  ", daiBond.address, largeApproval);

  // // Approve staking and staking helper contact to spend deployer's OHM
  await ohm.approve(staking.address, largeApproval);
  console.log("ohm approve successful  ", staking.address, largeApproval);
  // await ohm.approve(routerAddr, largeApproval);
  // console.log("ohm approve successful  ", staking.address, largeApproval);

  await ohm.approve(stakingHelper.address, largeApproval);
  console.log("ohm approve successful  ", stakingHelper.address, largeApproval);
  // await treasury.deposit(
  //   "9000000000000000000000000",
  //   dai.address,
  //   "8400000000000000"
  // );

  // await pancakeRouter.addLiquidity(
  //   ohm.address,
  //   dai.address,
  //   7000000000000,
  //   70000000000000000000000,
  //   0,
  //   0,
  //   treasury.address,
  //   7000000000000
  // );
  // console.log("add liquidity successful");
  // await treasury.auditReserves();
  // console.log("auditReserves successful");

  // await daiBond.setBondTerms(0, 144000);
  // console.log("setBondTerms successful");
  await stakingHelper.stake("200000000");
  console.log("stakingHelper stake successful  ");

  await staking.setWarmup(2);
  console.log("staking setWarmup successful  ");

  // await daiBond.setAdjustment(false, 1, 9, 1);
  // console.log("setAdjustment successful");
  // // Stake OHM through helper
  await stakingHelper.stake("100000000000");
  console.log("stakingHelper stake successful  ");

  // // Bond 1,000 OHM and Frax in each of their bonds
  // await daiBond.deposit("1000000000000000000000", "60000", deployer.address);
  // console.log("daiBond deposit successful  ");

  console.log("OHM: " + ohm.address);
  console.log("DAI: " + dai.address);
  console.log("Treasury: " + treasury.address);
  console.log("Calc: " + olympusBondingCalculator.address);
  console.log("Staking: " + staking.address);
  console.log("sOHM: " + sOHM.address);
  console.log("Distributor " + distributor.address);
  console.log("Staking Warmup " + stakingWarmup.address);
  console.log("Staking Helper " + stakingHelper.address);
  console.log("DAI Bond: " + daiBond.address);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
