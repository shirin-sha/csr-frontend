import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PersonIcon from '@mui/icons-material/Person'
import { FaHandshake } from 'react-icons/fa'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { BsArrowRightShort } from 'react-icons/bs'
import style from './JoinUs.module.css'
import Container from '../commen/Container'
import bgImage from '../../images/dotbg.png'
import rightbg from '../../images/rightbg.png'

const JoinUs = () => {
	const router = useRouter()
	return (
		<div className={style.forBackgroundWrap}>
			<div className={style.bgImage}>
				<Image src={bgImage} layout="fill" />
			</div>
			<div className={style.joinUs}>

				<Container>
					<h5 style={{ fontSize: '17px', fontWeight: '500' }}>JOIN TO US</h5>
					<h4 style={{ fontSize: '24px', fontWeight: '600' }}>
						Not Registered Yet For Your Dream Project
					</h4>
					<p className={style.p}>Register now as an Applicant to find a sponser or a Sponser to find a project to invest in</p>
					{/* bg */}

					<div className={style.userButton}>
						<div className={style.applicantButton}
							onClick={
								() => { router.push('/register') }
							}>
								<div style={{transform: 'skew(-20deg)'}}>
								<div style={{lineHeight:'10px'}}><PersonIcon className={style.iconSize}/></div>
							<Link href="/">Applicant</Link>
						</div></div>
						<div className={style.sponserButtonshape}
							onClick={
								() => { router.push('/registerSponsor') }
								} >
									<div style={{transform: 'skew(-20deg)'}}>
									<div><FaHandshake className={style.iconSize}/></div>
							<Link href="/"><a>Sponsor</a></Link>
							</div>
						</div>
						<div className={style.eventButton} 
						onClick={
								() => { router.push('/organiser-registration') }
								} >
						<div style={{transform: 'skew(-20deg)'}}>
							<div><CalendarMonthIcon className={style.iconSize}/></div>
							<Link href="/"><a>Event Organizer</a></Link></div>
							
						</div>

					</div>

				</Container>
			</div>
			<div className={style.bgImageRight}>
				<Image src={rightbg} layout="fill" />
			</div>
		</div>

	)
}

export default JoinUs
