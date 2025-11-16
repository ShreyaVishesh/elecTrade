import React, { useEffect, useState } from 'react';
import '../styles/Explore.css';

const Explore: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'smart-contracts' | 'electrotoken'>('smart-contracts');
    const [animationStep, setAnimationStep] = useState<number>(0);
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
    const [supplyCount, setSupplyCount] = useState<number>(0);

    useEffect(() => {
        // Animation for smart contract workflow
        const interval = setInterval(() => {
            setAnimationStep((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Animate supply counter when ElectroToken tab is active
    useEffect(() => {
        if (activeTab === 'electrotoken') {
            const targetSupply = 1000000000;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetSupply / steps;
            let currentStep = 0;

            const counter = setInterval(() => {
                currentStep++;
                const newCount = Math.min(increment * currentStep, targetSupply);
                setSupplyCount(newCount);
                
                if (currentStep >= steps) {
                    clearInterval(counter);
                }
            }, duration / steps);

            return () => clearInterval(counter);
        }
    }, [activeTab]);

    const tokenomicsData = [
        {
            name: 'Ecosystem Rewards',
            percentage: 35,
            amount: '350M ELT',
            color: '#8613a5',
            description: 'Staking rewards, liquidity mining, and platform incentives',
            breakdown: ['Staking Rewards: 20%', 'Liquidity Mining: 10%', 'Platform Incentives: 5%']
        },
        {
            name: 'Public Sale',
            percentage: 30,
            amount: '300M ELT',
            color: '#00d4ff',
            description: 'Available for public sale and community distribution',
            breakdown: ['Public Sale: 25%', 'Community Airdrops: 5%']
        },
        {
            name: 'Team & Development',
            percentage: 20,
            amount: '200M ELT',
            color: '#ffce4e',
            description: 'Team compensation and platform development',
            breakdown: ['Team Allocation: 15%', 'Development Fund: 5%']
        },
        {
            name: 'Reserve Fund',
            percentage: 15,
            amount: '150M ELT',
            color: '#ff6b6b',
            description: 'Future partnerships and strategic initiatives',
            breakdown: ['Strategic Partnerships: 10%', 'Future Development: 5%']
        }
    ];

    const handleSegmentHover = (segmentIndex: number | null) => {
        setHoveredSegment(segmentIndex);
    };

    // Smart Contract Types Data
    const smartContractTypes = [
        {
            id: 'peer-to-peer',
            name: 'Peer to Peer Trading',
            icon: 'bx-transfer',
            color: '#8613a5',
            description: 'Direct energy trading between producers and consumers without intermediaries',
            features: [
                'Direct P2P energy transactions',
                'Automated price matching',
                'Real-time energy transfer',
                'Transparent pricing mechanism'
            ],
            useCase: 'Ideal for residential solar panel owners selling excess energy to neighbors',
            contractCode: `contract PeerToPeerTrading {
    struct EnergyOffer {
        address producer;
        uint256 energyAmount;
        uint256 pricePerKWh;
        uint256 timestamp;
        bool isActive;
    }
    
    mapping(uint256 => EnergyOffer) public offers;
    
    function createOffer(uint256 _amount, uint256 _price) public {
        offers[offerId] = EnergyOffer({
            producer: msg.sender,
            energyAmount: _amount,
            pricePerKWh: _price,
            timestamp: block.timestamp,
            isActive: true
        });
    }
    
    function acceptOffer(uint256 _offerId) public payable {
        // Execute energy transfer and payment
    }
}`
        },
        {
            id: 'loyalty-solar-swap',
            name: 'Loyalty Solar Swap',
            icon: 'bx-star',
            color: '#00d4ff',
            description: 'Reward system for consistent solar energy contributors with loyalty benefits',
            features: [
                'Loyalty points for solar contributions',
                'Tier-based reward system',
                'Bonus energy credits',
                'Priority access to premium features'
            ],
            useCase: 'Rewards long-term solar energy producers with additional benefits and discounts',
            contractCode: `contract LoyaltySolarSwap {
    struct Producer {
        uint256 totalEnergyContributed;
        uint256 loyaltyPoints;
        uint8 tierLevel;
        uint256 lastContribution;
    }
    
    mapping(address => Producer) public producers;
    
    function contributeEnergy(uint256 _amount) public {
        producers[msg.sender].totalEnergyContributed += _amount;
        uint256 points = calculateLoyaltyPoints(_amount);
        producers[msg.sender].loyaltyPoints += points;
        updateTierLevel(msg.sender);
    }
    
    function redeemRewards(uint256 _points) public {
        // Redeem loyalty points for benefits
    }
}`
        },
        {
            id: 'cross-store-p2p',
            name: 'Cross Store P2P',
            icon: 'bx-store',
            color: '#ffce4e',
            description: 'Multi-platform energy trading across different energy marketplaces',
            features: [
                'Cross-platform compatibility',
                'Multi-marketplace integration',
                'Unified energy credits',
                'Interoperable smart contracts'
            ],
            useCase: 'Enables energy trading across multiple platforms and energy stores',
            contractCode: `contract CrossStoreP2P {
    struct CrossPlatformTrade {
        address seller;
        address buyer;
        uint256 energyAmount;
        uint256 price;
        string originPlatform;
        string targetPlatform;
        bool isCompleted;
    }
    
    mapping(uint256 => CrossPlatformTrade) public trades;
    mapping(string => bool) public supportedPlatforms;
    
    function initiateCrossStoreTrade(
        uint256 _amount,
        uint256 _price,
        string memory _originPlatform,
        string memory _targetPlatform
    ) public {
        // Initialize cross-platform trade
    }
    
    function completeTrade(uint256 _tradeId) public {
        // Execute cross-platform energy transfer
    }
}`
        },
        {
            id: 'gifted-p2p',
            name: 'Gifted P2P',
            icon: 'bx-gift',
            color: '#ff6b6b',
            description: 'Gift energy credits to family, friends, or community members',
            features: [
                'Energy gifting system',
                'Community support programs',
                'Charitable energy donations',
                'Social impact tracking'
            ],
            useCase: 'Perfect for gifting renewable energy to help others reduce their carbon footprint',
            contractCode: `contract GiftedP2P {
    struct EnergyGift {
        address giver;
        address recipient;
        uint256 energyAmount;
        string message;
        uint256 timestamp;
        bool isClaimed;
    }
    
    mapping(uint256 => EnergyGift) public gifts;
    mapping(address => uint256[]) public receivedGifts;
    
    function giftEnergy(
        address _recipient,
        uint256 _amount,
        string memory _message
    ) public {
        gifts[giftId] = EnergyGift({
            giver: msg.sender,
            recipient: _recipient,
            energyAmount: _amount,
            message: _message,
            timestamp: block.timestamp,
            isClaimed: false
        });
    }
    
    function claimGift(uint256 _giftId) public {
        // Claim gifted energy credits
    }
}`
        }
    ];

    const [selectedContract, setSelectedContract] = useState<string>('peer-to-peer');
    const [copiedCode, setCopiedCode] = useState<boolean>(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
            document.body.removeChild(textArea);
        });
    };

    return (
        <>
            <section className='explore_section'>
                <div className='container'>
                    <div className='hero-section'>
                        <h1 className='main-title'>Understanding Blockchain Energy Trading</h1>
                        <p className='main-subtitle'>
                            Discover how smart contracts and ElectroToken revolutionize renewable energy trading
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className='tab-navigation'>
                        <button 
                            className={`tab-button ${activeTab === 'smart-contracts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('smart-contracts')}
                        >
                            <i className='bx bx-code-block'></i>
                            Smart Contracts
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'electrotoken' ? 'active' : ''}`}
                            onClick={() => setActiveTab('electrotoken')}
                        >
                            <i className='bx bx-coin'></i>
                            ElectroToken
                        </button>
                    </div>

                    {/* Smart Contracts Tab */}
                    {activeTab === 'smart-contracts' && (
                        <div className='tab-content smart-contracts-content'>
                            <div className='section-header'>
                                <h2>Smart Contract Ecosystem</h2>
                                <p>
                                    Our platform features 4 specialized smart contracts designed for different energy trading scenarios. 
                                    Each contract is optimized for specific use cases to provide maximum efficiency and flexibility.
                                </p>
                            </div>

                            {/* Smart Contract Types Navigation */}
                            <div className='contract-types-nav'>
                                {smartContractTypes.map((contract, index) => (
                                    <button
                                        key={contract.id}
                                        className={`contract-nav-btn ${selectedContract === contract.id ? 'active' : ''}`}
                                        onClick={() => setSelectedContract(contract.id)}
                                        style={{ borderColor: contract.color }}
                                    >
                                        <i className={`bx ${contract.icon}`} style={{ color: contract.color }}></i>
                                        <span>{contract.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Selected Contract Details */}
                            {smartContractTypes.map((contract) => (
                                selectedContract === contract.id && (
                                    <div key={contract.id} className='contract-details-section'>
                                        <div className='contract-overview'>
                                            <div className='contract-header'>
                                                <div className='contract-icon-large' style={{ backgroundColor: `${contract.color}20`, borderColor: contract.color }}>
                                                    <i className={`bx ${contract.icon}`} style={{ color: contract.color }}></i>
                                                </div>
                                                <div className='contract-info'>
                                                    <h3 style={{ color: contract.color }}>{contract.name}</h3>
                                                    <p>{contract.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='contract-content-grid'>
                                            {/* Features Section */}
                                            <div className='contract-features'>
                                                <h4>Key Features</h4>
                                                <div className='features-list'>
                                                    {contract.features.map((feature, index) => (
                                                        <div key={index} className='feature-item'>
                                                            <i className='bx bx-check-circle' style={{ color: contract.color }}></i>
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Use Case Section */}
                                            <div className='contract-usecase'>
                                                <h4>Primary Use Case</h4>
                                                <div className='usecase-card' style={{ borderColor: `${contract.color}40` }}>
                                                    <i className='bx bx-lightbulb' style={{ color: contract.color }}></i>
                                                    <p>{contract.useCase}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Code Example */}
                                        <div className='contract-code-section'>
                                            <h4>Smart Contract Implementation</h4>
                                            <div className='code-block' style={{ borderColor: `${contract.color}40` }}>
                                                <div className='code-header'>
                                                    <span className='code-language'>Solidity</span>
                                                    <button 
                                                        className={`copy-code-btn ${copiedCode ? 'copied' : ''}`}
                                                        onClick={() => copyToClipboard(contract.contractCode)}
                                                    >
                                                        <i className={`bx ${copiedCode ? 'bx-check' : 'bx-copy'}`}></i>
                                                        {copiedCode ? 'Copied!' : 'Copy Code'}
                                                    </button>
                                                </div>
                                                <pre>
                                                    <code>{contract.contractCode}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}

                            {/* Animated Workflow for Selected Contract */}
                            <div className='workflow-container'>
                                <h3>How {smartContractTypes.find(c => c.id === selectedContract)?.name} Works</h3>
                                <div className='workflow-animation'>
                                    <div className={`workflow-step step-1 ${animationStep >= 0 ? 'active' : ''}`}>
                                        <div className='step-icon' style={{ backgroundColor: smartContractTypes.find(c => c.id === selectedContract)?.color + '20' }}>
                                            <i className='bx bx-user' style={{ color: smartContractTypes.find(c => c.id === selectedContract)?.color }}></i>
                                        </div>
                                        <h4>1. Initialize</h4>
                                        <p>User initiates energy transaction</p>
                                    </div>

                                    <div className={`workflow-arrow ${animationStep >= 1 ? 'active' : ''}`}>
                                        <div className='arrow-line' style={{ backgroundColor: smartContractTypes.find(c => c.id === selectedContract)?.color }}></div>
                                        <div className='arrow-head' style={{ color: smartContractTypes.find(c => c.id === selectedContract)?.color }}>→</div>
                                    </div>

                                    <div className={`workflow-step step-2 ${animationStep >= 1 ? 'active' : ''}`}>
                                        <div className='step-icon' style={{ backgroundColor: smartContractTypes.find(c => c.id === selectedContract)?.color + '20' }}>
                                            <i className={`bx ${smartContractTypes.find(c => c.id === selectedContract)?.icon}`} style={{ color: smartContractTypes.find(c => c.id === selectedContract)?.color }}></i>
                                        </div>
                                        <h4>2. Smart Contract</h4>
                                        <p>Contract validates and processes transaction</p>
                                    </div>

                                    <div className={`workflow-arrow ${animationStep >= 2 ? 'active' : ''}`}>
                                        <div className='arrow-line' style={{ backgroundColor: smartContractTypes.find(c => c.id === selectedContract)?.color }}></div>
                                        <div className='arrow-head' style={{ color: smartContractTypes.find(c => c.id === selectedContract)?.color }}>→</div>
                                    </div>

                                    <div className={`workflow-step step-3 ${animationStep >= 2 ? 'active' : ''}`}>
                                        <div className='step-icon' style={{ backgroundColor: smartContractTypes.find(c => c.id === selectedContract)?.color + '20' }}>
                                            <i className='bx bx-check-circle' style={{ color: smartContractTypes.find(c => c.id === selectedContract)?.color }}></i>
                                        </div>
                                        <h4>3. Execute</h4>
                                        <p>Automatic execution and settlement</p>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Grid */}
                            <div className='benefits-grid'>
                                <h3>Benefits of Our Smart Contract Ecosystem</h3>
                                <div className='benefits-container'>
                                    <div className='benefit-card'>
                                        <div className='benefit-icon'>
                                            <i className='bx bx-shield-check'></i>
                                        </div>
                                        <h4>Multi-Contract Architecture</h4>
                                        <p>Specialized contracts for different trading scenarios and use cases.</p>
                                    </div>
                                    <div className='benefit-card'>
                                        <div className='benefit-icon'>
                                            <i className='bx bx-time'></i>
                                        </div>
                                        <h4>24/7 Automation</h4>
                                        <p>All contracts execute automatically without human intervention.</p>
                                    </div>
                                    <div className='benefit-card'>
                                        <div className='benefit-icon'>
                                            <i className='bx bx-network-chart'></i>
                                        </div>
                                        <h4>Interoperability</h4>
                                        <p>Contracts work together seamlessly across different platforms.</p>
                                    </div>
                                    <div className='benefit-card'>
                                        <div className='benefit-icon'>
                                            <i className='bx bx-show'></i>
                                        </div>
                                        <h4>Complete Transparency</h4>
                                        <p>All transactions are recorded and verifiable on the blockchain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ElectroToken Tab */}
                    {activeTab === 'electrotoken' && (
                        <div className='tab-content electrotoken-content'>
                            <div className='section-header'>
                                <h2>ElectroToken (ELT)</h2>
                                <p>
                                    The native cryptocurrency powering our decentralized energy marketplace. 
                                    Built on Ethereum blockchain for secure, fast, and transparent energy trading.
                                </p>
                            </div>

                            {/* Token Info Cards */}
                            <div className='token-info-grid'>
                                <div className='token-info-card'>
                                    <div className='token-logo'>
                                        <div className='token-symbol'>⚡</div>
                                    </div>
                                    <h3>Token Details</h3>
                                    <div className='token-details'>
                                        <div className='detail-row'>
                                            <span className='label'>Symbol:</span>
                                            <span className='value'>ELT</span>
                                        </div>
                                        <div className='detail-row'>
                                            <span className='label'>Standard:</span>
                                            <span className='value'>ERC-20</span>
                                        </div>
                                        <div className='detail-row'>
                                            <span className='label'>Decimals:</span>
                                            <span className='value'>18</span>
                                        </div>
                                        <div className='detail-row'>
                                            <span className='label'>Supply:</span>
                                            <span className='value'>1,000,000,000 ELT</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='token-info-card'>
                                    <div className='token-feature-icon'>
                                        <i className='bx bx-leaf'></i>
                                    </div>
                                    <h3>Green Energy Focus</h3>
                                    <p>
                                        ElectroToken specifically supports renewable energy trading, 
                                        promoting sustainable energy adoption through blockchain incentives.
                                    </p>
                                </div>

                                <div className='token-info-card'>
                                    <div className='token-feature-icon'>
                                        <i className='bx bx-network-chart'></i>
                                    </div>
                                    <h3>Decentralized Network</h3>
                                    <p>
                                        Built on Ethereum, ensuring global accessibility, 
                                        security, and interoperability with other DeFi protocols.
                                    </p>
                                </div>
                            </div>

                            {/* Token Flow Diagram */}
                            <div className='token-flow-section'>
                                <h3>ElectroToken Flow in Energy Trading</h3>
                                <div className='token-flow-diagram'>
                                    <div className='flow-participant producer'>
                                        <div className='participant-icon'>
                                            <i className='bx bx-solar-panel'></i>
                                        </div>
                                        <h4>Energy Producer</h4>
                                        <div className='flow-action'>
                                            <p>Receives ELT for energy sold</p>
                                            <div className='token-animation receive'>
                                                <span className='token-flow'>⚡ +100 ELT</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flow-center'>
                                        <div className='central-pool'>
                                            <div className='pool-icon'>
                                                <i className='bx bx-coin-stack'></i>
                                            </div>
                                            <h4>ElectroToken Pool</h4>
                                            <div className='token-circulation'>
                                                <div className='circulating-tokens'>
                                                    <span>⚡</span>
                                                    <span>⚡</span>
                                                    <span>⚡</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flow-participant consumer'>
                                        <div className='participant-icon'>
                                            <i className='bx bx-home'></i>
                                        </div>
                                        <h4>Energy Consumer</h4>
                                        <div className='flow-action'>
                                            <p>Pays ELT for energy purchased</p>
                                            <div className='token-animation send'>
                                                <span className='token-flow'>⚡ -100 ELT</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Use Cases */}
                            <div className='use-cases-section'>
                                <h3>ElectroToken Use Cases</h3>
                                <div className='use-cases-grid'>
                                    <div className='use-case-card'>
                                        <div className='use-case-icon'>
                                            <i className='bx bx-shopping-bag'></i>
                                        </div>
                                        <h4>Energy Purchases</h4>
                                        <p>Buy renewable energy directly from producers</p>
                                    </div>
                                    <div className='use-case-card'>
                                        <div className='use-case-icon'>
                                            <i className='bx bx-award'></i>
                                        </div>
                                        <h4>Staking Rewards</h4>
                                        <p>Earn rewards by staking ELT to support network</p>
                                    </div>
                                    <div className='use-case-card'>
                                        <div className='use-case-icon'>
                                            <i className='bx bx-vote'></i>
                                        </div>
                                        <h4>Governance</h4>
                                        <p>Vote on platform improvements and policies</p>
                                    </div>
                                    <div className='use-case-card'>
                                        <div className='use-case-icon'>
                                            <i className='bx bx-trending-up'></i>
                                        </div>
                                        <h4>Investment</h4>
                                        <p>Trade ELT as an investment in clean energy future</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tokenomics */}
                            <div className='tokenomics-section'>
                                <h3>ElectroToken Tokenomics</h3>
                                <div className='tokenomics-overview'>
                                    <div className='total-supply-card'>
                                        <h4>Total Supply</h4>
                                        <div className='supply-number'>
                                            {supplyCount.toLocaleString()}
                                        </div>
                                        <div className='supply-label'>ELT Tokens</div>
                                        <div className='supply-stats'>
                                            <div className='stat-item'>
                                                <span className='stat-label'>Market Cap</span>
                                                <span className='stat-value'>$125M</span>
                                            </div>
                                            <div className='stat-item'>
                                                <span className='stat-label'>Circulating</span>
                                                <span className='stat-value'>300M ELT</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='tokenomics-chart'>
                                    <div className='chart-container'>
                                        <div className='pie-chart-interactive'>
                                            <svg width="300" height="300" viewBox="0 0 300 300">
                                                <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                                                
                                                {tokenomicsData.map((item, index) => {
                                                    const circumference = 2 * Math.PI * 100;
                                                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                                                    const prevPercentages = tokenomicsData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                                                    const strokeDashoffset = -((prevPercentages / 100) * circumference);
                                                    
                                                    return (
                                                        <circle 
                                                            key={index}
                                                            cx="150" 
                                                            cy="150" 
                                                            r="100" 
                                                            fill="none" 
                                                            stroke={item.color} 
                                                            strokeWidth={hoveredSegment === index ? "45" : "40"}
                                                            strokeDasharray={strokeDasharray}
                                                            strokeDashoffset={strokeDashoffset}
                                                            transform="rotate(-90 150 150)"
                                                            className={`chart-segment segment-${index + 1} ${hoveredSegment === index ? 'hovered' : ''}`}
                                                            onMouseEnter={() => handleSegmentHover(index)}
                                                            onMouseLeave={() => handleSegmentHover(null)}
                                                            style={{
                                                                filter: hoveredSegment === index ? 'brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'none',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        />
                                                    );
                                                })}
                                                
                                                {/* Center Circle */}
                                                <circle cx="150" cy="150" r="60" fill="rgba(15, 15, 35, 0.9)" stroke="rgba(255, 206, 78, 0.3)" strokeWidth="2"/>
                                                
                                                {/* Center Text */}
                                                {hoveredSegment !== null ? (
                                                    <>
                                                        <text x="150" y="135" textAnchor="middle" fill="#f5fbf2" fontSize="16" fontFamily="Oxanium, monospace" fontWeight="bold">
                                                            {tokenomicsData[hoveredSegment].percentage}%
                                                        </text>
                                                        <text x="150" y="155" textAnchor="middle" fill="#b8a9bc" fontSize="12" fontFamily="Work Sans, sans-serif">
                                                            {tokenomicsData[hoveredSegment].amount}
                                                        </text>
                                                        <text x="150" y="170" textAnchor="middle" fill={tokenomicsData[hoveredSegment].color} fontSize="10" fontFamily="Work Sans, sans-serif">
                                                            {tokenomicsData[hoveredSegment].name}
                                                        </text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <text x="150" y="135" textAnchor="middle" fill="#f5fbf2" fontSize="18" fontFamily="Oxanium, monospace" fontWeight="bold">
                                                            ELT
                                                        </text>
                                                        <text x="150" y="155" textAnchor="middle" fill="#b8a9bc" fontSize="14" fontFamily="Work Sans, sans-serif">
                                                            Token
                                                        </text>
                                                        <text x="150" y="170" textAnchor="middle" fill="#8613a5" fontSize="10" fontFamily="Work Sans, sans-serif">
                                                            1B Supply
                                                        </text>
                                                    </>
                                                )}
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className='chart-legend-enhanced'>
                                        {tokenomicsData.map((item, index) => (
                                            <div 
                                                key={index}
                                                className={`legend-item-enhanced ${hoveredSegment === index ? 'highlighted' : ''}`}
                                                data-segment={index + 1}
                                                onMouseEnter={() => handleSegmentHover(index)}
                                                onMouseLeave={() => handleSegmentHover(null)}
                                            >
                                                <div className='legend-header'>
                                                    <div 
                                                        className={`legend-color color-${index + 1}`}
                                                        style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}
                                                    ></div>
                                                    <div className='legend-info'>
                                                        <h5>{item.name}</h5>
                                                        <span className='percentage'>{item.percentage}%</span>
                                                    </div>
                                                </div>
                                                <div className='legend-details'>
                                                    <p>{item.amount} - {item.description}</p>
                                                    <div className='allocation-breakdown'>
                                                        {item.breakdown.map((breakdownItem, breakdownIndex) => (
                                                            <span key={breakdownIndex}>• {breakdownItem}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Token Economics Details */}
                                <div className='token-economics-details'>
                                    <h4>Token Economics Overview</h4>
                                    <div className='economics-grid'>
                                        <div className='economics-card'>
                                            <div className='economics-icon'>
                                                <i className='bx bx-trending-up'></i>
                                            </div>
                                            <h5>Deflationary Model</h5>
                                            <p>2% of transaction fees are burned, reducing total supply over time</p>
                                        </div>
                                        <div className='economics-card'>
                                            <div className='economics-icon'>
                                                <i className='bx bx-time-five'></i>
                                            </div>
                                            <h5>Vesting Schedule</h5>
                                            <p>Team tokens locked for 12 months, then 24-month linear vesting</p>
                                        </div>
                                        <div className='economics-card'>
                                            <div className='economics-icon'>
                                                <i className='bx bx-shield-check'></i>
                                            </div>
                                            <h5>Staking Rewards</h5>
                                            <p>Up to 12% APY for staking ELT and supporting network security</p>
                                        </div>
                                        <div className='economics-card'>
                                            <div className='economics-icon'>
                                                <i className='bx bx-recycle'></i>
                                            </div>
                                            <h5>Utility Focus</h5>
                                            <p>Primary use for energy trading, governance, and platform fees</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className='cta-section'>
                        <h3>Ready to Start Trading?</h3>
                        <p>Join the future of decentralized energy trading with ElectroToken</p>
                        <div className='cta-buttons'>
                            <button className='cta-primary'>
                                <i className='bx bx-wallet'></i>
                                Connect Wallet
                            </button>
                            <button className='cta-secondary'>
                                <i className='bx bx-play-circle'></i>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Explore;
