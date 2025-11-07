import { React, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './Navbar.module.css'
import loopLogo from '../../images/CSR LOGO_W.png'
import loopLogoB from '../../images/CSR LOGO_B.png'

import smallDownArrow from '../../images/smallDownArrow.png'
import Contianer from '../commen/Container'
import {useRouter} from 'next/router'
function Navbar() {
	const router=useRouter()
	const checkurl=router.pathname.includes('about')
	console.log({checkurl});
	const [navbar, setNavbar] = useState(false)
	const showNav = () => {
		setNavbar(true)
	}
	const hideNav = () => {
		setNavbar(false)
	}
	return (
		<Contianer>
			<div className={styles.navbar}>
				<div className={styles.navbarLoopLogo}>
					<Link href="/">
						<a>
							<Image className={styles.navbarLogo} src={loopLogoB} alt="LOOP"   />
						
						</a>
					</Link>
				</div>
				<div className={styles.navbarLoopLogoSM}>
					<Link href="/">
						<a>
							
							<Image className={styles.navbarLogoSM} width={"150px"} height={"50px"} src={loopLogo} alt="LOOP"   />
						</a>
					</Link>
				</div>
				<div className={styles.navbarMenu}>
					<Link href="/">
						<a>
							<span
								className={router.pathname==='/' ? styles.navbarMenuItemActive : styles.navbarMenuItem}>
								Home
							</span>
						</a>
					</Link>
					
					<Link href="/about">
						<a>
							<span className={router.pathname.includes('about') ? styles.navbarMenuItemActive : styles.navbarMenuItem}>
								About
								
							</span>
						</a>
					</Link>

					<Link href="/news-blogs">
						<a>
							<span className={router.pathname.includes('news-blogs') ? styles.navbarMenuItemActive : styles.navbarMenuItem}>
								NEWS AND BLOGS
								
							</span>
						</a>
					</Link>

					<Link href="/ourproject">
						<a>
							<span className={router.pathname.includes('ourproject') ? styles.navbarMenuItemActive : styles.navbarMenuItem}>PROJECTS</span>
						</a>
					</Link>
					<Link href="/faq">
						<a>
							<span className={router.pathname.includes('faq') ? styles.navbarMenuItemActive : styles.navbarMenuItem}>Faq</span>
						</a>
					</Link>
					<Link href="/contactUs">
						<a>
							<span className={router.pathname.includes('contactUs') ? styles.navbarMenuItemActive : styles.navbarMenuItem}>
								Contact
								
							</span>
						</a>
					</Link>
					

				</div>
				<div className={styles.btnContainer}>
				<Link href="/login">
					<div className={styles.signIn}>
						<span>Sign In</span>
					</div></Link>
				</div>
				<div  className={styles.handburg}>
					<GiHamburgerMenu className={styles.hand} onClick={showNav}/>
				</div>
			</div>
			{
				navbar && (
					<div className={styles.handDrop}>
						<div onClick={hideNav} className={styles.close}><AiOutlineClose/></div>
						<div className={styles.dropLogo}>
							<Link href="/">
								<a>
									<Image src={loopLogoB} layout="fixed" width={"150px"} height={"50px"} />
								</a>
							</Link>
						</div>
						<div className={styles.homeborder}>
							<Link href="/">
								<a>
									<p>HOME</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>
							<Link href="/about">
								<a>
									<p>
										ABOUT
									</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>

							<Link href="/news-blogs">
								<a>
									<p>
									NEWS AND BLOGS
									</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>

							<Link href="/ourproject">
								<a>
									<p>
										PROJECTS
									</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>
							<Link href="/faq">
								<a>
									<p>
										FAQ
									</p>
								</a>
							</Link>
						</div>
						
						
						<div className={styles.border}>
							<Link href="/contactUs">
								<a>
									<p>
										CONTACT
									</p>
								</a>
							</Link>
						</div>
						<div>
							<Link href="/login">
								<button type="button" className={styles.signinbtn}>
									Signin
								</button>
							</Link>
						</div>
					</div>
				)
			}
		</Contianer>
	)
}

export default Navbar
