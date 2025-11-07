import React from 'react'
import Link from 'next/link'
import { CgFacebook } from 'react-icons/cg'
import { SiInstagram, SiTwitter, SiYoutube } from 'react-icons/si'
import footer from './Footer.module.css'
import Container from '../commen/Container'
import loopLogo from '../../images/CSR LOGO_W.png'
import Image from 'next/image'
const Footer = () => {
	return (
		<div className={footer.footerbackground}>
			<Container>
				<div className={footer.footerMain}>
					<div className={footer.firstsection}>
						<Link href="/"><a >
							<Image className={loopLogo} src={loopLogo} />
						</a></Link>
						<p className={footer.footercontent}>CSR Kuwait is a community where people come together to share ideas and make them happen. Share your project with Loop where investors and sponsors can find you.</p>
						
					</div>
					<div className={footer.loop}>
						<div>
						<h6 className={footer.contacthead}>CSR Kuwait</h6>
						<Link href="/"><a><p className={footer.loopcolp}>Home</p></a></Link>
						<Link href="/about"><a><p className={footer.loopcolp}>About</p></a></Link>
						<Link href="/news-blogs"><a><p className={footer.loopcolp}>News and Blogs</p></a></Link>
						<Link href="/ourproject"><a><p className={footer.loopcolp}>Projects</p></a></Link>
						<Link href="/contactUs"><a><p className={footer.loopcolp}>Contact </p></a></Link>
						<Link href="/faq"><a><p className={footer.loopcolp}>FAQ</p></a></Link>
					</div></div>
					{/* <div className={footer.support}>
						<h6 className={footer.contacthead}>Support</h6>
						<p className={footer.lastcolp}>Contact</p>
						<p className={footer.lastcolp}>FAQ</p>
						<p className={footer.lastcolp}>Register</p>
						<p className={footer.lastcolp}>Login</p>
					</div> */}
					<div className={footer.contact}>
						<h6 className={footer.contactUshead}>Contact us</h6>
						<div className={footer.main}>
							<div className={footer.samimg}>
								<div>
									<img src="/assets/phone.png" alt="phone" width="15px" height="15px" />
								</div>
								<div><img src="/assets/mail.png" alt="mail" width="15px" height="15px" /></div>
								<div><img src="/assets/location.png" alt="location" width="15px" height="15px" /></div>
								<div><img src="/assets/clock.png" alt="clock" width="15px" height="15px" /></div>
							</div>
							<div className={footer.sam}>
								<p className={footer.lastcolp}>+965-98765469</p>
								<p className={footer.lastcolp}>loop@gmail.com</p>
								<p className={footer.lastcolp}>Kuwait</p>
								<p className={footer.lastcolp}>Mon-Fri 8.00-10.00</p>
							</div>
						</div>

					</div>
					<div className={footer.socialMediaIcons}>
					<h6 className={footer.contactUshead}>Follow Us</h6>
							<div className={footer.socialIcons}>

								<div className={footer.socialIcon}><CgFacebook size={20} /></div>
								<div className={footer.socialIcon}><SiTwitter size={20} /></div>
								<div className={footer.socialIcon}><SiInstagram size={20} /></div>
								<div className={footer.socialIcon}><SiYoutube size={20} /></div>
							</div>
						</div>
				</div>
			</Container>
			<div className={footer.copyright}>
				<p>Copyright @ 2022 CSR Kuwait All Rights Reserved | Powered By Anathoth</p>
			</div>
		</div>
	)
}

export default Footer
