import { React, useState, useContext,useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from "next/router";
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'
import { SiCodeproject } from 'react-icons/si'
import { MdNotifications } from 'react-icons/md'
import { MdEventNote } from 'react-icons/md'
import { BiMessage } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/fa'
import Contianer from '../commen/Container'
import loopLogo from '../../images/CSR LOGO_B.png'
import styles from './test.module.css'
import { AuthContext } from "../../store/context";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { baseUrl,fetcher } from '../../hooks/useDataQuery';
import dayjs from 'dayjs'
import relativeTIme from "dayjs/plugin/relativeTime";



const Test = ({ children, active }) => {
	const router = useRouter()
	const { userData, setUserData } = useContext(AuthContext);
	console.log("userData", userData)
	const [navbar, setNavbar] = useState(false)
	const [open, setOpen] = useState(false);
	const [detail, setDetail] = useState({});
	const [notification, setNotification] = useState(false)
	const [notifyData, setNotifyData] = useState([])
	const Userlogout = () => {
		window.localStorage.clear();
		console.log("logout");
		router.replace("/login");
	};

	const user = userData.userType

	console.log("USERTYPE:", user)
	console.log('USERTOKEN:', userData.token)
	let userUrl = "applicant";
	if (user == "1") {
		userUrl = "applicant";
	} else if (user == "2") {
		userUrl = "organizer";
	} else if (user == "3") {
		userUrl = "sponsor";
	}
	const notifyHide = () => {
		setNotification(false)
	}

	const handleToClose = () => {
		setOpen(false);
	};
	const showNav = () => {
		setNavbar(true)
	}
	const hideNav = () => {
		setNavbar(false)
	}
	const notificationView = async (e) => {
		console.log('clicked modal');
		setNotification(true)

		try {
			console.log("notification : ", userData.userId);
			const resdata = await fetcher({
				key: `/${userUrl}/getNotify`,
				data: userData.userId,
				header: { headers: { token: userData.token } }
			});
			console.log("fetchdata", resdata.data.data);
			setNotifyData(resdata.data.data)

		} catch (e) {
			console.log("error");
			alert(e)
		}


	};
	useEffect(() => {
		console.log("");
		userData.userId &&
		  fetcher({
			key: `/${userUrl}/profile`,
			header: {
			  "Content-Type": "application/json",
			  headers: { token: userData.token },
			},
		  }).then((data) => {
			console.log("updatedata", data);
			setDetail(data?.data?.data);
		  });
	  }, [userData]);
	  console.log("topbardetail",detail);
	return (
		<div style={{ position: 'relative' }}>
			<div className={styles.navbarContainer}>
				{/* <Contianer> */}
				<Dialog open={open} onClose={handleToClose}>
					<DialogTitle>{"How are you?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							I am Good, Hope the same for you!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleToClose}
							color="primary" autoFocus>
							Close
						</Button>
					</DialogActions>
				</Dialog>
				<div className={styles.navbar}>
					<div className={styles.logoDash}>
						<div className={styles.navbarLoopLogo}>
							<Link href="/">
								<a>
									<Image src={loopLogo} alt="csr_kuwait" height={50} width={190}  />
								</a>
							</Link>
						</div>
						<div className={styles.Dashboard}><p>Dashboard</p></div>
					</div>

					<div onClick={notificationView} className={styles.notifDiv}>
						<MdNotifications size={25} style={{ cursor: 'pointer' }} /></div>
					{notification && (
						<div className={styles.notifybox}>
							<div style={{ textAlign: 'right', paddingRight: '13px', cursor: 'pointer' }}><AiOutlineClose onClick={notifyHide} /></div>
							<h4 style={{ paddingBottom: "1rem" }}>Notifications</h4>

							<div className={styles.innerDiv}>
								<div className={styles.content}>


									{notifyData && notifyData.map((notify, key) => {
										console.log("notify", notify);
										return (
											<div onClick={() => {
												let url;
												let id;
												if (notify.productType === 'P') {
													url = 'project'
													id = notify.projectId
												} else if (notify.productType === 'E') {
													url = 'event'
													id = notify.eventId
												}
												console.log('notification redirection',{url},{id});
												router.push(`/${url}/details/${id}`)
											}} className={styles.messageStyle}>
												<p >{notify.message}</p>
												<p style={{ fontSize: '10px' }}>{dayjs(notify.createdAt).format('MMM D, hA')}</p></div>)
									})}
								</div>
							</div>

						</div>
					)}


					<div className={styles.profileDiv}>

						<Link href={'/profile'}>
							<div className={styles.profile}>
								{ detail?.img ? (<img style={{width:"30px",height:'30px'}} src={`${baseUrl}/${userUrl}/profile/${detail?.img}`} className={styles.profileIcon}/>) :
								(<BsPerson className={styles.profileIcon} />)}</div></Link>
						<Link href={'/profile'}><div style={{
							paddingLeft: '1rem', display: 'flex',
							alignItems: 'center'

						}}><p style={{ cursor: 'pointer' }}>{userData.userName}</p><MdOutlineKeyboardArrowDown /></div></Link>

					</div>

					<div onClick={showNav} className={styles.handburg}>
						<GiHamburgerMenu className={styles.hand} />
					</div>

				</div>

				{/* </Contianer> */}



			</div>
			<div style={{ display: 'flex', width: '100%' }}>
				<div className={styles.sidebarFlex}>


					<Link href={'/project'}>
						<div className={styles.wrap}>
							<div className={active == 1 ? styles.activeClass : styles.circle}><SiCodeproject className={styles.icon} /></div>
							<div className={styles.iconTitle}>Project</div>
						</div>
					</Link>
					<Link href={'/event'}>
						<div className={styles.wrap}>
							<div className={active == 2 ? styles.activeClass : styles.circle}><MdEventNote className={styles.icon} /></div>
							<div className={styles.iconTitle}>Events</div>
						</div>
					</Link>
					<Link href={'/messages'}>
						<div className={styles.wrap}>
							<div className={active == 3 ? styles.activeClass : styles.circle}><BiMessage className={styles.icon} /></div>
							<div className={styles.iconTitle}>Message</div>
						</div>
					</Link>

				</div>

				<div className={styles.childDiv}>{children}</div>

			</div>
			{
				navbar && (
					<div className={styles.handDrop}>
						<div onClick={hideNav} className={styles.close}><AiOutlineClose /></div>
						<div className={styles.dropLogo}>
							<Link href="/">
								<a>
									<Image src={loopLogo} />
								</a>
							</Link>
						</div>
						<div className={styles.homeborder}>
							<Link href={'/profile'}>
								<a className={styles.iconAndName}>
									<BsPerson />
									<p style={{ paddingLeft: "10px" }}>Profile</p>
								</a>
							</Link>
						</div>
						{/* <div className={styles.border}>
							
								<div className={styles.iconAndName}><MdNotifications/>
									<p style={{paddingLeft:"10px"}} onClick={notificationView}>
										Notification
									</p></div>
								
						</div> */}
						<div className={styles.border}>
							<Link href={'/messages'}>
								<a className={styles.iconAndName}>
									<BiMessage />
									<p style={{ paddingLeft: "10px" }}>
										Message
									</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>
							<Link href={'/event'}>
								<a className={styles.iconAndName}>
									<MdEventNote />
									<p style={{ paddingLeft: "10px" }}>
										Events
									</p>
								</a>
							</Link>
						</div>
						<div className={styles.border}>
							<Link href={'/project'}>
								<a className={styles.iconAndName}>
									<SiCodeproject />
									<p style={{ paddingLeft: "10px" }}>
										Project
									</p>
								</a>
							</Link>
						</div>
						<div>

							<button type="button" className={styles.signinbtn} onClick={Userlogout}>
								Logout
							</button>

						</div>
					</div>
				)
			}

		</div>
	)
}
export default Test
