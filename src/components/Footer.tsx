import React from 'react'
import '../App.css'
import '../styles/Footer.css'

const Footer: React.FC = () => {
	return (
		<>
			<div className='container'>
				<div className='footer_section'>
					<div className='footer_logo_content'>
						<a href='/'>
							<img
								src='./assets/image/footerLogo.png'
								alt='logo'
								className='footer_logo'
							/>
						</a>
						<div className='logo_content'>
							<p className='footer_paragraph'>
							A decentralized energy trading platform (DÉT) using Raspberry Pi as a microgrid controller and ESP8266 for smart meters is an innovative approach to managing and trading energy within a local community or microgrid. This system empowers individuals to produce, consume, and trade their own renewable energy, fostering energy independence and sustainability.
							</p>
							<div className='social_links'>
								<a className='social_icons telegram'>
									<i className='bx bxl-telegram icon'></i>
								</a>
								<a className='social_icons gmail'>
									<i className='bx bxl-gmail icon'></i>
								</a>
							</div>
							<p className='footer_copyright'>All rights reserved@2023</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
