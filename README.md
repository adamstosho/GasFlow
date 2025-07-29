# GasFlow - Ethereum Gas Fee Tracker

A modern, real-time Ethereum gas fee tracking application that helps users monitor gas prices, get alerts, and make informed transaction decisions.

![GasFlow Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Vite](https://img.shields.io/badge/Vite-7.0+-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-cyan)

##  What Problem Does GasFlow Solve?

Ethereum gas fees can be unpredictable and expensive. Users often struggle with:
- **High transaction costs** due to poor timing
- **Network congestion** making transactions slow
- **Lack of real-time data** for decision making
- **Complex gas estimation** tools

GasFlow solves these problems by providing:
- **Live gas price monitoring** every 15 seconds
- **Smart alerts** when prices are optimal
- **Easy-to-understand** gas fee breakdowns
- **Professional analytics** for informed decisions

##  Key Features

###  Real-Time Monitoring
- **Live gas prices** updated every 15 seconds
- **Three gas levels**: Slow, Standard, and Fast
- **Price trends** with interactive charts
- **Network status** indicators

###  Smart Features
- **Gas cost calculator** for different transaction types
- **Historical data** tracking and export
- **Custom alerts** for price thresholds
- **Dark/Light mode** support

###  User Experience
- **Responsive design** works on all devices
- **Beautiful animations** and modern UI
- **Easy navigation** with tabbed interface
- **Professional dashboard** layout

###  Technical Features
- **PWA support** for mobile installation
- **Offline capability** with cached data
- **API rate limiting** for reliability
- **Mock data fallback** when API is unavailable

##  Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gasflow.git
   cd gasflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file and add your Etherscan API key:
   ```
   VITE_ETHERSCAN_API_KEY=YourApiKeyToken
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

# Preview of the App Interface (screenhots)

![screenshot](/public/screenshots/screencapture-localhost-5174-2025-07-29-09_43_11_11zon.png)
Landing Page
![screenshot](/public/screenshots/screencapture-localhost-5174-2025-07-29-09_43_31_11zon.png)
Dashboard of the app
![screenshot](/public/screenshots/screencapture-localhost-5174-2025-07-29-09_43_53_11zon.png)
Calculator page
![screenshot](/public/screenshots/screencapture-localhost-5174-2025-07-29-09_44_04_11zon.png)
History page
![screenshot](/public/screenshots/screencapture-localhost-5174-2025-07-29-09_44_13_11zon.png)
Settings page


### Getting an API Key (Optional)

For live data, get a free API key from [Etherscan](https://etherscan.io/apis):
1. Visit [Etherscan API page](https://etherscan.io/apis)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

**Note**: The app works perfectly without an API key using realistic mock data.

##  How to Use GasFlow

###  Landing Page
- **Welcome screen** with app introduction
- **Feature showcase** with animations
- **"Start Tracking"** button to enter the app
- **"Watch Demo"** button to see app preview

###  Dashboard Tab
- **Current gas prices** displayed in three cards
- **Real-time updates** every 15 seconds
- **Price trends** chart showing recent activity
- **Gas saving tips** with helpful advice

###  Calculator Tab
- **Transaction type** selection (Transfer, Swap, etc.)
- **Gas cost estimation** for each speed level
- **USD and ETH** cost breakdowns
- **Share results** with others

###  History Tab
- **Historical gas data** tracking
- **Export data** to CSV format
- **Time range** selection
- **Data visualization** charts

###  Settings & Preferences
- **Theme toggle** (Light/Dark mode)
- **Currency selection** (USD, EUR, etc.)
- **Alert thresholds** for gas prices
- **Auto-refresh** settings

##  Built With

### Frontend Technologies
- **[React 18](https://reactjs.org/)** - User interface library
- **[Vite](https://vitejs.dev/)** - Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### Key Libraries
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Chart components
- **[React Router](https://reactrouter.com/)** - Navigation (if needed)

### APIs & Services
- **[Etherscan API](https://etherscan.io/apis)** - Ethereum blockchain data
- **Local Storage** - Data caching and preferences
- **Web APIs** - Notifications and PWA features

##  Project Structure

```
gasflow/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Main page components
│   ├── services/          # API and external services
│   ├── styles/            # CSS and styling
│   ├── utils/             # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── .env                   # Environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

##  Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build

##  Features in Detail

### Real-Time Gas Tracking
- Monitors Ethereum gas prices continuously
- Updates every 15 seconds automatically
- Shows Slow, Standard, and Fast gas levels
- Displays current network congestion status

### Smart Alerts
- Set custom gas price thresholds
- Receive browser notifications
- Get alerts when prices are optimal
- Avoid high gas fee periods

### Cost Calculator
- Calculate gas costs for different transactions
- Support for transfers, swaps, and contracts
- Real-time USD and ETH cost estimates
- Easy sharing of calculation results

### Historical Data
- Track gas price history over time
- Export data to CSV format
- Visualize trends with charts
- Analyze price patterns

## 🔧 Configuration

### Environment Variables
- `VITE_ETHERSCAN_API_KEY` - Your Etherscan API key
- `VITE_REFRESH_INTERVAL` - Data refresh interval (default: 15000ms)

### Customization
- Modify colors in `tailwind.config.js`
- Update gas thresholds in preferences
- Customize alert settings
- Adjust refresh intervals

##  Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use TypeScript for new features
- Write meaningful commit messages
- Test your changes thoroughly

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Etherscan** for providing reliable blockchain data
- **React community** for excellent documentation
- **Tailwind CSS** for the amazing utility framework
- **Framer Motion** for smooth animations

##  Support

If you have questions or need help:

- **Create an issue** on GitHub
- **Check the documentation** in this README
- **Review the code** for implementation details

##  Roadmap

- [ ] **Mobile app** development
- [ ] **More blockchain networks** support
- [ ] **Advanced analytics** features
- [ ] **Social features** for sharing insights
- [ ] **API rate optimization** improvements

---

**Made with ❤️ by ART_Redox for the Ethereum community**

*GasFlow - Your smart companion for Ethereum gas tracking*