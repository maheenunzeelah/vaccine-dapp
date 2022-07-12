const  SmartContainer= artifacts.require("SmartContainer.sol");

module.exports = function (deployer,network,accounts) {
  deployer.deploy(SmartContainer,{from:accounts[0]});
  deployer.deploy(SmartContainer,{from:accounts[1]});
  deployer.deploy(SmartContainer,{from:accounts[2]});
  deployer.deploy(SmartContainer,{from:accounts[3]});
  deployer.deploy(SmartContainer,{from:accounts[4]});
};
