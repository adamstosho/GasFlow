"use client"

import { motion } from "framer-motion"
import { Calendar, Download, TrendingUp, TrendingDown } from "lucide-react"
import { useState, useEffect } from "react"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { usePreferences } from "../context/PreferencesContext"
import { formatGwei, formatTime } from "../utils/formatters"

export const HistoricalData = () => {
  const [timeRange, setTimeRange] = useState("24h")
  const [historicalData, setHistoricalData] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const { theme } = usePreferences()

  // Generate mock historical data for demo
  useEffect(() => {
    const generateHistoricalData = () => {
      const data = []
      const now = Date.now()
      const points = timeRange === "24h" ? 24 : timeRange === "7d" ? 168 : 720 // hours
      const interval = timeRange === "24h" ? 3600000 : 3600000 // 1 hour intervals

      let baseGas = 25

      for (let i = points; i >= 0; i--) {
        const timestamp = now - i * interval

        // Simulate realistic gas price fluctuations
        const volatility = Math.random() * 10 - 5
        const timeOfDay = new Date(timestamp).getHours()
        const dayOfWeek = new Date(timestamp).getDay()

        // Lower fees on weekends and late night
        let multiplier = 1
        if (dayOfWeek === 0 || dayOfWeek === 6) multiplier *= 0.7
        if (timeOfDay >= 2 && timeOfDay <= 6) multiplier *= 0.6
        if (timeOfDay >= 14 && timeOfDay <= 18) multiplier *= 1.4 // Peak hours

        baseGas = Math.max(5, baseGas + volatility)
        const gasPrice = baseGas * multiplier

        data.push({
          timestamp,
          time: formatTime(timestamp),
          date: new Date(timestamp).toLocaleDateString(),
          gasPrice: Math.round(gasPrice * 10) / 10,
          low: Math.round((gasPrice - 5) * 10) / 10,
          high: Math.round((gasPrice + 8) * 10) / 10,
        })
      }

      return data
    }

    setLoading(true)
    setTimeout(() => {
      const data = generateHistoricalData()
      setHistoricalData(data)

      // Calculate stats
      const prices = data.map((d) => d.gasPrice)
      const currentPrice = prices[prices.length - 1]
      const previousPrice = prices[prices.length - 2]
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length

      setStats({
        current: currentPrice,
        change: currentPrice - previousPrice,
        changePercent: ((currentPrice - previousPrice) / previousPrice) * 100,
        min: minPrice,
        max: maxPrice,
        avg: avgPrice,
      })

      setLoading(false)
    }, 1000)
  }, [timeRange])

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Timestamp,Date,Time,Gas Price (Gwei),Low (Gwei),High (Gwei)\n" +
      historicalData
        .map((row) => `${row.timestamp},${row.date},${row.time},${row.gasPrice},${row.low},${row.high}`)
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `gaslite-historical-${timeRange}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} Gwei
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      className="gas-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-primary mr-3" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Historical Data</h3>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>

          <button
            onClick={exportData}
            disabled={loading}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            title="Export data"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Current</div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{formatGwei(stats.current)}</div>
                <div className={`text-xs flex items-center ${stats.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stats.change >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stats.changePercent.toFixed(1)}%
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Average</div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{formatGwei(stats.avg)}</div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Minimum</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{formatGwei(stats.min)}</div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Maximum</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{formatGwei(stats.max)}</div>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#E5E7EB"} />
                <XAxis
                  dataKey={timeRange === "24h" ? "time" : "date"}
                  stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  fontSize={12}
                />
                <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="gasPrice" stroke="#3B82F6" strokeWidth={2} fill="url(#gasGradient)" />
                <Line
                  type="monotone"
                  dataKey="low"
                  stroke="#10B981"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke="#EF4444"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </motion.div>
  )
}
