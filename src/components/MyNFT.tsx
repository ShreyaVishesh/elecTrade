import React, { useEffect, useState } from 'react'
import '../styles/Explore.css'
import '../styles/MyNFT.css'

interface EnergyPurchase {
	id: number
	title: string
	energyAmount: string
	price: string
	purchaseDate: string
	seller: string
	location: string
	energyType: string
	image: string
}

const MyNFT: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string | null>(null)
	const [energyPurchases, setEnergyPurchases] = useState<EnergyPurchase[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [totalPurchases, setTotalPurchases] = useState<number>(0)
	const [totalSpent, setTotalSpent] = useState<string>('0')

	// Hardcoded energy purchase data with Chandigarh locations
	const mockEnergyPurchases: EnergyPurchase[] = [
		{
			id: 1,
			title: "Chandigarh Solar Park Energy",
			energyAmount: "500 kWh",
			price: "0.025",
			purchaseDate: "2024-11-10",
			seller: "0x1234...5678",
			location: "Sector 53, Chandigarh",
			energyType: "Solar",
			image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop&crop=center"
		},
		{
			id: 2,
			title: "Punjab Wind Farm Energy",
			energyAmount: "750 kWh",
			price: "0.032",
			purchaseDate: "2024-11-12",
			seller: "0xabcd...efgh",
			location: "Mohali, Chandigarh Region",
			energyType: "Wind",
			image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop&crop=center"
		},
		{
			id: 3,
			title: "Chandigarh Rooftop Solar",
			energyAmount: "300 kWh",
			price: "0.018",
			purchaseDate: "2024-11-13",
			seller: "0x9876...5432",
			location: "Sector 17, Chandigarh",
			energyType: "Solar",
			image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&crop=center"
		},
		{
			id: 4,
			title: "Tricity Green Energy Hub",
			energyAmount: "1200 kWh",
			price: "0.028",
			purchaseDate: "2024-11-14",
			seller: "0xdef0...1234",
			location: "Panchkula, Chandigarh",
			energyType: "Hybrid",
			image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop&crop=center"
		},
		{
			id: 5,
			title: "Chandigarh Geothermal Station",
			energyAmount: "650 kWh",
			price: "0.022",
			purchaseDate: "2024-11-15",
			seller: "0x5678...9abc",
			location: "Zirakpur, Chandigarh",
			energyType: "Geothermal",
			image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop&crop=center"
		},
		{
			id: 6,
			title: "Chandigarh Nuclear Plant Energy",
			energyAmount: "1500 kWh",
			price: "0.015",
			purchaseDate: "2024-11-16",
			seller: "0xabc1...2def",
			location: "Sector 34, Chandigarh",
			energyType: "Nuclear",
			image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop&crop=center"
		}
	]

	useEffect(() => {
		fetchEnergyPurchases()
	}, [])

	const fetchEnergyPurchases = async () => {
		setIsLoading(true)
		
		// Simulate loading delay
		setTimeout(() => {
			setEnergyPurchases(mockEnergyPurchases)
			
			// Calculate totals
			const totalSpentAmount = mockEnergyPurchases.reduce(
				(acc, purchase) => acc + parseFloat(purchase.price),
				0
			)
			setTotalPurchases(mockEnergyPurchases.length)
			setTotalSpent(totalSpentAmount.toFixed(3))
			setIsLoading(false)
		}, 1000)
	}

	return (
		<section className='my-nft-section'>
				<div className='container'>
					<h2 className='my-nft-title'>Energy Bought</h2>
					<div className='energy-stats'>
						<div className='stat-card'>
							<h3>Total Purchases</h3>
							<p className='stat-number'>{totalPurchases}</p>
						</div>
						<div className='stat-card'>
							<h3>Total Spent</h3>
							<p className='stat-number'>{totalSpent} ETH</p>
						</div>
						<div className='stat-card'>
							<h3>Total Energy</h3>
							<p className='stat-number'>
								{energyPurchases.reduce((total, purchase) => 
									total + parseInt(purchase.energyAmount.split(' ')[0]), 0
								)} kWh
							</p>
						</div>
					</div>
					
					{isLoading ? (
						<div className='loading-container'>
							<p>Loading your energy purchases...</p>
						</div>
					) : energyPurchases.length > 0 ? (
						<div className='my-nft-grid'>
							{energyPurchases.map((purchase) => (
								<div key={purchase.id} className='energy-card'>
									<div className='image-container'>
										<img
											src={purchase.image}
											alt={purchase.title}
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = `https://via.placeholder.com/300x200/4f46e5/ffffff?text=${purchase.energyType}+Energy`;
											}}
										/>
										<div className='energy-type-badge'>{purchase.energyType}</div>
									</div>
									<div className='energy-info'>
										<h3>{purchase.title}</h3>
										<div className='energy-details'>
											<div className='detail-row'>
												<span className='label'>Amount:</span>
												<span className='value'>{purchase.energyAmount}</span>
											</div>
											<div className='detail-row'>
												<span className='label'>Price:</span>
												<span className='value'>{purchase.price} ETH</span>
											</div>
											<div className='detail-row'>
												<span className='label'>Location:</span>
												<span className='value'>{purchase.location}</span>
											</div>
											<div className='detail-row'>
												<span className='label'>Purchase Date:</span>
												<span className='value'>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
											</div>
											<div className='seller-info'>
												<span className='label'>Seller:</span>
												<span className='wallet-address'>{purchase.seller}</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='no-purchases'>
							<p>You haven't purchased any energy yet.</p>
							<p>Visit our Live Auctions to start buying clean energy!</p>
						</div>
					)}
				</div>
			</section>
	)
}

export default MyNFT
