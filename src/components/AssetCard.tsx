import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssetCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  encrypted: boolean;
  expiry: string;
  liquidity: string;
}

const AssetCard = ({ symbol, name, price, change, encrypted, expiry, liquidity }: AssetCardProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono">{symbol}</CardTitle>
          <Badge variant={encrypted ? "default" : "secondary"} className={encrypted ? "bg-encrypted-glow/20 text-encrypted-glow" : ""}>
            {encrypted ? "🔒 Encrypted" : "🔓 Revealed"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{name}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono glow-text">
              {encrypted ? "████.██" : price}
            </span>
            <span className={`font-mono text-sm ${isPositive ? 'text-market-green' : 'text-market-red'}`}>
              {encrypted ? "██.██%" : change}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Expiry:</span>
              <div className="data-display mt-1">{expiry}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Liquidity:</span>
              <div className="data-display mt-1">{liquidity}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-market-green hover:bg-market-green/90">
              Long
            </Button>
            <Button size="sm" variant="outline" className="flex-1 border-market-red text-market-red hover:bg-market-red hover:text-white">
              Short
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;