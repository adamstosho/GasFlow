"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Lightbulb, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { GAS_TIPS } from "../utils/constants"

export const TipBox = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % GAS_TIPS.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isAutoRotating])

  const nextTip = () => {
    setIsAutoRotating(false)
    setCurrentTipIndex((prev) => (prev + 1) % GAS_TIPS.length)
  }

  const prevTip = () => {
    setIsAutoRotating(false)
    setCurrentTipIndex((prev) => (prev - 1 + GAS_TIPS.length) % GAS_TIPS.length)
  }

  const currentTip = GAS_TIPS[currentTipIndex]

  return (
    <motion.div
      className="tip-box relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/50 to-transparent dark:from-indigo-900/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-primary to-blue-600 rounded-xl mr-3">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-primary-dark text-lg">Gas Saving Tips</h3>
              <p className="text-xs text-muted-dark">Expert advice</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={prevTip}
              className="p-2 rounded-xl bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous tip"
            >
              <ChevronLeft className="w-4 h-4 text-secondary-dark" />
            </motion.button>
            <motion.button
              onClick={nextTip}
              className="p-2 rounded-xl bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next tip"
            >
              <ChevronRight className="w-4 h-4 text-secondary-dark" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTipIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-primary-dark mb-3 text-lg">{currentTip.title}</h4>
                <p className="text-sm text-secondary-dark leading-relaxed">{currentTip.content}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center space-x-2">
          {GAS_TIPS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsAutoRotating(false)
                setCurrentTipIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTipIndex 
                  ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-dark">
            Tip {currentTipIndex + 1} of {GAS_TIPS.length}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
