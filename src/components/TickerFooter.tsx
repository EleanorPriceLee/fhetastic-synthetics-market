const TickerFooter = () => {
  const encryptedTickers = [
    "███████ ████.██ ▲█.██%",
    "████ ███.██ ▼█.██%", 
    "██████ █████.██ ▲█.██%",
    "███ ██.██ ▼█.██%",
    "████████ ████.██ ▲█.██%",
    "█████ ███.██ ▼█.██%",
    "███████ ████.██ ▲█.██%",
    "████ ███.██ ▼█.██%"
  ];

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="py-4">
        <div className="animate-ticker flex space-x-8 whitespace-nowrap">
          {encryptedTickers.map((ticker, index) => (
            <span 
              key={index} 
              className="font-mono text-sm text-primary encrypted-text inline-block"
            >
              {ticker}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {encryptedTickers.map((ticker, index) => (
            <span 
              key={`duplicate-${index}`} 
              className="font-mono text-sm text-primary encrypted-text inline-block"
            >
              {ticker}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border/50 px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Encrypted Synthetics. All positions secured with Fully Homomorphic Encryption.
        </p>
      </div>
    </footer>
  );
};

export default TickerFooter;