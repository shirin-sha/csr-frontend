import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import About from './About.module.css'
import whiteTick from '../../images/whitetick.png'

import Groupimage1 from '../../images/about-image.jpg'
import Container from '../commen/Container'

const Aboutsection = () => {
	return (
		<div>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container>
				<div className={About.chooseUs}>
					<div className={About.content}>
						<div className={About.whyChoose}>
							<span className={About.yChoose}>WHY CHOOSE US</span>
						</div>
						<div className={About.headline}>
							<span>
							Connecting Investors
						
								with Startups
							</span>
						</div>
						<div className={About.details}>
							<p>
							CSR Kuwait is a safe and transparent place to make an investment or find sponsorship opportunities.
CSR Kuwait gives entrepreneurs a way of attracting sponsors and investors, who are looking for startups
matching their investment criteria.

							</p>
						</div>
						<div>
							<div className={About.point}>

								<div className={About.tickCircle}><Image src={whiteTick} width={10} height={10} /></div>
								<div className={About.Highest}>
									<h4 className={About.highestTitle}>Raise Immediate Funds with CSR Kuwait</h4>
									{/* <p className={About.subcontent}>
										Quis autem vel eum iure reprehenderit quin
									</p> */}
								</div>
							</div>

							<div className={About.point}>

								<div className={About.tickCircle}><Image src={whiteTick} width={10} height={10} /></div>
								<div className={About.Highest}>
									<h4 className={About.highestTitle}>Creating The Perfect Pitch.</h4>
									{/* <p className={About.subcontent}>
										Quis autem vel eum iure reprehenderit quin
									</p> */}
								</div>

							</div>

							<div className={About.point}>

								<div className={About.tickCircle}><Image src={whiteTick} width={10} height={10} /></div>
								<div className={About.Highest}>
									<h4 className={About.highestTitle}>A Safe Place For Investors To Invest</h4>
									{/* <p className={About.subcontent}>
										Quis autem vel eum iure reprehenderit quin
									</p> */}
								</div>
							</div>
						</div>
						{/* <div><Link href="/"><button type="button" className={About.readMore}>Read More</button></Link></div> */}
					</div>
					<div className={About.imageGallery}>
						<div><Image src={Groupimage1} /></div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Aboutsection
