import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center market-grid"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 glow-text animate-pulse-glow">
          Confidential Synthetics
          <span className="block text-4xl text-secondary mt-2">with FHE</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Trade synthetic exposure to stocks and commodities with fully homomorphic encryption. 
          Your positions remain confidential until expiry.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-text">
            Start Trading
          </Button>
          <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="ticker-item">
            <div className="encrypted-text text-terminal-green font-mono">
              █████ ████.██ ▲2.45%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Encrypted Asset A</p>
          </div>
          <div className="ticker-item">
            <div className="encrypted-text text-market-red font-mono">
              ████ ███.██ ▼1.23%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Encrypted Asset B</p>
          </div>
          <div className="ticker-item">
            <div className="encrypted-text text-terminal-amber font-mono">
              ██████ █████.██ ▲0.87%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Encrypted Asset C</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;