import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TickerFooter from "@/components/TickerFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, TrendingDown, BarChart3, Wallet } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "FHE Encryption",
      description: "Fully homomorphic encryption protects your trading positions until expiry."
    },
    {
      icon: TrendingUp,
      title: "Long Positions", 
      description: "Build bullish exposure on synthetic assets with unlimited upside potential."
    },
    {
      icon: TrendingDown,
      title: "Short Positions",
      description: "Profit from declining markets with encrypted bearish strategies."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive performance tracking and risk management tools."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 glow-text">Why Choose Encrypted Synthetics?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of confidential trading with fully homomorphic encryption 
              protecting your strategies from MEV and front-running.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card/50 border-border text-center group hover:border-primary/50 transition-colors">
                  <CardContent className="pt-8 pb-6">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-card/50 border-border max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <Wallet className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 glow-text">Ready to Start Trading?</h3>
                <p className="text-muted-foreground mb-6">
                  Connect your wallet to access encrypted synthetic markets and start building 
                  your confidential trading portfolio today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Connect Wallet
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/markets">View Markets</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TickerFooter />
    </div>
  );
};

export default Index;
