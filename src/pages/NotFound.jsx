"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold text-primary mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          404
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to tracking gas fees!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
