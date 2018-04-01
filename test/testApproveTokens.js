
var SurrusContract = artifacts.require("SurrusContract");


contract('SurrusContract', function(accounts) {
  let contractInstance;
  it("Balance of acccounts[0] must be 860 000 000, 000 000 000 000 000 000", function () {
    return SurrusContract.deployed().then(function (instance) {
      contractInstance = instance;
      return contractInstance.balanceOf.call(accounts[0]).then(function (balance) {
        assert.equal(balance.valueOf(), 860000000000000000000000000, "account[0] must have 860 000 000, 000 000 000 000 000 000 past deploy")
      })
    })
  })
  it("should give permission accounts[1] to spend account[0]'s 60 000 000, 000 000 000 000 000 000 token", function() {
    return contractInstance.approve(accounts[1], 60000000000000000000000000).then(function(){
      return contractInstance.allowance.call(accounts[0], accounts[1]);
    }).then(function(result){
      assert.equal(result.toNumber(), 60000000000000000000000000, 'allowance is wrong');
      return contractInstance.transferFrom(accounts[0], accounts[2], 60000000000000000000000000, {from: accounts[1]});
    }).then(function(){
      return contractInstance.balanceOf.call(accounts[0]);
    }).then(function(result){
      assert.equal(result.toNumber(), 800000000000000000000000000, 'accounts[0] balance is wrong');
      return contractInstance.balanceOf.call(accounts[1]);
    }).then(function(result){
      assert.equal(result.toNumber(), 0, 'accounts[1] balance is wrong');
      return contractInstance.balanceOf.call(accounts[2]);
    }).then(function(result){
      assert.equal(result.toNumber(), 60000000000000000000000000, 'accounts[2] balance is wrong');
    })
  })

});









