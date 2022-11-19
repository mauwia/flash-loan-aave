const { expect } = require("chai");

let WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
let WETH_ACCOUNT = "0x3b454077AAf52fF3Baec9128194191b7796247ba";
describe("FlashLoans", function () {
  let deployer, signer;
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    flashLoan = await ethers.getContract("Flashloan");
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WETH_ACCOUNT],
    });
    signer = await ethers.getSigner(WETH_ACCOUNT);
    flashLoan.connect(signer);
  });
  it("test initial value", async () => {
    const token = await ethers.getContractAt("IERC20", WETH);
    const BALANCE_AMOUNT_ETHER = ethers.utils.parseEther("20");
    token.connect(signer).transfer(flashLoan.address, BALANCE_AMOUNT_ETHER);

    const tx = await flashLoan.createFlashLoan(
      WETH,
      ethers.utils.parseEther("10")
    );
    const remainingBalance = await token.balanceOf(flashLoan.address);
    expect(remainingBalance.lt(BALANCE_AMOUNT_ETHER)).to.be.true;
  });
});
