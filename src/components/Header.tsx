import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-4">
            <img src={logo} alt="FHEtastic Synthetics" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold glow-text">FHEtastic Synthetics</h1>
              <p className="text-sm text-muted-foreground">FHE-Powered Trading</p>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/markets" className="text-sm hover:text-primary transition-colors">Markets</Link>
          <Link to="/portfolio" className="text-sm hover:text-primary transition-colors">Portfolio</Link>
          <Link to="/analytics" className="text-sm hover:text-primary transition-colors">Analytics</Link>
          <Link to="/long" className="text-sm hover:text-primary transition-colors">Long</Link>
          <Link to="/short" className="text-sm hover:text-primary transition-colors">Short</Link>
        </nav>
        
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;