const hre = require('hardhat');

async function main() {
  const Guestbook = await hre.ethers.getContractFactory('Guestbook');
  const guestbook = await Guestbook.deploy();

  await guestbook.waitForDeployment();

  console.log('Guestbook deployed to:', await guestbook.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
