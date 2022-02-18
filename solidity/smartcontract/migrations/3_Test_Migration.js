const TestToken = artifacts.require("./ReTest");

module.exports = function (deployer) {
    deployer.deploy(TestToken);
};
