export const GAS_LEVELS = {
  LOW: { threshold: 20, color: "success", label: "Low", emoji: "🟢" },
  MEDIUM: { threshold: 50, color: "warning", label: "Medium", emoji: "🟡" },
  HIGH: { threshold: Number.POSITIVE_INFINITY, color: "error", label: "High", emoji: "🔴" },
}

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.85 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.73 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1650 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 150 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.35 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.55 },
]

export const GAS_TIPS = [
  {
    title: "⏰ Time Your Transactions",
    content:
      "Gas fees are typically 30-50% lower during weekends and late night hours (2-6 AM UTC). Plan non-urgent transactions accordingly.",
    category: "timing",
  },
  {
    title: "🌉 Use Layer 2 Solutions",
    content:
      "Save up to 90% on fees using Polygon, Arbitrum, or Optimism. Perfect for DeFi, NFTs, and frequent transactions.",
    category: "scaling",
  },
  {
    title: "📦 Batch Your Transactions",
    content:
      "Group multiple operations together using batch transaction tools. This can reduce total gas costs by 20-40%.",
    category: "optimization",
  },
  {
    title: "⚡ Set Smart Gas Limits",
    content:
      "Use 21,000 for ETH transfers, 65,000 for ERC-20 tokens. Avoid setting limits too high to prevent overpaying.",
    category: "limits",
  },
  {
    title: "🚫 Avoid Peak Hours",
    content:
      "Skip transacting during NFT drops, major DeFi events, or market volatility. Network congestion can increase fees 5-10x.",
    category: "timing",
  },
  {
    title: "🔄 Use Gas Trackers",
    content:
      "Monitor gas trends and set alerts. Waiting 10-15 minutes during high congestion can save significant fees.",
    category: "monitoring",
  },
  {
    title: "💡 Consider Gas Tokens",
    content:
      "Advanced users can mint gas tokens during low-fee periods and burn them during high-fee periods for savings.",
    category: "advanced",
  },
]

export const TRANSACTION_TYPES = {
  SIMPLE_TRANSFER: { gasLimit: 21000, label: "ETH Transfer", icon: "💸", description: "Basic ETH send" },
  ERC20_TRANSFER: { gasLimit: 65000, label: "Token Transfer", icon: "🪙", description: "ERC-20 token send" },
  CONTRACT_INTERACTION: { gasLimit: 150000, label: "Smart Contract", icon: "📋", description: "Contract interaction" },
  NFT_MINTING: { gasLimit: 200000, label: "NFT Mint", icon: "🎨", description: "Mint NFT" },
  UNISWAP_SWAP: { gasLimit: 180000, label: "DEX Swap", icon: "🔄", description: "Token swap" },
  NFT_TRANSFER: { gasLimit: 85000, label: "NFT Transfer", icon: "🖼️", description: "Transfer NFT" },
  DEFI_STAKE: { gasLimit: 220000, label: "DeFi Staking", icon: "🏦", description: "Stake tokens" },
  MULTI_SEND: { gasLimit: 300000, label: "Batch Transfer", icon: "📤", description: "Multiple transfers" },
}

export const NETWORK_STATUS = {
  OPTIMAL: { label: "Optimal", color: "green", threshold: 20 },
  MODERATE: { label: "Moderate", color: "yellow", threshold: 50 },
  CONGESTED: { label: "Congested", color: "red", threshold: 100 },
  CRITICAL: { label: "Critical", color: "red", threshold: Number.POSITIVE_INFINITY },
}

export const REFRESH_INTERVAL = 15000 
export const CHART_DATA_POINTS = 30 
export const ALERT_SOUND_URL = "/notification.mp3"
export const MAX_HISTORY_DAYS = 7
