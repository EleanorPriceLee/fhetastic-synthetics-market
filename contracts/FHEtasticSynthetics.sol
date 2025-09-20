// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract FHEtasticSynthetics {
    using Fhe for euint32;
    using Fhe for ebool;
    using Fhe for euint64;
    
    struct SyntheticAsset {
        euint32 assetId;
        euint32 price; // Price in wei (encrypted)
        euint32 totalSupply;
        euint32 availableSupply;
        ebool isActive;
        ebool isVerified;
        string symbol;
        string name;
        address creator;
        uint256 creationTime;
        uint256 lastPriceUpdate;
    }
    
    struct Position {
        euint32 positionId;
        euint32 assetId;
        euint32 amount;
        euint32 entryPrice;
        ebool isLong;
        ebool isActive;
        address trader;
        uint256 timestamp;
    }
    
    struct Trade {
        euint32 tradeId;
        euint32 assetId;
        euint32 amount;
        euint32 price;
        ebool isLong;
        ebool isEncrypted;
        address trader;
        uint256 timestamp;
    }
    
    struct MarketData {
        euint32 volume24h;
        euint32 high24h;
        euint32 low24h;
        euint32 openPrice;
        ebool isMarketOpen;
    }
    
    mapping(uint256 => SyntheticAsset) public assets;
    mapping(uint256 => Position) public positions;
    mapping(uint256 => Trade) public trades;
    mapping(uint256 => MarketData) public marketData;
    mapping(address => euint32) public traderBalance;
    mapping(address => euint32) public traderReputation;
    mapping(address => euint32) public traderVolume;
    
    uint256 public assetCounter;
    uint256 public positionCounter;
    uint256 public tradeCounter;
    
    address public owner;
    address public priceOracle;
    address public verifier;
    
    // Trading fees (in basis points, encrypted)
    euint32 public tradingFee = Fhe.asEuint32(25); // 0.25%
    euint32 public platformFee = Fhe.asEuint32(5); // 0.05%
    
    event AssetCreated(uint256 indexed assetId, address indexed creator, string symbol);
    event PositionOpened(uint256 indexed positionId, uint256 indexed assetId, address indexed trader, bool isLong);
    event PositionClosed(uint256 indexed positionId, uint256 indexed assetId, address indexed trader);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed assetId, address indexed trader, bool isLong);
    event PriceUpdated(uint256 indexed assetId, uint32 newPrice);
    event AssetVerified(uint256 indexed assetId, bool isVerified);
    event ReputationUpdated(address indexed trader, uint32 reputation);
    event DepositMade(address indexed trader, uint256 amount);
    event WithdrawalMade(address indexed trader, uint32 amount);
    
    constructor(address _priceOracle, address _verifier) {
        owner = msg.sender;
        priceOracle = _priceOracle;
        verifier = _verifier;
    }
    
    function createSyntheticAsset(
        string memory _symbol,
        string memory _name,
        euint32 _initialPrice,
        euint32 _totalSupply
    ) public returns (uint256) {
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        uint256 assetId = assetCounter++;
        
        assets[assetId] = SyntheticAsset({
            assetId: _initialPrice, // Will be set properly
            price: _initialPrice,
            totalSupply: _totalSupply,
            availableSupply: _totalSupply,
            isActive: Fhe.asEbool(true),
            isVerified: Fhe.asEbool(false),
            symbol: _symbol,
            name: _name,
            creator: msg.sender,
            creationTime: block.timestamp,
            lastPriceUpdate: block.timestamp
        });
        
        marketData[assetId] = MarketData({
            volume24h: Fhe.asEuint32(0),
            high24h: _initialPrice,
            low24h: _initialPrice,
            openPrice: _initialPrice,
            isMarketOpen: Fhe.asEbool(true)
        });
        
        emit AssetCreated(assetId, msg.sender, _symbol);
        return assetId;
    }
    
    function openPosition(
        uint256 assetId,
        euint32 amount,
        ebool isLong
    ) public returns (uint256) {
        require(assets[assetId].creator != address(0), "Asset does not exist");
        require(Fhe.decrypt(assets[assetId].isActive), "Asset is not active");
        require(Fhe.decrypt(assets[assetId].isVerified), "Asset must be verified");
        require(Fhe.decrypt(marketData[assetId].isMarketOpen), "Market is closed");
        
        uint256 positionId = positionCounter++;
        
        positions[positionId] = Position({
            positionId: amount, // Will be set properly
            assetId: Fhe.asEuint32(assetId),
            amount: amount,
            entryPrice: assets[assetId].price,
            isLong: isLong,
            isActive: Fhe.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update available supply
        if (Fhe.decrypt(isLong)) {
            assets[assetId].availableSupply = assets[assetId].availableSupply - amount;
        }
        
        emit PositionOpened(positionId, assetId, msg.sender, Fhe.decrypt(isLong));
        return positionId;
    }
    
    function closePosition(uint256 positionId) public {
        require(positions[positionId].trader == msg.sender, "Not position owner");
        require(Fhe.decrypt(positions[positionId].isActive), "Position is not active");
        
        Position storage position = positions[positionId];
        uint256 assetId = Fhe.decrypt(position.assetId);
        
        // Calculate P&L (simplified)
        euint32 currentPrice = assets[assetId].price;
        euint32 entryPrice = position.entryPrice;
        euint32 amount = position.amount;
        
        // Update position as closed
        position.isActive = Fhe.asEbool(false);
        
        // Update available supply if it was a long position
        if (Fhe.decrypt(position.isLong)) {
            assets[assetId].availableSupply = assets[assetId].availableSupply + amount;
        }
        
        emit PositionClosed(positionId, assetId, msg.sender);
    }
    
    function executeTrade(
        uint256 assetId,
        euint32 amount,
        ebool isLong
    ) public returns (uint256) {
        require(assets[assetId].creator != address(0), "Asset does not exist");
        require(Fhe.decrypt(assets[assetId].isActive), "Asset is not active");
        require(Fhe.decrypt(marketData[assetId].isMarketOpen), "Market is closed");
        
        uint256 tradeId = tradeCounter++;
        
        trades[tradeId] = Trade({
            tradeId: amount, // Will be set properly
            assetId: Fhe.asEuint32(assetId),
            amount: amount,
            price: assets[assetId].price,
            isLong: isLong,
            isEncrypted: Fhe.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update market data
        marketData[assetId].volume24h = marketData[assetId].volume24h + amount;
        
        // Update trader volume
        traderVolume[msg.sender] = traderVolume[msg.sender] + amount;
        
        emit TradeExecuted(tradeId, assetId, msg.sender, Fhe.decrypt(isLong));
        return tradeId;
    }
    
    function updatePrice(uint256 assetId, euint32 newPrice) public {
        require(msg.sender == priceOracle, "Only price oracle can update prices");
        require(assets[assetId].creator != address(0), "Asset does not exist");
        require(Fhe.decrypt(assets[assetId].isActive), "Asset is not active");
        
        assets[assetId].price = newPrice;
        assets[assetId].lastPriceUpdate = block.timestamp;
        
        // Update market data
        if (Fhe.decrypt(newPrice) > Fhe.decrypt(marketData[assetId].high24h)) {
            marketData[assetId].high24h = newPrice;
        }
        if (Fhe.decrypt(newPrice) < Fhe.decrypt(marketData[assetId].low24h)) {
            marketData[assetId].low24h = newPrice;
        }
        
        emit PriceUpdated(assetId, Fhe.decrypt(newPrice));
    }
    
    function verifyAsset(uint256 assetId, ebool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify assets");
        require(assets[assetId].creator != address(0), "Asset does not exist");
        
        assets[assetId].isVerified = isVerified;
        emit AssetVerified(assetId, Fhe.decrypt(isVerified));
    }
    
    function updateReputation(address trader, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(trader != address(0), "Invalid trader address");
        
        traderReputation[trader] = reputation;
        emit ReputationUpdated(trader, Fhe.decrypt(reputation));
    }
    
    function setMarketStatus(uint256 assetId, ebool isOpen) public {
        require(msg.sender == owner, "Only owner can set market status");
        require(assets[assetId].creator != address(0), "Asset does not exist");
        
        marketData[assetId].isMarketOpen = isOpen;
    }
    
    function getAssetInfo(uint256 assetId) public view returns (
        string memory symbol,
        string memory name,
        uint32 price,
        uint32 totalSupply,
        uint32 availableSupply,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 creationTime,
        uint256 lastPriceUpdate
    ) {
        SyntheticAsset storage asset = assets[assetId];
        return (
            asset.symbol,
            asset.name,
            Fhe.decrypt(asset.price),
            Fhe.decrypt(asset.totalSupply),
            Fhe.decrypt(asset.availableSupply),
            Fhe.decrypt(asset.isActive),
            Fhe.decrypt(asset.isVerified),
            asset.creator,
            asset.creationTime,
            asset.lastPriceUpdate
        );
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        uint32 assetId,
        uint32 amount,
        uint32 entryPrice,
        bool isLong,
        bool isActive,
        address trader,
        uint256 timestamp
    ) {
        Position storage position = positions[positionId];
        return (
            Fhe.decrypt(position.assetId),
            Fhe.decrypt(position.amount),
            Fhe.decrypt(position.entryPrice),
            Fhe.decrypt(position.isLong),
            Fhe.decrypt(position.isActive),
            position.trader,
            position.timestamp
        );
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint32 assetId,
        uint32 amount,
        uint32 price,
        bool isLong,
        bool isEncrypted,
        address trader,
        uint256 timestamp
    ) {
        Trade storage trade = trades[tradeId];
        return (
            Fhe.decrypt(trade.assetId),
            Fhe.decrypt(trade.amount),
            Fhe.decrypt(trade.price),
            Fhe.decrypt(trade.isLong),
            Fhe.decrypt(trade.isEncrypted),
            trade.trader,
            trade.timestamp
        );
    }
    
    function getMarketData(uint256 assetId) public view returns (
        uint32 volume24h,
        uint32 high24h,
        uint32 low24h,
        uint32 openPrice,
        bool isMarketOpen
    ) {
        MarketData storage data = marketData[assetId];
        return (
            Fhe.decrypt(data.volume24h),
            Fhe.decrypt(data.high24h),
            Fhe.decrypt(data.low24h),
            Fhe.decrypt(data.openPrice),
            Fhe.decrypt(data.isMarketOpen)
        );
    }
    
    function getTraderBalance(address trader) public view returns (uint32) {
        return Fhe.decrypt(traderBalance[trader]);
    }
    
    function getTraderReputation(address trader) public view returns (uint32) {
        return Fhe.decrypt(traderReputation[trader]);
    }
    
    function getTraderVolume(address trader) public view returns (uint32) {
        return Fhe.decrypt(traderVolume[trader]);
    }
    
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        traderBalance[msg.sender] = traderBalance[msg.sender] + Fhe.asEuint32(uint32(msg.value));
        emit DepositMade(msg.sender, msg.value);
    }
    
    function withdraw(uint32 amount) public {
        require(Fhe.decrypt(traderBalance[msg.sender]) >= amount, "Insufficient balance");
        require(amount > 0, "Withdrawal amount must be greater than 0");
        
        traderBalance[msg.sender] = traderBalance[msg.sender] - Fhe.asEuint32(amount);
        
        // Use call instead of transfer for better security
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit WithdrawalMade(msg.sender, amount);
    }
    
    function setTradingFee(euint32 newFee) public {
        require(msg.sender == owner, "Only owner can set trading fee");
        tradingFee = newFee;
    }
    
    function setPlatformFee(euint32 newFee) public {
        require(msg.sender == owner, "Only owner can set platform fee");
        platformFee = newFee;
    }
}
