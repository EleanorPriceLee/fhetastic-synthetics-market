import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff } from "lucide-react";

const Portfolio = () => {
  const positions = [
    {
      symbol: "sAAPL",
      name: "Synthetic Apple Inc.",
      type: "Long",
      size: "100 shares",
      value: "$18,542.00",
      pnl: "+$245.80",
      encrypted: true,
    },
    {
      symbol: "sTSLA",
      name: "Synthetic Tesla Inc.", 
      type: "Short",
      size: "50 shares",
      value: "$12,109.00",
      pnl: "-$123.45",
      encrypted: true,
    },
    {
      symbol: "sGOLD",
      name: "Synthetic Gold",
      type: "Long",
      size: "2.5 oz",
      value: "$5,114.17",
      pnl: "+$87.30",
      encrypted: false,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 glow-text">Portfolio Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your encrypted synthetic positions with full confidentiality protection.
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold glow-text">$35,765.17</div>
                <div className="text-sm text-green-400">+$209.65 (24h)</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Long Positions</span>
                </div>
                <div className="text-2xl font-bold text-green-400">2</div>
                <div className="text-sm text-muted-foreground">+$333.10 PnL</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Short Positions</span>
                </div>
                <div className="text-2xl font-bold text-red-400">1</div>
                <div className="text-sm text-muted-foreground">-$123.45 PnL</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Encrypted</span>
                  <Shield className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-primary">2/3</div>
                <div className="text-sm text-muted-foreground">FHE Protected</div>
              </CardContent>
            </Card>
          </div>

          {/* Position List */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="glow-text">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/30">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {position.encrypted ? (
                          <EyeOff className="w-4 h-4 text-primary" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-mono font-bold">{position.symbol}</div>
                          <div className="text-sm text-muted-foreground">{position.name}</div>
                        </div>
                      </div>
                      <Badge variant={position.type === 'Long' ? 'default' : 'secondary'}>
                        {position.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">{position.size}</div>
                      <div className="text-sm text-muted-foreground">{position.value}</div>
                    </div>
                    <div className={`font-mono ${position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnl}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;