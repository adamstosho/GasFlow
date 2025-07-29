"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Play, Pause, Maximize2, X } from "lucide-react"

export const DemoVideo = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl mx-4 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            GasFlow Demo
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Play className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Video Content */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          {/* Mock App Interface */}
          <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Mock Header */}
            <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-white font-semibold">GasFlow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm">Live Data</span>
              </div>
            </div>

            {/* Mock Content */}
            <div className="p-6 space-y-4">
              {/* Gas Cards */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4"
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-16 h-6 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                    <div className="w-12 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </motion.div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-24 h-4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                  <div className="w-16 h-4 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded-lg relative overflow-hidden">
                  {/* Animated Chart Line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20">
                    <motion.path
                      d="M0,10 Q25,5 50,10 T100,10"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="h-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    animate={{
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-500 rounded-lg mb-2"></div>
                    <div className="w-12 h-3 bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                    <div className="w-8 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Experience the full power of GasFlow - Real-time Ethereum gas tracking with professional analytics
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}