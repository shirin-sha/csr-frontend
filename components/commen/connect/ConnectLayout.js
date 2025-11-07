/* eslint-disable react/prop-types */
import { React } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Container from '../Container'
import logo from '../../../images/CSR LOGO_W.png'
import styles from './connect.module.css'

const Connect = ({ children }) => {
	const router = useRouter()
	return (
		<div className={styles.main}>
			<Container>
				<div className={`${styles.inner} login-inner`}>
					<div className={`${styles.left} login-left`}>
						<div
							className={styles.logo}
							onClick={() => { router.push('/') }}
							onKeyDown={() => { router.push('/') }}
							role="button"
							tabIndex={-1}
						>
							{/* <Image src={logo}    /> */}
						</div>
						<div className={styles.content}>
							<h2 className={styles.heading}>
							Journey To Unlock Opportunities 
								<br />
								And Dive Into A World Of Possibilities
							</h2>
							<p className={styles.para}>
							Explore a realm of endless possibilities at CSR Kuwait. By unlocking opportunities through our
platform, you open doors to a vibrant community of sponsors, investors, and innovators for
unprecedented success. Join us on a journey where your ideas find support and collaboration knows
no bounds. Dive into a world of limitless potential today.
							</p>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.borderTopBox}>
							{children}
						</div>

					</div>
				</div>
			</Container>
		</div>
	)
}

export default Connect
