import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Shield, BarChart3 } from "lucide-react";

const Analytics = () => {
  const metrics = [
    { label: "Total Return", value: "+12.5%", trend: "up" },
    { label: "Win Rate", value: "68.3%", trend: "up" },
    { label: "Sharpe Ratio", value: "1.47", trend: "up" },
    { label: "Max Drawdown", value: "-3.2%", trend: "down" },
  ];

  const recentTrades = [
    {
      symbol: "sAAPL",
      type: "Long",
      entry: "$180.50",
      exit: "$185.42",
      pnl: "+2.73%",
      date: "2024-01-15",
      encrypted: true,
    },
    {
      symbol: "sTSLA",
      type: "Short", 
      entry: "$245.80",
      exit: "$242.18",
      pnl: "+1.47%",
      date: "2024-01-14",
      encrypted: true,
    },
    {
      symbol: "sGOLD",
      type: "Long",
      entry: "$2,028.40",
      exit: "$2,045.67",
      pnl: "+0.85%",
      date: "2024-01-13",
      encrypted: false,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 glow-text">Performance Analytics</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis of your encrypted trading performance and risk metrics.
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div className={`text-2xl font-bold ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trading Activity */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 glow-text">
                  <BarChart3 className="w-5 h-5" />
                  Trading Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <span className="text-sm">Total Trades</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <span className="text-sm">Winning Trades</span>
                    <span className="font-bold text-green-400">32</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <span className="text-sm">Losing Trades</span>
                    <span className="font-bold text-red-400">15</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <span className="text-sm">Encrypted Trades</span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      39
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trade History */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="glow-text">Recent Trade History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/30">
                      <div className="flex items-center gap-3">
                        {trade.encrypted && <Shield className="w-4 h-4 text-primary" />}
                        <div>
                          <div className="font-mono font-bold">{trade.symbol}</div>
                          <div className="text-sm text-muted-foreground">{trade.date}</div>
                        </div>
                        <Badge variant={trade.type === 'Long' ? 'default' : 'secondary'}>
                          {trade.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {trade.entry} → {trade.exit}
                        </div>
                        <div className={`font-mono ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.pnl}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;