"use client"

import { useState } from "react"
import { PreferencesProvider } from "./context/PreferencesContext"
import { Home } from "./pages/Home"
import { Landing } from "./pages/Landing"
import { motion, AnimatePresence } from "framer-motion"

function App() {
  const [showApp, setShowApp] = useState(false)

  const handleEnterApp = () => {
    setShowApp(true)
  }

  const handleBackToLanding = () => {
    setShowApp(false)
  }

  return (
    <PreferencesProvider>
      <AnimatePresence mode="wait">
        {!showApp ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing onEnterApp={handleEnterApp} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Home onBackToLanding={handleBackToLanding} />
          </motion.div>
        )}
      </AnimatePresence>
    </PreferencesProvider>
  )
}

export default App
