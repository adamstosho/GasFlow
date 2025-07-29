import { PreferencesProvider } from "./context/PreferencesContext"
import { Home } from "./pages/Home"

function App() {
  return (
    <PreferencesProvider>
      <div className="App">
        <Home />
      </div>
    </PreferencesProvider>
  )
}

export default App
