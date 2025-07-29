"use client"

import { motion } from "framer-motion"
import { Database, Key, Info } from "lucide-react"
import { gasApiService } from "../services/gasApi"

export const ApiStatusBanner = () => {
  const apiStatus = gasApiService.getApiStatus()

  if (apiStatus === "live-data") {
    return null 
  }

  const getBannerInfo = () => {
    if (apiStatus === "no-api-key") {
      return {
        icon: Key,
        title: "Demo Mode",
        message: "You're viewing realistic mock data. Get a free API key for live data.",
        color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        textColor: "text-blue-800 dark:text-blue-200",
        linkText: "Get API Key",
        linkUrl: "https://etherscan.io/apis"
      }
    }

    return {
      icon: Database,
      title: "Mock Data",
      message: "API temporarily unavailable. Showing realistic mock data.",
      color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      textColor: "text-orange-800 dark:text-orange-200",
      linkText: "Learn More",
      linkUrl: "#"
    }
  }

  const bannerInfo = getBannerInfo()
  const Icon = bannerInfo.icon

  return (
    <motion.div
      className={`${bannerInfo.color} border rounded-xl p-4 mb-6 shadow-sm`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${bannerInfo.textColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <h4 className={`font-semibold ${bannerInfo.textColor} mb-1`}>
            {bannerInfo.title}
          </h4>
          <p className={`text-sm ${bannerInfo.textColor} opacity-90 mb-2`}>
            {bannerInfo.message}
          </p>
          <a
            href={bannerInfo.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-xs font-medium ${bannerInfo.textColor} hover:opacity-80 transition-opacity`}
          >
            <Info className="w-3 h-3 mr-1" />
            {bannerInfo.linkText}
          </a>
        </div>
      </div>
    </motion.div>
  )
}