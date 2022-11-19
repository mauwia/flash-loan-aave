const { network } = require("hardhat");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  let { deploy, log } = deployments;
  let { deployer } = await getNamedAccounts();
  let chainId = network.config.chainId;
  let ethUsdPriceFeedAddress;
  // networkConfig[chainId]['ethUsdPriceFeed']

  let args = ["0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"];
  const stake = await deploy("Flashloan", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

};
module.exports.tags = ["all", "stake"];
