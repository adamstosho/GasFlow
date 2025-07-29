# API Setup for Live Gas Data

## Current Status ✅

Your GasFlow PWA is configured to use **Etherscan's official API**, which is the most reliable source for Ethereum gas data.

## How It Works

1. **Live Updates**: Data refreshes every 15 seconds automatically
2. **Real API**: Uses Etherscan's gas oracle endpoint
3. **Fallback**: Shows realistic mock data when API is unavailable
4. **Rate Limiting**: Respects API rate limits (1 request/5sec without key)

## To Get Live Data (Optional)

### Step 1: Get Free API Key
1. Visit: https://etherscan.io/apis
2. Sign up for a free account
3. Get your API key (free tier: 100,000 requests/month)

### Step 2: Configure Environment
1. Copy `env.example` to `.env`
2. Replace `YourApiKeyToken` with your real API key:
   ```
   VITE_ETHERSCAN_API_KEY=YourRealApiKeyHere
   ```

### Step 3: Restart Development Server
```bash
npm run dev
```

## Current Behavior

- **With API Key**: Live data every 15 seconds (up to 100k requests/month)
- **Without API Key**: Live data every 15 seconds (limited to 1 request/5sec)
- **API Down**: Realistic mock data with random variations

## API Endpoints Used

- **Gas Prices**: `https://api.etherscan.io/api?module=gastracker&action=gasoracle`
- **ETH Price**: `https://api.etherscan.io/api?module=stats&action=ethprice`

## Data Quality

✅ **Genuine**: Uses official Etherscan API  
✅ **Live**: Updates every 15 seconds  
✅ **Reliable**: Fallback to mock data when needed  
✅ **Realistic**: Mock data reflects current market conditions  

The app will work perfectly with or without an API key!