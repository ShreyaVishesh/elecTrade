import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import '../styles/Carousel.css'
import '../styles/Home.css'
import CreateNFTModal from './CreateNFTModal'

// Subcomponents

import Links from './Links'
import Rates from './Rates'

interface HomeProps {
	userAddress: string | null
}




const Home: React.FC<HomeProps> = ({ userAddress }) => {
	const Navigate = useNavigate();
	const [isBidExpired, setBidExpired] = useState(false)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const handleCreateClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault()
		setShowCreateModal(true)
	}



	return (
		<>
			<section className='home_section'>
				<div className='container'>
					<div className='home_section_content'>
						<div className='home_section_description'>
							<h1 className='main_title'>
								Create, Buy and Sell <span>Electricity</span>
							</h1>
							<div className='btn_section'>
								<Link className='header_btn content_btn' to='/live-auctions'>
									Live Auctions
								</Link>
								<a
									className='header_btn content_btn'
									href='#'
									onClick={handleCreateClick}
								>
									Create
								</a>
							</div>
							<Rates />
						</div>
						<div className='img_content'>
							<img
								className='blur_img'
								src='./assets/image/homeblurimg.png'
								alt='blur_img'
							/>
							<div className='home_section_img'>
								<img src='./assets/image/a.gif' alt='img' style={{ "width": "85%", "height": "85%", marginLeft: "75px" }} />

								<img
									className='scrolldown_button'
									src='./assets/image/Scrolldownbutton.png'
									alt=''
								/>
							</div>
						</div>
					</div>
					<Links />
				</div>
			</section>
			{showCreateModal && (
				<CreateNFTModal
					userAddress={userAddress}
					onHide={() => setShowCreateModal(false)}
				/>
			)}
		</>
	)
}

export default Home
