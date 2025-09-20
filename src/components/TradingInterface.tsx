import React, { useState } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Contract ABI (simplified for demonstration)
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "assetId", "type": "uint256"},
      {"internalType": "uint32", "name": "amount", "type": "uint32"},
      {"internalType": "bool", "name": "isLong", "type": "bool"}
    ],
    "name": "executeTrade",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint32", "name": "amount", "type": "uint32"}],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint32", "name": "amount", "type": "uint32"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x..." as const; // Replace with actual contract address

interface TradingInterfaceProps {
  assetId: number;
  assetSymbol: string;
  currentPrice: number;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({
  assetId,
  assetSymbol,
  currentPrice
}) => {
  const { address, isConnected } = useAccount();
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [isLong, setIsLong] = useState<boolean>(true);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');

  // Contract write functions
  const { write: executeTrade, isLoading: isTrading } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'executeTrade',
    args: [BigInt(assetId), BigInt(parseInt(tradeAmount) || 0), isLong],
  });

  const { write: deposit, isLoading: isDepositing } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'deposit',
    args: [BigInt(parseInt(depositAmount) || 0)],
    value: BigInt(parseInt(depositAmount) || 0) * BigInt(10**18), // Convert to wei
  });

  const { write: withdraw, isLoading: isWithdrawing } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'withdraw',
    args: [BigInt(parseInt(withdrawAmount) || 0)],
  });

  // Contract read functions
  const { data: traderBalance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTraderBalance',
    args: [address],
  });

  const handleTrade = async () => {
    if (!isConnected || !tradeAmount) return;
    
    try {
      await executeTrade();
      setTradeAmount('');
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return;
    
    try {
      await deposit();
      setDepositAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAmount) return;
    
    try {
      await withdraw();
      setWithdrawAmount('');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please connect your wallet to start trading
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {traderBalance ? `${Number(traderBalance) / 10**18} ETH` : '0 ETH'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Deposit/Withdraw */}
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Deposit ETH</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <Button 
                  onClick={handleDeposit}
                  disabled={isDepositing || !depositAmount}
                >
                  {isDepositing ? 'Depositing...' : 'Deposit'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Withdraw ETH</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <Button 
                  onClick={handleWithdraw}
                  disabled={isWithdrawing || !withdrawAmount}
                  variant="outline"
                >
                  {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Trade {assetSymbol}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Position Type</label>
            <div className="flex space-x-2">
              <Button
                variant={isLong ? "default" : "outline"}
                onClick={() => setIsLong(true)}
                className="flex-1"
              >
                Long
              </Button>
              <Button
                variant={!isLong ? "default" : "outline"}
                onClick={() => setIsLong(false)}
                className="flex-1"
              >
                Short
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Current Price:</span>
              <span>${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Position:</span>
              <span>{isLong ? 'Long' : 'Short'}</span>
            </div>
          </div>
          
          <Button 
            onClick={handleTrade}
            disabled={isTrading || !tradeAmount}
            className="w-full"
          >
            {isTrading ? 'Executing Trade...' : `Execute ${isLong ? 'Long' : 'Short'} Trade`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
