'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NETWORKS, SUPPORTED_CHAIN_IDS, getNetworkByChainId } from '../config/blockchain';
import styles from '@/app/guestbook/guestbook.module.scss';

const GuestbookABI = [
  'function signGuestbook(string memory _content) public payable',
  'function getMessages() public view returns (tuple(address author, string content, uint256 timestamp)[] memory)',
  'function getMessageCount() public view returns (uint256)',
  'event NewMessage(address indexed author, string content, uint256 timestamp)',
  'event TipReceived(address indexed from, uint256 amount)',
];

export default function Guestbook() {
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [selectedNetworkKey, setSelectedNetworkKey] = useState('amoy');
  const [tip, setTip] = useState(''); // tip in SGD
  const [ethRate, setEthRate] = useState(null); // ETH/MATIC to SGD
  const [fetchingRate, setFetchingRate] = useState(false);

  // Detect wallet/network on mount and on account/network change
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleChainChanged = (_chainId) => {
      const parsed = parseInt(_chainId, 16);
      setChainId(parsed);
      const net = getNetworkByChainId(parsed);
      setNetwork(net);
      setContractAddress(net ? net.contractAddress : '');
    };
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || '');
    };
    window.ethereum.request({ method: 'eth_chainId' }).then((_chainId) => {
      handleChainChanged(_chainId);
    });
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      handleAccountsChanged(accounts);
    });
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    if (contractAddress) loadMessages();
  }, [contractAddress]);

  // Fetch ETH/MATIC to SGD rate on mount and when network changes
  useEffect(() => {
    async function fetchRate() {
      setFetchingRate(true);
      try {
        let url;
        if (network?.nativeCurrency?.symbol === 'MATIC') {
          url = 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=sgd';
        } else {
          url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=sgd';
        }
        const res = await fetch(url);
        const data = await res.json();
        setEthRate(network?.nativeCurrency?.symbol === 'MATIC' ? data['matic-network']?.sgd : data['ethereum']?.sgd);
      } catch (e) {
        setEthRate(null);
      } finally {
        setFetchingRate(false);
      }
    }
    if (network) fetchRate();
  }, [network]);

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error('Please install MetaMask to use this feature');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      // After connecting, check network
      const _chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const parsed = parseInt(_chainId, 16);
      setChainId(parsed);
      const net = getNetworkByChainId(parsed);
      setNetwork(net);
      setContractAddress(net ? net.contractAddress : '');
    } catch (error) {
      const errMsg = error && error.message ? error.message : String(error);
      toast.error(`Failed to connect wallet: ${errMsg}`);
      setError('Failed to connect wallet');
      console.error(error);
    }
  }

  async function switchToSupportedNetwork() {
    if (!window.ethereum) return;
    // Prefer Amoy, fallback to Hardhat
    const target = NETWORKS.amoy.contractAddress !== '<YOUR_AMOY_CONTRACT_ADDRESS>' ? NETWORKS.amoy : NETWORKS.hardhat;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + target.chainId.toString(16) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + target.chainId.toString(16),
                chainName: target.name,
                rpcUrls: [target.rpcUrl],
                blockExplorerUrls: target.explorer ? [target.explorer] : [],
                nativeCurrency: target.nativeCurrency,
              },
            ],
          });
        } catch (addError) {
          toast.error('Failed to add network');
        }
      } else {
        toast.error('Failed to switch network');
      }
    }
  }

  async function loadMessages() {
    if (!window.ethereum || !contractAddress) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, GuestbookABI, provider);
      const result = await contract.getMessages();

      const formattedMessages = result.map((msg) => ({
        author: msg.author,
        content: msg.content,
        timestamp: new Date(Number(msg.timestamp) * 1000).toLocaleString(),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      const errMsg = error && error.message ? error.message : String(error);
      toast.error(`Failed to load messages: ${errMsg}`);
      // Do not setError here; UI already handles empty state with friendly message
    }
  }

  async function signGuestbook(e) {
    e.preventDefault();
    if (!message) return;
    if (!window.ethereum) {
      toast.error('Please install MetaMask to use this feature');
      setError('Please install MetaMask to use this feature');
      return;
    }
    if (!account) {
      await connectWallet();
      return;
    }
    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      toast.error('Please switch to a supported network');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, GuestbookABI, signer);
      let tx;
      if (tip && parseFloat(tip) > 0 && ethRate) {
        const value = ethers.parseEther((parseFloat(tip) / ethRate).toFixed(18));
        tx = await contract.signGuestbook(message, { value });
      } else {
        tx = await contract.signGuestbook(message);
      }
      await tx.wait();
      setMessage('');
      setTip('');
      await loadMessages();
      toast.success('Message signed successfully!');
    } catch (error) {
      const errMsg = error && error.message ? error.message : String(error);
      console.error('Error signing guestbook:', error);
      toast.error(`Failed to sign guestbook: ${errMsg}`);
      setError('Failed to sign guestbook');
    } finally {
      setLoading(false);
    }
  }

  // Dropdown handler
  const handleNetworkSelect = async (e) => {
    const key = e.target.value;
    setSelectedNetworkKey(key);
    const net = NETWORKS[key];
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + net.chainId.toString(16) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + net.chainId.toString(16),
                chainName: net.name,
                rpcUrls: [net.rpcUrl],
                blockExplorerUrls: net.explorer ? [net.explorer] : [],
                nativeCurrency: net.nativeCurrency,
              },
            ],
          });
        } catch (addError) {
          toast.error('Failed to add network');
        }
      } else {
        toast.error('Failed to switch network');
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="relative max-w-2xl mx-auto p-0 sm:p-1">
        {/* Decorative accent bar */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg z-10" />
        <div
          className={`relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-800 transition-colors
            ring-1 ring-blue-300/30 dark:ring-blue-900/40
            hover:ring-4 hover:ring-blue-400/40 dark:hover:ring-blue-500/40
            ${styles.fadeIn}`}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-blue-200 flex items-center gap-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="inline-block">
              <rect width="32" height="32" rx="16" fill="url(#gbook-gradient)" />
              <defs>
                <linearGradient id="gbook-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            Say Hi and sign a message!
          </h2>
          <div className="mb-4">
            <span className="font-semibold text-gray-700 dark:text-blue-200">Network status:</span>{' '}
            {network ? (
              <span className="text-green-700 dark:text-green-400 font-medium">{network.name}</span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-medium">Not connected or unsupported</span>
            )}
          </div>
          {!SUPPORTED_CHAIN_IDS.includes(chainId) && (
            <div className="mb-4">
              <div className="text-red-600 dark:text-red-400 font-semibold">
                Please switch to Polygon Amoy or Local Hardhat network.
              </div>
              <button
                onClick={switchToSupportedNetwork}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:text-white font-semibold transition-colors"
              >
                Switch Network
              </button>
            </div>
          )}
          {!account && (
            <button
              onClick={connectWallet}
              className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500 font-semibold transition-colors"
            >
              Connect Wallet
            </button>
          )}
          {account && SUPPORTED_CHAIN_IDS.includes(chainId) && (
            <form onSubmit={signGuestbook} className="mb-6 space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message..."
                className="w-full p-2 border rounded-lg mb-2 dark:bg-neutral-800 dark:text-blue-100 dark:border-neutral-700 bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                maxLength={280}
              />
              <div className="flex items-center gap-2">
                <label htmlFor="tip" className="text-sm font-medium text-gray-700 dark:text-blue-200">
                  <span role="img" aria-label="coffee">
                    ☕
                  </span>{' '}
                  Buy me a coffee! (SGD):
                </label>
                <input
                  id="tip"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="w-24 p-2 border rounded-lg dark:bg-neutral-800 dark:text-blue-100 dark:border-neutral-700 bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-blue-300 ml-1">
                {fetchingRate
                  ? 'Fetching rate...'
                  : ethRate && tip && parseFloat(tip) > 0
                  ? `≈ ${(parseFloat(tip) / ethRate).toFixed(6)} ${network?.nativeCurrency?.symbol || 'ETH'}`
                  : ' '}
              </div>
              <button
                type="submit"
                disabled={loading || !message}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:bg-blue-700 dark:hover:bg-blue-500 dark:disabled:bg-neutral-700 dark:text-white font-semibold"
              >
                {loading ? 'Signing...' : 'Sign Guestbook'}
              </button>
            </form>
          )}
          {error && <div className="text-red-600 dark:text-red-400 mb-4 font-semibold">{error}</div>}
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="network-select" className="font-semibold text-gray-700 dark:text-blue-200">
              Select Network:
            </label>
            <select
              id="network-select"
              value={selectedNetworkKey}
              onChange={handleNetworkSelect}
              className="w-fit p-2 border rounded-lg dark:bg-neutral-800 dark:text-blue-100 dark:border-neutral-700 bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
            >
              {Object.entries(NETWORKS).map(([key, net]) => (
                <option key={key} value={key} className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-blue-100">
                  {net.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-blue-300 py-8 text-lg font-medium">
                Be the first to leave a message!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="border-b pb-4 border-gray-200 dark:border-neutral-800">
                  <div className="text-sm text-gray-500 dark:text-blue-300 break-all">
                    {msg.author ? `0x${msg.author.slice(2, 7)}...${msg.author.slice(-5)}` : ''}
                  </div>
                  <div className="mt-1 text-gray-900 dark:text-blue-100">{msg.content}</div>
                  <div className="text-sm text-gray-500 dark:text-blue-300 mt-1">{msg.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
