import AssetCard from "./AssetCard";

const MarketDashboard = () => {
  const syntheticAssets = [
    {
      symbol: "sAAPL",
      name: "Synthetic Apple Inc.",
      price: "$185.42",
      change: "+2.45%",
      encrypted: true,
      expiry: "2024-12-15",
      liquidity: "$2.4M"
    },
    {
      symbol: "sTSLA", 
      name: "Synthetic Tesla Inc.",
      price: "$242.18",
      change: "-1.23%",
      encrypted: true,
      expiry: "2024-11-30",
      liquidity: "$1.8M"
    },
    {
      symbol: "sGOLD",
      name: "Synthetic Gold",
      price: "$2,045.67",
      change: "+0.87%",
      encrypted: false,
      expiry: "2024-10-28",
      liquidity: "$5.2M"
    },
    {
      symbol: "sSPY",
      name: "Synthetic S&P 500",
      price: "$432.90",
      change: "+1.14%",
      encrypted: true,
      expiry: "2025-01-15",
      liquidity: "$12.1M"
    },
    {
      symbol: "sETH",
      name: "Synthetic Ethereum",
      price: "$2,834.52",
      change: "-3.21%",
      encrypted: true,
      expiry: "2024-12-01",
      liquidity: "$8.7M"
    },
    {
      symbol: "sOIL",
      name: "Synthetic Crude Oil",
      price: "$78.42",
      change: "+2.15%",
      encrypted: false,
      expiry: "2024-11-15",
      liquidity: "$3.4M"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 glow-text">Active Synthetic Markets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trade encrypted synthetic assets with full position confidentiality until expiry. 
            All trades secured with state-of-the-art FHE technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syntheticAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-card/50 border border-border rounded-lg px-6 py-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono text-sm">
              Live market data • FHE encryption active • {syntheticAssets.filter(a => a.encrypted).length} positions encrypted
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketDashboard;