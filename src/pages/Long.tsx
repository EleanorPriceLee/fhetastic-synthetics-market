import Header from "@/components/Header";
import AssetCard from "@/components/AssetCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield } from "lucide-react";

const Long = () => {
  const longAssets = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h1 className="text-4xl font-bold glow-text">Long Positions</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build bullish positions on synthetic assets with encrypted position confidentiality until expiry.
            </p>
          </div>

          {/* Long Strategy Info */}
          <Card className="bg-card/50 border-border mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="w-5 h-5" />
                Long Strategy Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">Bullish Exposure</div>
                  <p className="text-sm text-muted-foreground">
                    Profit when asset prices increase. Maximum upside potential with limited downside to premium paid.
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-1">
                    <Shield className="w-6 h-6" />
                    FHE Protected
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your position size and entry price remain encrypted until expiry for maximum confidentiality.
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">Flexible Exit</div>
                  <p className="text-sm text-muted-foreground">
                    Close positions early or hold until expiry. Your choice, your strategy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Long Assets */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 glow-text">Available Long Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {longAssets.map((asset, index) => (
                <div key={index} className="relative">
                  <AssetCard {...asset} />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-green-500/20 text-green-400 border-green-400/50 hover:bg-green-500/30">
                      Open Long
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long Position Benefits */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="glow-text">Why Choose Long Positions?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Strategic Advantages</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Unlimited upside potential as asset prices rise
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Limited risk exposure to premium paid
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Leverage bullish market sentiment
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Portfolio diversification across asset classes
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">Privacy Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Position size encrypted until expiry
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Entry price remains confidential
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Trading strategy protected from MEV
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      Full homomorphic encryption (FHE)
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

export default Long;