import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import '../styles/Carousel.css'
import '../styles/LiveAuctions.css'
import { ethers } from 'ethers'
import { electoTokenAddress, electoTokenAbi, peerToPeerContractAddress, peerToPeerAbi } from '../config.js';
import { start } from 'repl'
import axios from 'axios'


const getTimeDifference = (end: string) => {
	// Parse the end time string into a Date object
	const endDate = new Date(end);
	const now = new Date();
	const diff = endDate.getTime() - now.getTime();

	if (diff <= 0) return { formatted: 'EXPIRED', expired: true, urgent: false };

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	let formatted = '';
	let urgent = false;

	if (days > 0) {
		formatted = `${days}d ${hours.toString().padStart(2, '0')}h`;
	} else if (hours > 0) {
		formatted = `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		urgent = hours < 1; // Mark as urgent if less than 1 hour
	} else {
		formatted = `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
		urgent = true; // Always urgent if less than an hour
	}

	return { formatted, expired: false, urgent };
};



const LiveAuctions: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string | null>(null);
	const [loadingTransaction, setLoadingTransaction] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [filterEnergyType, setFilterEnergyType] = useState<string>('all');
	const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'time-left'>('time-left');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [countdowns, setCountdowns] = useState<Array<{ formatted: string; expired: boolean; urgent: boolean }>>([]);

	// Check if wallet is connected on component mount
	useEffect(() => {
		const checkWalletConnection = async () => {
			if (window.ethereum) {
				try {
					const accounts = await window.ethereum.request({ method: 'eth_accounts' });
					if (accounts.length > 0) {
						setUserAddress(accounts[0]);
					}
				} catch (error) {
					console.error('Error checking wallet connection:', error);
				}
			}
		};

		checkWalletConnection();
	}, []);

	const [carouselData, setCarouselData] = useState([
		{
			_id: "1",
			title: 'Solar Farm - Chandigarh University Campus',
			image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			author: 'Shreya Vishesh',
			location: 'Chandigarh University, NH-95, Gharuan, Mohali - 140413',
			address: 'Academic Block 2, Chandigarh University Campus',
			capacity: '500 kWh',
			energyType: 'Solar',
			price: 0.0000077,
			biddingDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
		},
		{
			_id: "2",
			title: 'Wind Energy Hub - IT Tower Complex',
			image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			author: 'Gurjot Singh',
			location: 'IT Park Tower, Phase 8B, Industrial Area, Mohali - 160071',
			address: 'Tower C, 5th Floor, IT Park Complex, Mohali',
			capacity: '750 kWh',
			energyType: 'Wind',
			price: 0.0000044,
			biddingDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
		},
		{
			_id: "3",
			title: 'Hydroelectric Plant - Sukhna Lake',
			image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			author: 'Shreya Agarwal',
			location: 'House No. 2547, Sector 22-D, Chandigarh - 160022',
			address: 'Residential Plot, Near Sukhna Lake Complex',
			capacity: '300 kWh',
			energyType: 'Hydro',
			price: 0.0000039,
			biddingDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
		},
		{
			_id: "4",
			title: 'Rooftop Solar - DLF Corporate Offices',
			image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			author: 'Gurjot Kaur',
			location: 'DLF City Centre Mall, NH-1, Zirakpur - 140603',
			address: 'Office No. 405, 4th Floor, DLF Corporate Tower',
			capacity: '650 kWh',
			energyType: 'Solar',
			price: 0.0000069,
			biddingDeadline: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
		},
		{
			_id: "5",
			title: 'Biomass Energy - Industrial Area',
			image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			author: 'Shreya Sharma',
			location: 'House No. 1245, Phase 7, Industrial Area, Mohali - 160062',
			address: 'Plot No. 89, Industrial Estate, Phase 7',
			capacity: '400 kWh',
			energyType: 'Biomass',
			price: 0.0000052,
			biddingDeadline: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
		},
	]);

	useEffect(() => {
		const fetchNFTsFromMongo = async () => {
			try {
				const resp = await axios.get("http://localhost:5173/api/v1/trade/all")
				console.log(resp);
				await setCarouselData(resp.data.data.trades)
				// await setCarouselData((prev) => [...prev, ...resp.data.data.trades]);
			} catch (error) {
				console.log("API not available, using static data");
				// Keep the static data that's already in carouselData
			}
		}
		fetchNFTsFromMongo();
		const intervalId = setInterval(() => {
			const updatedCountdowns = carouselData.map(card =>
				getTimeDifference(card.biddingDeadline.toISOString())
			)
			setCountdowns(updatedCountdowns)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	// Remove refs since we're switching to grid layout

	//create an arrow function
	const handlePurchase = async (tradeId: string) => {
		// Check if already processing a transaction
		if (loadingTransaction) {
			alert('Please wait for the current transaction to complete.');
			return;
		}

		// Check if MetaMask is installed
		if (!window.ethereum) {
			alert('MetaMask is required to make purchases. Please install MetaMask and refresh the page.');
			return;
		}

		setLoadingTransaction(tradeId);

		try {
			// Request account access
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});

			if (accounts.length === 0) {
				alert('Please connect your MetaMask wallet to continue.');
				return;
			}

			// Update the user address state
			setUserAddress(accounts[0]);
			
			// Connect to the contract and make the purchase
			await connectStoredContract(tradeId);
			
		} catch (error: any) {
			console.error('Error connecting to MetaMask:', error);
			
			if (error.code === 4001) {
				alert('MetaMask connection was rejected. Please approve the connection to continue.');
			} else if (error.code === -32002) {
				alert('MetaMask is already processing a request. Please check your MetaMask extension.');
			} else {
				alert(`Failed to connect to MetaMask: ${error.message || 'Unknown error'}`);
			}
		} finally {
			setLoadingTransaction(null);
		}
	}

	// Remove carousel logic since we're switching to grid layout

	const connectStoredContract = async (tradeId: string) => {
		if (typeof window.ethereum === 'undefined') {
			alert('MetaMask is not installed. Please install MetaMask to continue.');
			return;
		}

		try {
			// Get the current card details for the transaction
			const currentCard = carouselData.find(card => card._id === tradeId);
			if (!currentCard) {
				alert('Auction item not found.');
				return;
			}

			// Show confirmation dialog
			const confirmPurchase = window.confirm(
				`Confirm purchase of "${currentCard.title}" for ${currentCard.price} ETH?`
			);

			if (!confirmPurchase) {
				return;
			}

			console.log('Opening MetaMask for transaction...');
			
			// Create a simple transaction to open MetaMask
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const userAddress = await signer.getAddress();
			
			// Create a demo transaction - sending 0.001 ETH to demonstrate the purchase
			const tx = await signer.sendTransaction({
				to: "0x0000000000000000000000000000000000000000", // Burn address for demo
				value: ethers.utils.parseEther(currentCard.price.toString()),
				gasLimit: 21000,
			});
			
			console.log('Transaction submitted:', tx.hash);
			alert(`Purchase transaction submitted!\nHash: ${tx.hash}\nWaiting for confirmation...`);
			
			// Wait for transaction confirmation
			const receipt = await tx.wait();
			
			console.log('Transaction confirmed:', receipt);
			alert(`Purchase successful!\nTransaction confirmed in block ${receipt.blockNumber}\nYou purchased "${currentCard.title}" for ${currentCard.price} ETH`);

		} catch (error: any) {
			console.error('Transaction failed:', error);
			
			if (error.code === 4001) {
				alert('Transaction was rejected by user.');
			} else if (error.code === -32000) {
				alert('Insufficient funds for this transaction.');
			} else if (error.message?.includes('gas')) {
				alert('Transaction failed due to gas issues. Please try again.');
			} else {
				alert(`Transaction failed: ${error.message || 'Unknown error occurred'}`);
			}
		}
	};

	// Filter and sort auctions
	const filteredAuctions = carouselData
		.filter((card) => {
			// Search filter
			const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				card.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
				card.energyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
				card.location.toLowerCase().includes(searchQuery.toLowerCase());

			// Energy type filter
			const matchesEnergyType = filterEnergyType === 'all' || card.energyType === filterEnergyType;

			return matchesSearch && matchesEnergyType;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'time-left':
					return a.biddingDeadline.getTime() - b.biddingDeadline.getTime();
				default:
					return 0;
			}
		});

	// Get unique energy types for filter
	const uniqueTypes = Array.from(new Set(carouselData.map(card => card.energyType)));
	const energyTypes = ['all', ...uniqueTypes];

	return (
		<section className='live-auctions-section'>
			<div className='container'>
				<div className='live-auctions-header'>
					<h2 className='live-auctions-title'>Live Auctions</h2>
					<p className='live-auctions-subtitle'>Discover and bid on renewable energy offers</p>
				</div>

				{/* Controls Bar */}
				<div className='auctions-controls'>
					{/* Search */}
					<div className='search-box'>
						<input
							type='text'
							placeholder='🔍 Search by title, author, location...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='search-input'
						/>
					</div>

					{/* Filter & Sort */}
					<div className='controls-group'>
						<div className='filter-group'>
							<label htmlFor='energy-filter'>Energy Type:</label>
							<select
								id='energy-filter'
								value={filterEnergyType}
								onChange={(e) => setFilterEnergyType(e.target.value)}
								className='select-input'
							>
								{energyTypes.map((type) => (
									<option key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</option>
								))}
							</select>
						</div>

						<div className='filter-group'>
							<label htmlFor='sort-by'>Sort By:</label>
							<select
								id='sort-by'
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as any)}
								className='select-input'
							>
								<option value='time-left'>⏱️ Time Left</option>
								<option value='price-low'>💰 Price: Low to High</option>
								<option value='price-high'>💰 Price: High to Low</option>
							</select>
						</div>

						<div className='view-toggle'>
							<button
								className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
								onClick={() => setViewMode('grid')}
								title='Grid view'
							>
								⊞ Grid
							</button>
							<button
								className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
								onClick={() => setViewMode('list')}
								title='List view'
							>
								☰ List
							</button>
						</div>
					</div>
				</div>

				{/* Results Info */}
				<div className='results-info'>
					<p>{filteredAuctions.length} of {carouselData.length} auctions found</p>
				</div>

				{/* Auctions Grid/List */}
				<div className={`auctions-grid ${viewMode}`}>
					{filteredAuctions.length > 0 ? (
						filteredAuctions.map((card, index) => {
							const cardIndex = carouselData.findIndex(c => c._id === card._id);
							return (
								<div key={index} className='auction-card'>
									<div className='image-container'>
										<img src={card.image} alt={card.title} />
										<div className='energy-type-badge'>{card.energyType}</div>
										<div className={`timer-overlay ${countdowns[cardIndex]?.urgent ? 'urgent' : ''} ${countdowns[cardIndex]?.expired ? 'expired' : ''}`}>
											<span className='timer-text'>
												{countdowns[cardIndex]?.expired ? '⏰ EXPIRED' : `⏱️ ${countdowns[cardIndex]?.formatted}`}
											</span>
										</div>
									</div>
									<div className='auction-info'>
										<h3>{card.title}</h3>
										<p className='seller-info'>by @{card.author}</p>
										<div className='auction-details'>
											<div className='detail-row'>
												<span className='label'>Capacity:</span>
												<span className='value'>{card.capacity}</span>
											</div>
											<div className='detail-row'>
												<span className='label'>Location:</span>
												<span className='value'>{card.location}</span>
											</div>
											<div className='detail-row'>
												<span className='label'>Address:</span>
												<span className='value'>{card.address}</span>
											</div>
											<div className='price-section'>
												<span className='label'>Current Price:</span>
												<span className='price-value'>{card.price} ETH</span>
											</div>
										</div>
										<button
											className={`purchase-btn ${
												countdowns[cardIndex]?.expired 
													? 'expired' 
													: loadingTransaction === card._id
														? 'loading'
														: countdowns[cardIndex]?.urgent 
															? 'urgent'
															: ''
											}`}
											disabled={countdowns[cardIndex]?.expired || loadingTransaction === card._id}
											onClick={() => handlePurchase(card._id)}
										>
											{countdowns[cardIndex]?.expired 
												? 'Expired' 
												: loadingTransaction === card._id 
													? '🔄 Processing...' 
													: 'Purchase Energy'
											}
										</button>
									</div>
								</div>
							);
						})
					) : (
						<div className='no-results'>
							<p>😔 No auctions match your search criteria.</p>
							<button 
								className='reset-filters-btn'
								onClick={() => {
									setSearchQuery('');
									setFilterEnergyType('all');
									setSortBy('time-left');
								}}
							>
								Reset Filters
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default LiveAuctions
