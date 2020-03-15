const Blockchain = require("../services/blockchain");

class Operations {
  constructor() {
    this.blockchain = new Blockchain(); // Genesis block created
  }

  check() {
    for (let i = 0; i < 5; i++) {
      this.blockchain.createNewBlock(`This is #${i}`);
    }

    this.blockchain.printBlockchain();
  }
}
module.exports = Operations;
