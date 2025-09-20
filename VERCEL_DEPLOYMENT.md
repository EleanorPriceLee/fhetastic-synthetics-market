# Vercel Deployment Guide for FHEtastic Synthetics Market

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. GitHub repository: https://github.com/EleanorPriceLee/fhetastic-synthetics-market
3. Environment variables ready

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `EleanorPriceLee/fhetastic-synthetics-market`
4. Click "Import"

### Step 2: Configure Build Settings

1. **Framework Preset**: Vite
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Environment Variables

Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

**How to add environment variables:**
1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add each variable with the values above
5. Make sure to select "Production", "Preview", and "Development" for each variable

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Build Configuration

The project uses the following build configuration:

- **Node.js Version**: 18.x (recommended)
- **Package Manager**: npm
- **Build Tool**: Vite
- **Output**: Static files in `dist` directory

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia Chain ID | 11155111 |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for your network | https://sepolia.infura.io/v3/YOUR_KEY |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect Project ID | your_project_id_here |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API Key (optional) | your_infura_key_here |

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are properly installed
2. **Environment Variables Not Working**: Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
3. **Wallet Connection Issues**: Verify WalletConnect Project ID is correct
4. **RPC Connection Issues**: Check that RPC URL and API key are valid

### Build Logs:

If deployment fails, check the build logs in Vercel dashboard:
1. Go to your project
2. Click on the failed deployment
3. Check "Build Logs" tab for error details

## Post-Deployment

After successful deployment:

1. Test wallet connection functionality
2. Verify all pages load correctly
3. Check that environment variables are working
4. Test on different devices and browsers

## Continuous Deployment

The project is configured for automatic deployments:
- Every push to `main` branch triggers a new deployment
- Pull requests create preview deployments
- Manual deployments can be triggered from Vercel dashboard

## Support

For deployment issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Review build logs in Vercel dashboard
3. Ensure all environment variables are set correctly
4. Verify GitHub repository permissions
