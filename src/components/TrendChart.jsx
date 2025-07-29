"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { usePreferences } from "../context/PreferencesContext"

export const TrendChart = ({ data }) => {
  const { theme } = usePreferences()

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

  if (!data || data.length === 0) {
    return (
      <motion.div
        className="gas-card h-64 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-32 mx-auto"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading chart data...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="gas-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Gas Price Trends</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Last {data.length} updates</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#E5E7EB"} />
            <XAxis dataKey="time" stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} fontSize={12} />
            <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="slow"
              stroke="#10B981"
              strokeWidth={2}
              name="Slow"
              dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: "#10B981", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="standard"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Standard"
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: "#3B82F6", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="fast"
              stroke="#EF4444"
              strokeWidth={2}
              name="Fast"
              dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: "#EF4444", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Slow</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Standard</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-error rounded-full mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Fast</span>
        </div>
      </div>
    </motion.div>
  )
}
