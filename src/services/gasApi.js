class GasApiService {
  constructor() {
    this.baseUrl = "https://api.etherscan.io/api"
    this.apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || "YourApiKeyToken"
    this.lastRequestTime = 0
    this.minRequestInterval = 5000 
    this.isUsingMockData = false
  }

  async getCurrentGasPrices() {
    try {
      if (this.apiKey === "YourApiKeyToken") {
        console.log("🔑 Using placeholder API key - switching to mock data")
        this.isUsingMockData = true
        return this.getMockGasData()
      }

      const now = Date.now()
      if (now - this.lastRequestTime < this.minRequestInterval) {
        console.log("⏱️ Rate limit: Waiting before next request...")
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
        this.isUsingMockData = false
        return data.result
      } else {
        if (data.message && data.message.includes("Invalid API Key")) {
          console.warn("🔑 Invalid API key detected - using mock data")
          this.isUsingMockData = true
        } else if (data.message && data.message.includes("rate limit")) {
          console.warn("⏱️ Rate limit reached - using mock data")
          this.isUsingMockData = true
        } else {
          console.warn("⚠️ API returned error:", data.message)
        }
        
        return this.getMockGasData()
      }
    } catch (error) {
      console.error("Gas API Error:", error)
      console.log("🔄 Falling back to realistic mock data...")
      this.isUsingMockData = true
      
      return this.getMockGasData()
    }
  }

  async getEthPrice() {
    try {
      if (this.apiKey === "YourApiKeyToken") {
        console.log("🔑 Using placeholder API key - switching to mock ETH price")
        return this.getMockEthPrice()
      }

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
        if (data.message && data.message.includes("Invalid API Key")) {
          console.warn("🔑 Invalid API key detected - using mock ETH price")
        } else if (data.message && data.message.includes("rate limit")) {
          console.warn("⏱️ Rate limit reached - using mock ETH price")
        } else {
          console.warn("⚠️ ETH price API returned error:", data.message)
        }
        
        return this.getMockEthPrice()
      }
    } catch (error) {
      console.error("ETH Price API Error:", error)
      console.log("🔄 Falling back to realistic mock ETH price...")
      return this.getMockEthPrice()
    }
  }

  getMockGasData() {
    const baseGas = 15 + Math.random() * 40 
    
    const mockData = {
      SafeGasPrice: Math.max(1, baseGas - 5 - Math.random() * 5).toFixed(0),
      ProposeGasPrice: baseGas.toFixed(0),
      FastGasPrice: (baseGas + 5 + Math.random() * 10).toFixed(0),
    }
    
    console.log("📊 Mock gas data generated:", mockData)
    return mockData
  }

  getMockEthPrice() {
    const mockPrice = 2000 + Math.random() * 500 
    console.log("💰 Mock ETH price generated:", mockPrice.toFixed(2))
    return mockPrice
  }

  isUsingMockDataNow() {
    return this.isUsingMockData
  }

  getApiStatus() {
    if (this.apiKey === "YourApiKeyToken") {
      return "no-api-key"
    }
    return this.isUsingMockData ? "mock-data" : "live-data"
  }
}

export const gasApiService = new GasApiService()
