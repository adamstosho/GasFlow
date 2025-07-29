export const formatGwei = (gwei) => {
  if (!gwei) return "0"
  return Number.parseFloat(gwei).toFixed(1)
}

export const formatUSD = (amount, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(amount)
}

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const getGasLevel = (gasPrice) => {
  if (gasPrice <= 20) return "LOW"
  if (gasPrice <= 50) return "MEDIUM"
  return "HIGH"
}

export const calculateGasCost = (gasPrice, gasLimit, ethPrice) => {
  const gasCostEth = (gasPrice * gasLimit) / 1e9 // Convert from Gwei to ETH
  const gasCostUSD = gasCostEth * ethPrice
  return {
    eth: gasCostEth,
    usd: gasCostUSD,
  }
}

export const getGasLevelColor = (level) => {
  switch (level) {
    case "LOW":
      return "text-success"
    case "MEDIUM":
      return "text-warning"
    case "HIGH":
      return "text-error"
    default:
      return "text-gray-500"
  }
}

export const getGasLevelBg = (level) => {
  switch (level) {
    case "LOW":
      return "bg-green-100 dark:bg-green-900/20"
    case "MEDIUM":
      return "bg-yellow-100 dark:bg-yellow-900/20"
    case "HIGH":
      return "bg-red-100 dark:bg-red-900/20"
    default:
      return "bg-gray-100 dark:bg-gray-800"
  }
}
