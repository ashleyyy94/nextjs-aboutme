'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { MdRefresh, MdInfo, MdTrendingUp, MdTrendingDown } from 'react-icons/md';

// Card values and suits
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Game states
const GAME_STATES = {
  WAITING: 'waiting',
  DEALING: 'dealing',
  PLAYER_TURN: 'player_turn',
  DEALER_TURN: 'dealer_turn',
  GAME_OVER: 'game_over',
};

// Create a standard deck
const createDeck = () => {
  const deck = [];
  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      deck.push({ suit, rank });
    });
  });
  return deck;
};

// Shuffle deck using Fisher-Yates algorithm
const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Calculate hand value
const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (card.rank === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  });

  // Adjust for aces
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
};

// Basic strategy recommendations
const getBasicStrategyAction = (playerValue, dealerUpCard, playerHand) => {
  const dealerValue =
    dealerUpCard.rank === 'A' ? 11 : ['J', 'Q', 'K'].includes(dealerUpCard.rank) ? 10 : parseInt(dealerUpCard.rank);

  const hasAce = playerHand.some((card) => card.rank === 'A') && playerValue <= 11;
  const isPair = playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank;

  // Simplified basic strategy
  if (isPair) {
    const pairRank = playerHand[0].rank;
    if (pairRank === 'A' || pairRank === '8') return 'split';
    if (pairRank === '10' || pairRank === 'J' || pairRank === 'Q' || pairRank === 'K') return 'stand';
  }

  if (hasAce) {
    // Soft hands
    if (playerValue >= 19) return 'stand';
    if (playerValue === 18 && dealerValue <= 6) return 'stand';
    return 'hit';
  }

  // Hard hands
  if (playerValue >= 17) return 'stand';
  if (playerValue >= 13 && dealerValue <= 6) return 'stand';
  if (playerValue === 12 && dealerValue >= 4 && dealerValue <= 6) return 'stand';
  return 'hit';
};

export default function BlackjackSimulator() {
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.WAITING);
  const [message, setMessage] = useState('Click "New Game" to start');
  const [playerMoney, setPlayerMoney] = useState(1000);
  const [currentBet, setCurrentBet] = useState(10);
  const [showBasicStrategy, setShowBasicStrategy] = useState(false);
  const [gameStats, setGameStats] = useState({
    wins: 0,
    losses: 0,
    pushes: 0,
    blackjacks: 0,
  });

  const playerValue = useMemo(() => calculateHandValue(playerHand), [playerHand]);
  const dealerValue = useMemo(() => calculateHandValue(dealerHand), [dealerHand]);
  const dealerUpCard = dealerHand.length > 0 ? dealerHand[0] : null;

  const basicStrategyAction = useMemo(() => {
    if (gameState === GAME_STATES.PLAYER_TURN && showBasicStrategy && dealerUpCard) {
      return getBasicStrategyAction(playerValue, dealerUpCard, playerHand);
    }
    return null;
  }, [gameState, showBasicStrategy, playerValue, dealerUpCard, playerHand]);

  const newGame = useCallback(() => {
    if (playerMoney < currentBet) {
      setMessage('Insufficient funds for this bet');
      return;
    }

    let newDeck = deck.length < 20 ? shuffleDeck(createDeck()) : [...deck];

    // Deal initial cards
    const newPlayerHand = [newDeck.pop(), newDeck.pop()];
    const newDealerHand = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameState(GAME_STATES.DEALING);

    // Check for blackjacks
    const playerBlackjack = calculateHandValue(newPlayerHand) === 21;
    const dealerBlackjack = calculateHandValue(newDealerHand) === 21;

    if (playerBlackjack && dealerBlackjack) {
      setMessage('Both have Blackjack! Push');
      setGameState(GAME_STATES.GAME_OVER);
      setGameStats((prev) => ({ ...prev, pushes: prev.pushes + 1 }));
    } else if (playerBlackjack) {
      setMessage('Blackjack! You win!');
      setPlayerMoney((prev) => prev + Math.floor(currentBet * 1.5));
      setGameState(GAME_STATES.GAME_OVER);
      setGameStats((prev) => ({ ...prev, wins: prev.wins + 1, blackjacks: prev.blackjacks + 1 }));
    } else if (dealerBlackjack) {
      setMessage('Dealer has Blackjack! You lose');
      setPlayerMoney((prev) => prev - currentBet);
      setGameState(GAME_STATES.GAME_OVER);
      setGameStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setGameState(GAME_STATES.PLAYER_TURN);
      setMessage('Your turn - Hit or Stand?');
    }
  }, [deck, currentBet, playerMoney]);

  const stand = useCallback(() => {
    if (gameState !== GAME_STATES.PLAYER_TURN) return;

    setGameState(GAME_STATES.DEALER_TURN);
    setMessage("Dealer's turn");

    // Dealer plays
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    let dealerVal = calculateHandValue(newDealerHand);

    while (dealerVal < 17) {
      const newCard = newDeck.pop();
      newDealerHand.push(newCard);
      dealerVal = calculateHandValue(newDealerHand);
    }

    setDeck(newDeck);
    setDealerHand(newDealerHand);

    // Determine winner
    setTimeout(() => {
      if (dealerVal > 21) {
        setMessage('Dealer busts! You win!');
        setPlayerMoney((prev) => prev + currentBet);
        setGameStats((prev) => ({ ...prev, wins: prev.wins + 1 }));
      } else if (dealerVal > playerValue) {
        setMessage('Dealer wins');
        setPlayerMoney((prev) => prev - currentBet);
        setGameStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
      } else if (playerValue > dealerVal) {
        setMessage('You win!');
        setPlayerMoney((prev) => prev + currentBet);
        setGameStats((prev) => ({ ...prev, wins: prev.wins + 1 }));
      } else {
        setMessage("Push - It's a tie");
        setGameStats((prev) => ({ ...prev, pushes: prev.pushes + 1 }));
      }
      setGameState(GAME_STATES.GAME_OVER);
    }, 1000);
  }, [gameState, deck, dealerHand, playerValue, currentBet]);

  const hit = useCallback(() => {
    if (gameState !== GAME_STATES.PLAYER_TURN) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newPlayerHand = [...playerHand, newCard];
    const newValue = calculateHandValue(newPlayerHand);

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    if (newValue > 21) {
      setMessage('Bust! You lose');
      setPlayerMoney((prev) => prev - currentBet);
      setGameState(GAME_STATES.GAME_OVER);
      setGameStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else if (newValue === 21) {
      stand();
    }
  }, [gameState, deck, playerHand, currentBet, stand]);

  const resetGame = () => {
    setDeck(shuffleDeck(createDeck()));
    setPlayerHand([]);
    setDealerHand([]);
    setGameState(GAME_STATES.WAITING);
    setMessage('Click "New Game" to start');
    setPlayerMoney(1000);
    setCurrentBet(10);
    setGameStats({ wins: 0, losses: 0, pushes: 0, blackjacks: 0 });
  };

  const Card = ({ card, hidden = false }) => (
    <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center shadow-md mx-1">
      {hidden ? (
        <div className="w-full h-full bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs">🂠</span>
        </div>
      ) : (
        <>
          <span
            className={`text-lg font-bold ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}
          >
            {card.rank}
          </span>
          <span className={`text-2xl ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}`}>
            {card.suit}
          </span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Game Stats and Controls */}
      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Game Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameStats.wins}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{gameStats.losses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Losses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{gameStats.pushes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pushes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameStats.blackjacks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Blackjacks</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Money: ${playerMoney}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bet Amount: ${currentBet}
                </label>
                <input
                  type="range"
                  min="10"
                  max={Math.min(playerMoney, 100)}
                  value={currentBet}
                  onChange={(e) => setCurrentBet(parseInt(e.target.value))}
                  className="w-full"
                  disabled={gameState !== GAME_STATES.WAITING && gameState !== GAME_STATES.GAME_OVER}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBasicStrategy(!showBasicStrategy)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    showBasicStrategy
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Basic Strategy
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  <MdRefresh className="inline mr-1" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-green-800 rounded-2xl p-6 min-h-96">
        {/* Dealer Hand */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-bold mb-4">
            Dealer{' '}
            {gameState !== GAME_STATES.PLAYER_TURN && gameState !== GAME_STATES.WAITING ? `(${dealerValue})` : ''}
          </h3>
          <div className="flex justify-center">
            {dealerHand.map((card, index) => (
              <Card
                key={index}
                card={card}
                hidden={index === 1 && (gameState === GAME_STATES.DEALING || gameState === GAME_STATES.PLAYER_TURN)}
              />
            ))}
          </div>
        </div>

        {/* Game Message */}
        <div className="text-center mb-8">
          <div className="bg-white/90 rounded-xl p-4 inline-block">
            <p className="text-lg font-medium text-gray-900">{message}</p>
            {basicStrategyAction && (
              <p className="text-sm text-blue-600 mt-2">
                Basic Strategy: <strong>{basicStrategyAction.toUpperCase()}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Player Hand */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">
            Player ({playerValue}) {playerValue > 21 ? '- BUST' : ''}
          </h3>
          <div className="flex justify-center mb-6">
            {playerHand.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {gameState === GAME_STATES.WAITING || gameState === GAME_STATES.GAME_OVER ? (
            <button
              onClick={newGame}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              disabled={playerMoney < currentBet}
            >
              New Game
            </button>
          ) : gameState === GAME_STATES.PLAYER_TURN ? (
            <>
              <button
                onClick={hit}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
              >
                Hit
              </button>
              <button
                onClick={stand}
                className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-colors"
              >
                Stand
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Game Rules */}
      <div className="bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          <MdInfo className="inline mr-2" />
          How to Play
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-bold mb-2">Objective</h3>
            <p className="text-sm mb-4">
              Get as close to 21 as possible without going over, while beating the dealer&apos;s hand.
            </p>
            <h3 className="font-bold mb-2">Card Values</h3>
            <ul className="text-sm space-y-1">
              <li>• Number cards: Face value</li>
              <li>• Face cards (J, Q, K): 10</li>
              <li>• Ace: 1 or 11 (whichever is better)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Basic Strategy</h3>
            <p className="text-sm mb-4">
              Enable &apos;Basic Strategy&apos; to see mathematically optimal moves. This reduces the house edge to
              about 0.5%.
            </p>
            <h3 className="font-bold mb-2">Payouts</h3>
            <ul className="text-sm space-y-1">
              <li>• Regular win: 1:1</li>
              <li>• Blackjack: 3:2</li>
              <li>• Push (tie): No money exchanged</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
