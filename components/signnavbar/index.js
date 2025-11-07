import { React, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './signnavbar.module.css'
import loopLogo from '../../images/CSR LOGO_B.png'
import Contianer from '../commen/Container'

function SignNavbar() {
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
							<Image src={loopLogo} alt="LOOP" width={55} height={55} />
						</a>
					</Link>
				</div>
				<div className={styles.navbarMenu}>
					<Link href="/">
						<a>
							<span
								className={`${styles.navbarMenuItemActive} ${styles.navbarMenuItem}`}>
								Home
							</span>
						</a>
					</Link>
					<Link href="/faq">
						<a>
							<span className={styles.navbarMenuItem}>Faq</span>
						</a>
					</Link>
					<Link href="/about">
						<a>
							<span className={styles.navbarMenuItem}>
								About
								<div className={styles.navbarMenuItemArrow}>
									<IoIosArrowDown />
									
								</div>
							</span>
						</a>
					</Link>
					<Link href="/contactUs">
						<a>
							<span className={styles.navbarMenuItem}>
								Contact
								<div className={styles.navbarMenuItemArrow}>
								<IoIosArrowDown />
								</div>
							</span>
						</a>
					</Link>
					

				</div>
				<div onClick={showNav} className={styles.handburg}>
					<GiHamburgerMenu className={styles.hand} />
				</div>
			</div>
			{
				navbar && (
					<div className={styles.handDrop}>
						<div onClick={hideNav} className={styles.close}><AiOutlineClose /></div>
						<div className={styles.dropLogo}>
							<Link href="/">
								<a>
									<Image src={loopLogo} layout="fill" />
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

export default SignNavbar
