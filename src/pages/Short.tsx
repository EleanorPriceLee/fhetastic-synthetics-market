import Header from "@/components/Header";
import AssetCard from "@/components/AssetCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, Shield, AlertTriangle } from "lucide-react";

const Short = () => {
  const shortAssets = [
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <h1 className="text-4xl font-bold glow-text">Short Positions</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profit from declining asset prices with encrypted short positions and full confidentiality protection.
            </p>
          </div>

          {/* Risk Warning */}
          <Card className="bg-red-500/10 border-red-500/20 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Important Risk Disclosure</h3>
                  <p className="text-sm text-muted-foreground">
                    Short positions carry unlimited risk potential. While profits are capped, losses can theoretically be infinite 
                    as asset prices rise. Only experienced traders should engage in short selling strategies. 
                    Please ensure you understand the risks before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Short Strategy Info */}
          <Card className="bg-card/50 border-border mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <TrendingDown className="w-5 h-5" />
                Short Strategy Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-red-400 mb-2">Bearish Exposure</div>
                  <p className="text-sm text-muted-foreground">
                    Profit when asset prices decline. Ideal for hedging portfolios or capitalizing on market downturns.
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-1">
                    <Shield className="w-6 h-6" />
                    FHE Protected
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your short position details remain encrypted, preventing front-running and protecting your strategy.
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">Risk Management</div>
                  <p className="text-sm text-muted-foreground">
                    Advanced stop-loss and position sizing tools to help manage unlimited risk exposure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Short Assets */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 glow-text">Available Short Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shortAssets.map((asset, index) => (
                <div key={index} className="relative">
                  <AssetCard {...asset} />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-red-500/20 text-red-400 border-red-400/50 hover:bg-red-500/30">
                      Open Short
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Short Position Features */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="glow-text">Short Position Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-400">Strategic Uses</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      Hedge existing long positions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      Profit from market downturns
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      Portfolio risk management
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      Capitalize on overvalued assets
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Privacy & Security</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Short position size encrypted
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Entry price confidentiality
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Protected from liquidation bots
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Anti-MEV protection
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Short;