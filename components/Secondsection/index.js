import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaHandshake } from 'react-icons/fa'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import Second from './Second.module.css'
import blackArrow from '../../images/blackRightArrow.png'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Container from '../commen/Container'

const Secondsection = () => {
	const router = useRouter()
	return (
		<Container>
			<div className={Second.main}>
				<div className={Second.userdiv}>
					<div className={Second.subuserdiv}
						onClick={() => { router.push('/register') }}>
						<div className={Second.circleIcon}>
							<div className={Second.iconDiv}>
								<PersonIcon
									className={Second.PersonIcon}
								// sx={{ color: "white"}}
								/>
							</div>
						</div>
						<h5 className={Second.typeUser}>Applicant</h5>
						<p className={Second.description}>
							Registered User who might have a project or an event and either seek
							sponser for the project or looking for price quotations for his
							event
						</p>
						<div className={Second.registerdiv}>
							<div >
								<button className={Second.registerNow}><a>Register Now</a></button>
								</div>
							{/* <div className={Second.exploreButtonArrow}>
								<Image src={blackArrow} width={8} height={8} />
							</div> */}
						</div>
					</div>
					<div className={Second.subuserdiv}
						onClick={() => { router.push('/registerSponsor') }}>
						<div className={Second.circleIcon}>
							<div className={Second.iconDiv}>
								<FaHandshake className={Second.PersonIcon} />
							</div>
						</div>
						<h5 className={Second.typeUser}>Sponsor</h5>
						<p className={Second.description}>
							Registered User who might have a project or an event and either seek
							sponser for the project or looking for price quotations for his
							event
						</p>
						<div className={Second.registerdiv}>
						<div >
								<button className={Second.registerNow}><a>Register Now</a></button>
								</div>
							{/* <div className={Second.exploreButtonArrow}>
								<Image src={blackArrow} width={8} height={8} />
							</div> */}
						</div>
					</div>
					<div className={Second.subuserdiv}
					onClick={() => { router.push('/organiser-registration') }}>
					
						<div className={Second.circleIcon}>
							<div className={Second.iconDiv}>
								<CalendarMonthIcon className={Second.PersonIcon} />

								{/* <Image src={eventicon} width={25} height={25} /> */}
							</div>
						</div>
						<h5 className={Second.typeUser}>Event Organizer</h5>
						<p className={Second.description}>
							Registered User who might have a project or an event and either seek
							sponser for the project or looking for price quotations for his
							event
						</p>
						<div className={Second.registerdiv}>
						<div >
								<button className={Second.registerNow}><a>Register Now</a></button>
								</div>
							{/* <div className={Second.exploreButtonArrow}>
								<Image src={blackArrow} width={8} height={8} />
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Secondsection
