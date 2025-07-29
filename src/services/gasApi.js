class GasApiService {
  constructor() {
    this.baseUrl = "https://api.etherscan.io/api"
    this.apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || "YourApiKeyToken"
    this.lastRequestTime = 0
    this.minRequestInterval = 5000 
  }

  async getCurrentGasPrices() {
    try {
      // Check rate limiting
      const now = Date.now()
      if (now - this.lastRequestTime < this.minRequestInterval) {
        console.log("Rate limit: Waiting before next request...")
        await new Promise(resolve => setTimeout(resolve, this.minRequestInterval - (now - this.lastRequestTime)))
      }
      
      this.lastRequestTime = Date.now()
      
      const response = await fetch(`${this.baseUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === "1") {
        console.log("✅ Live gas data received:", data.result)
        return data.result
      } else {
        console.warn("⚠️ API returned error:", data.message)
        throw new Error(data.message || "Failed to fetch gas data")
      }
    } catch (error) {
      console.error("Gas API Error:", error)
      console.log("🔄 Falling back to realistic mock data...")
      
      // Return realistic mock data for demo purposes
      return this.getMockGasData()
    }
  }

  async getEthPrice() {
    try {
      // Check rate limiting
      const now = Date.now()
      if (now - this.lastRequestTime < this.minRequestInterval) {
        await new Promise(resolve => setTimeout(resolve, this.minRequestInterval - (now - this.lastRequestTime)))
      }
      
      this.lastRequestTime = Date.now()
      
      const response = await fetch(`${this.baseUrl}?module=stats&action=ethprice&apikey=${this.apiKey}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === "1") {
        console.log("✅ Live ETH price received:", data.result.ethusd)
        return Number.parseFloat(data.result.ethusd)
      } else {
        console.warn("⚠️ ETH price API returned error:", data.message)
        throw new Error(data.message || "Failed to fetch ETH price")
      }
    } catch (error) {
      console.error("ETH Price API Error:", error)
      console.log("🔄 Falling back to realistic mock ETH price...")
      // Return realistic mock price for demo
      return 2000 + Math.random() * 500 // Mock price between $2000-$2500
    }
  }

  getMockGasData() {
    // Generate realistic mock data based on current market conditions
    const baseGas = 15 + Math.random() * 40 // 15-55 Gwei range (realistic for current market)
    
    const mockData = {
      SafeGasPrice: Math.max(1, baseGas - 5 - Math.random() * 5).toFixed(0),
      ProposeGasPrice: baseGas.toFixed(0),
      FastGasPrice: (baseGas + 5 + Math.random() * 10).toFixed(0),
    }
    
    console.log("📊 Mock gas data generated:", mockData)
    return mockData
  }
}

export const gasApiService = new GasApiService()
