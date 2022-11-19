// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Flashloan is FlashLoanSimpleReceiverBase {
    constructor(IPoolAddressesProvider provider)
        FlashLoanSimpleReceiverBase(provider)
    {}

    using SafeMath for uint;
    event Log(address asset, uint val);

    function createFlashLoan(address asset, uint amount) external {
        console.log(asset);
        address reciever = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;
        emit Log(asset, IERC20(asset).balanceOf(address(this)));
        POOL.flashLoanSimple(reciever, asset, amount, params, referralCode);
        emit Log(asset, IERC20(asset).balanceOf(address(this)));
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        uint amountOut = amount.add(premium);
        
        IERC20(asset).approve(address(POOL), amountOut);
        console.log("done");
        return true;
    }

    function hello() public pure returns (bool) {
        return true;
    }
}
