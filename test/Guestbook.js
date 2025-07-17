const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Guestbook', function () {
  let guestbook;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Guestbook = await ethers.getContractFactory('Guestbook');
    guestbook = await Guestbook.deploy();
    await guestbook.waitForDeployment();
  });

  describe('Signing', function () {
    it('Should allow users to sign the guestbook', async function () {
      const message = 'Hello World!';
      await guestbook.connect(addr1).signGuestbook(message);

      const messages = await guestbook.getMessages();
      expect(messages.length).to.equal(1);
      expect(messages[0].content).to.equal(message);
      expect(messages[0].author).to.equal(addr1.address);
    });

    it('Should emit NewMessage event', async function () {
      const message = 'Hello World!';
      await expect(guestbook.connect(addr1).signGuestbook(message))
        .to.emit(guestbook, 'NewMessage')
        .withArgs(addr1.address, message, await ethers.provider.getBlock('latest').then((b) => b.timestamp + 1));
    });

    it('Should not allow empty messages', async function () {
      await expect(guestbook.signGuestbook('')).to.be.revertedWith('Message cannot be empty');
    });

    it('Should not allow messages longer than 280 characters', async function () {
      const longMessage = 'a'.repeat(281);
      await expect(guestbook.signGuestbook(longMessage)).to.be.revertedWith('Message too long');
    });
  });

  describe('Reading', function () {
    it('Should return correct message count', async function () {
      await guestbook.connect(addr1).signGuestbook('Message 1');
      await guestbook.connect(addr2).signGuestbook('Message 2');

      const count = await guestbook.getMessageCount();
      expect(count).to.equal(2);
    });

    it('Should return all messages', async function () {
      await guestbook.connect(addr1).signGuestbook('Message 1');
      await guestbook.connect(addr2).signGuestbook('Message 2');

      const messages = await guestbook.getMessages();
      expect(messages.length).to.equal(2);
      expect(messages[0].content).to.equal('Message 1');
      expect(messages[1].content).to.equal('Message 2');
      expect(messages[0].author).to.equal(addr1.address);
      expect(messages[1].author).to.equal(addr2.address);
    });
  });

  describe('Tips', function () {
    it('Should accept a tip and emit TipReceived', async function () {
      const message = 'Tipped!';
      const tip = ethers.parseEther('0.01');
      await expect(guestbook.connect(addr1).signGuestbook(message, { value: tip }))
        .to.emit(guestbook, 'TipReceived')
        .withArgs(addr1.address, tip);
      expect(await ethers.provider.getBalance(guestbook.target)).to.equal(tip);
    });
    it('Should allow only owner to withdraw tips', async function () {
      const tip = ethers.parseEther('0.02');
      await guestbook.connect(addr1).signGuestbook('Tip!', { value: tip });
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const tx = await guestbook.connect(owner).withdrawTips();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      expect(ownerBalanceAfter).to.be.above(ownerBalanceBefore - gasUsed);
      expect(await ethers.provider.getBalance(guestbook.target)).to.equal(0n);
    });
    it('Should not allow non-owner to withdraw tips', async function () {
      await expect(guestbook.connect(addr1).withdrawTips()).to.be.revertedWith('Only owner can withdraw');
    });
    it('Should not emit TipReceived if no tip is sent', async function () {
      const message = 'No tip!';
      await expect(guestbook.connect(addr1).signGuestbook(message)).to.not.emit(guestbook, 'TipReceived');
    });
    it('Should revert withdrawTips if no tips to withdraw', async function () {
      await expect(guestbook.connect(owner).withdrawTips()).to.be.revertedWith('No tips to withdraw');
    });
  });
});
