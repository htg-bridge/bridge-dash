const Block = require("./block");

class Blockchain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
    this.previousBlock = this.blockchain[0];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  createNewBlock(data) {
    const nextBlock = (lastBlock, data) =>
      new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);

    const blockToAdd = nextBlock(this.previousBlock, data);

    // Sync constructors
    this.previousBlock = blockToAdd;
    this.blockchain.push(blockToAdd);
  }

  printBlockchain() {
    this.blockchain.map(block => {
      console.log(block.index, block.timestamp, block.data, block.prevHash, block.thisHash);
    });
  }
}

module.exports = Blockchain;
