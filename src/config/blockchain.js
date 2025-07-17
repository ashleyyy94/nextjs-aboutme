export const NETWORKS = {
  hardhat: {
    chainId: 31337,
    name: 'Hardhat Local',
    rpcUrl: 'http://127.0.0.1:8545',
    explorer: '',
    contractAddress: '', //Replace with actual address if needed
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  amoy: {
    chainId: 80002,
    name: 'Polygon Amoy',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorer: 'https://www.oklink.com/amoy',
    contractAddress: '0x74EbDDc9A49CcE2d0e90F4Be7F2Ff0d4FCF2237f', // Replace with actual address
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
};

export const SUPPORTED_CHAIN_IDS = [NETWORKS.hardhat.chainId, NETWORKS.amoy.chainId];

export function getNetworkByChainId(chainId) {
  return Object.values(NETWORKS).find((n) => n.chainId === chainId);
}
