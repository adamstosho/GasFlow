"use client"

import { useState, useEffect, useCallback } from "react"
import { gasApiService } from "../services/gasApi"
import { REFRESH_INTERVAL, CHART_DATA_POINTS } from "../utils/constants"

export const useGasData = () => {
  const [gasData, setGasData] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const cachedData = localStorage.getItem("gasflow-last-data")
    const cachedChart = localStorage.getItem("gasflow-chart-data")

    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData)
        setGasData(parsed.gasData)
        setLastUpdated(new Date(parsed.timestamp))
      } catch (e) {
        console.error("Failed to parse cached data:", e)
      }
    }

    if (cachedChart) {
      try {
        setChartData(JSON.parse(cachedChart))
      } catch (e) {
        console.error("Failed to parse cached chart data:", e)
      }
    }
  }, [])

  const fetchGasData = useCallback(async () => {
    try {
      setError(null)
      const data = await gasApiService.getCurrentGasPrices()

      if (data) {
        setGasData(data)
        const now = new Date()
        setLastUpdated(now)
        setRetryCount(0)

        localStorage.setItem(
          "gasflow-last-data",
          JSON.stringify({
            gasData: data,
            timestamp: now.toISOString(),
          }),
        )

        setChartData((prevData) => {
          const newDataPoint = {
            time: now.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            }),
            timestamp: Date.now(),
            slow: Number.parseFloat(data.SafeGasPrice),
            standard: Number.parseFloat(data.ProposeGasPrice),
            fast: Number.parseFloat(data.FastGasPrice),
          }

          const updatedData = [...prevData, newDataPoint]

          const finalData = updatedData.length > CHART_DATA_POINTS ? updatedData.slice(-CHART_DATA_POINTS) : updatedData

          localStorage.setItem("gasflow-chart-data", JSON.stringify(finalData))

          return finalData
        })
      }
    } catch (err) {
      console.error("Error fetching gas data:", err)
      setRetryCount((prev) => prev + 1)

      if (retryCount < 3) {
        setError(`Connection issue. Retrying... (${retryCount + 1}/3)`)
        setTimeout(fetchGasData, 5000)
      } else {
        setError("Unable to fetch gas data. Please check your connection and try again.")
      }
    } finally {
      setLoading(false)
    }
  }, [retryCount])

  useEffect(() => {
    fetchGasData()
  }, [fetchGasData])

  useEffect(() => {
    const interval = setInterval(fetchGasData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchGasData])

  const refreshData = useCallback(() => {
    setLoading(true)
    setRetryCount(0)
    fetchGasData()
  }, [fetchGasData])

  return {
    gasData,
    chartData,
    loading,
    error,
    lastUpdated,
    refreshData,
    retryCount,
  }
}
