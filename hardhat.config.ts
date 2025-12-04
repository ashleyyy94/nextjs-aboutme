import * as dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'hardhat/config';
import hardhatToolboxMochaEthers from '@nomicfoundation/hardhat-toolbox-mocha-ethers';
import hardhatVerify from '@nomicfoundation/hardhat-verify';

export default defineConfig({
  solidity: '0.8.28',
  plugins: [hardhatToolboxMochaEthers, hardhatVerify],
  networks: {
    hardhat: {
      type: 'edr-simulated',
      chainId: 31337,
    },
    localhost: {
      type: 'http',
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    amoy: {
      type: 'http',
      url: process.env.POLYGON_AMOY_RPC || '',
      accounts: [process.env.PRIVATE_KEY || ''],
      chainId: 80002,
    },
  },
  verify: {
    etherscan: { apiKey: process.env.ETHERSCAN_API_KEY || '' },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
});
