import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Bar from '../../../components/commonBar'
import Details from '../../../components/Details'
import SponsorshipBar from '../../../components/SponsorshipBar'
import Card from '../../../components/sponserCards/card'
import CardContainer from '../../../components/sponserCards/container'

import styles from './style.module.css'
import { useRouter } from 'next/router'

import { AuthContext } from '../../../store/context'
import useDataQuery, { fetcher } from '../../../hooks/useDataQuery'
import { usePopUp } from '../../../hooks/usePopUp'
import { mutate } from 'swr'
import Image from 'next/image'
import noImage from '../../../images/noImage.svg'


function ProjectDetails({ data }, props) {
	const router = useRouter()
	const { userData, setUserData } = useContext(AuthContext)
	const [mySponsorShip, setMySponsorShip] = useState([])
	const [activeSponsorShip, setActiveSponsorShip] = useState([])
	const [applicantSponsorShip, setApplicantSponsorShip] = useState([])
	const [queueSponsorShip, setQueueSponsorShip] = useState([])
	const [editMode, setEditMode] = useState(false)
	const [showPopup, hidePopup] = usePopUp()
	const [sponsorBtn, setSponsorBtn] = useState(true)
	const id = router.query.projectId
	let userUrl = 'applicant'
	let queryData = { id: id }
	const user = userData.userType
	const userId = userData.userId

	console.log({ id });
	console.log({ data });
	console.log("activeSponsorShip", activeSponsorShip);
	console.log({ user });
	console.log('userData :', userData);
	console.log('usr url after checking', userUrl);
	console.log('userId'.userId)



	if (user == 1) {
		userUrl = 'applicant'

	} else if (user == 2) {
		userUrl = 'organizer'

	} else if (user == 3) {
		userUrl = 'sponsor'

	}
	// switch (parseInt(user)) {
	// 	case 1:

	// 		break;
	// 	case 2:

	// 		break;
	// 	case 3:

	// 		break;
	// 	default:
	// 		break;
	// }

	//functions


	//hooks
	const [fData, error, mutate] = useDataQuery({ key: `/${userUrl}/project-details`, data: queryData, header: { headers: { token: userData.token } } })
	useEffect(() => {
		console.log('effect layout...');

		//const tempD=
		//console.log({tempD});

		setMySponsorShip(fData?.data && fData?.data?.mySponsorShip)

		setApplicantSponsorShip(fData?.data?.data?.sponsorships && fData?.data?.data?.sponsorships.filter((dat) => {
			console.log('data sponsor applicant', dat);
			return dat.status == 0 && dat.deleted_by == null
		}))

		setQueueSponsorShip(fData?.data?.data?.sponsorships && fData?.data?.data?.sponsorships.filter((dat) => {
			console.log('data sponsor que', dat);
			return dat.status == 1
		}))

	}, [fData])

	useEffect(() => {
		console.log({ editMode });
	}, [editMode])
	console.log({ mySponsorShip });

	// functions	
	//confirm sponsorship
	const sponsorConfirm = () => {
		const confirmYes = async () => {
			const queryData = {
				project: fData?.data?.data,
				sponsorship: mySponsorShip[0]
			}
			const fetchData = await fetcher({ key: `/${userUrl}/confirm-bid`, data: queryData, header: { headers: { token: userData.token } } })
			console.log('confirm sponsorship', { fetchData });

			if (fetchData && fetchData?.data?.success === true) {
				showPopup({
					transparent: true,
					content: 'Your Sponsorship is confirmed',
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})
				mutate(`/${userUrl}/project-lists`)
			}
			if (fetchData && fetchData?.data?.success === false) {
				showPopup({
					transparent: true,
					content: fetchData?.data?.message,
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})
			}
		}
		showPopup({
			transparent: true,
			content: 'Do you want to confirm this sponsorship',
			onCancelpressed: () => { console.log("onCancelpressed"); hidePopup() },
			onYesPressed: () => { confirmYes(); hidePopup() }
		})

	}
	//

	const projectSponser = fData?.data?.data?.sponsorships?.sponser_id

	console.log("projectsponser", projectSponser);


	const sponserFind = (id) => {
		console.log('hhhj')
		return projectSponser?.filter((item) => item.sponsor_id._id === id)

	}
	//   const sss=console.log(sponsorships?.sponser_id)
	const SponserArray = sponserFind(userId)
	const newsponser = SponserArray?.sponsor_id
	console.log("SponserArray", SponserArray)

	// remove sponsorship by sponsor
	const removeSponsorship = async () => {


		const removeYes = async () => {
			console.log('amount ', mySponsorShip[0].amount);
			const queryData = {
				project_id: fData?.data?.data._id,
				amount: mySponsorShip[0].amount
			}
			const fetchData = await fetcher({ key: `/${userUrl}/remove-sponsorship`, data: queryData, header: { headers: { token: userData.token } } })

			console.log('remove sponsorship', { fetchData });
			if (fetchData && fetchData?.data?.success === true) {
				showPopup({
					transparent: true,
					content: 'Your Sponsorship is removed',
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})
				mutate(`/${userUrl}/project-lists`)

			}
			if (fetchData && fetchData?.data?.success === false) {
				showPopup({
					transparent: true,
					content: fetchData?.data?.message,
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})
			}
		}
		showPopup({
			transparent: true,
			content: 'Do you want to delete your sponsorship',
			onCancelpressed: () => { console.log("onCancelpressed"); hidePopup() },
			onYesPressed: () => { removeYes(); hidePopup() }
		})



	}

	const acceptQueueReq = (sponsorId, amount) => {
		console.log('queue request selected', { sponsorId });
		const id = sponsorId._id
		showPopup({
			transparent: true,
			content: 'Do you want to accept this request',
			onCancelpressed: () => { console.log("onCancelpressed"); hidePopup() },
			onYesPressed: () => {
				accept()

				hidePopup()
			}
		})

		const accept = async () => {

			const queryData = {
				sponsor_id: id,
				project_id: fData?.data?.data._id,
				amount


			}
			const fetchData = await fetcher({ key: `/${userUrl}/accept-queue`, data: queryData, header: { headers: { token: userData.token } } })
			console.log('accept by applicant', { fetchData });
			if (fetchData && fetchData?.data?.success === true) {
				mutate(`/${userUrl}/list-projects`)

				showPopup({
					transparent: true,
					content: 'Your are accepted this Sponsorship ',
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})

			}
			if (fetchData && fetchData?.data?.success === false) {
				console.log('message :', fetchData?.data?.message);
				showPopup({
					transparent: true,
					content: fetchData?.data?.message,
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})

			}
		}
	}
	//to message page
	const toMessage = (value) => {
		// e.preventDefault()
		// console.log('chat...appl');

		const data = {
			ownerId: fData.data.data.added_sponsor || fData.data.data.added_applicant || fData.data.data.added_organizer,
			userName: userData.userName,
			userId,
			isApplicant: fData.data.data.added_applicant ? true : false,
			isEvent: false

		}
		fetcher({
			key: `/${userUrl}/startChat`, data, header: {
				headers: { token: userData.token }
			}
		}).then(res => {
			console.log('chat data sent', { res });
			console.log('chat data', data);
			router.push(`/messages?id=${res.data.data}`)

		})

	}

	console.log('balance calc', (fData?.data?.data?.budget) - (fData?.data?.data?.sponsor_amount));
	console.log('total data', fData?.data?.data);
	console.log({ mySponsorShip });
	//sponsor
	if (user == 3) {
		//console.log('id', fData?.data?.data._id);
		return (
			<React.Fragment>
				<Bar active={1}>
					<div className={styles.container}>

						{fData && <Details mutate={mutate}  mySponsorShip={mySponsorShip} editMode={editMode} editHandler={() => setEditMode(true)} messageHandler={toMessage} deleteHandler={!editMode && removeSponsorship} confirmHandler={sponsorConfirm} details={fData.data?.data} setEditMode={setEditMode} pageTitle={"Project Details"} user={user}></Details>}
						{/* <div className={styles.card_container}> */}
						{/* {fData && mySponsorShip && <CardContainer data={mySponsorShip} type={'sponsor-sponsorship'}></CardContainer>} */}
						{/* <div className={styles.my_sponsor}>{fData && mySponsorShip?.length > 0 && <Card data={mySponsorShip[0]} editHandler={() => setEditMode(true)} status={fData?.data?.data?.status} messageHandler={toMessage} deleteHandler={!editMode&&removeSponsorship} confirmHandler={sponsorConfirm} projectId={fData?.data?.data?._id} type={'sponsor-sponsorship'} />}</div> */}



						{fData && fData?.data && fData?.data?.activeSponsorShip?.length > 0 && <>
							<div className={styles.card_container}>
								{/* <h3 className={styles.heading}>Sponsors</h3> */}
								{/* <div className={styles.sponorSwitch}> */}
								<div className={styles.sponorSwitch}><button className={styles.sponsorHead}>Sponsors</button></div>

								<CardContainer mutate={mutate} data={fData?.data?.activeSponsorShip} type={'sponsor-sponsor-list'}></CardContainer>
								{/* </div> */}
							</div> </>}

						{/* sponsershipard */}
						{/* {fData && mySponsorShip?.length > 0 && <div className={styles.card_container}>
							<div className={styles.my_sponsor}>{fData && mySponsorShip?.length > 0 && <Card data={mySponsorShip[0]} editHandler={() => setEditMode(true)} status={fData?.data?.data?.status} messageHandler={toMessage} deleteHandler={!editMode && removeSponsorship} confirmHandler={sponsorConfirm} projectId={fData?.data?.data?._id} type={'sponsor-sponsorship'} />}</div>


						</div>} */}


					</div>
					{/* <div className={styles.sponsorShipBar} >

						{fData && <SponsorshipBar mySponsorShip={mySponsorShip?.length > 0 && mySponsorShip[0]} editMode={editMode}  messageHandler={toMessage} mutate={mutate} projectDetails={fData.data?.data} isSponsored={mySponsorShip && mySponsorShip.length === 0 || fData?.data?.data?.sponsorships?.length == 0} projectId={fData?.data?.data?._id} amount={fData?.data?.data?.budget} balance={fData?.data?.data?.budget - fData?.data?.data?.sponsor_amount} className={styles.sponsorShipBar} isSponsor ></SponsorshipBar>}


					</div> */}
				</Bar>
			</React.Fragment>
		)
	} else if (user == 1 || user == 2) {
		return (

			//applicant
			<Bar active={1}>
				<div className={styles.container}>

					{fData && <Details mutate={mutate} details={fData.data?.data} messageHandler={toMessage} isApplicant pageTitle="Project Details" user={user}></Details>}

					{/* sponsorship listing */}
					{fData && fData?.data?.data?.sponsorships.length > 0 && <div className={styles.card_container_applicant}>
						<div className={styles.switchButton}>
							<button className={styles.sponsorBtn}
								style={{
									backgroundColor: sponsorBtn ? 'white' : '#D9D9D9',

								}}
								onClick={() => { setSponsorBtn(true) }}
							>Sponsors</button>
							<button className={styles.sponsorBtn} onClick={() => { setSponsorBtn(false) }}
								style={{
									backgroundColor: !sponsorBtn ? 'white' : '#D9D9D9',

								}}>Queue Sponsor</button></div>

						{sponsorBtn &&
							(fData && applicantSponsorShip && applicantSponsorShip.length > 0 ? <>
								{/* <h3 className={styles.heading}>Sponsors</h3> */}
								<CardContainer  mutate={mutate} status={fData && fData.data?.data?.status} data={applicantSponsorShip} projectId={fData?.data?.data?._id} type={'applicant-sponsor'}></CardContainer> </>
								:<div className={styles.emptyQueue}><Image src={noImage} width={200} height={200} /><p>No  Sponsors</p></div>)}


					</div>}
					{!sponsorBtn && (
						<div className={styles.card_container_applicant_q}>
							{(fData && queueSponsorShip &&queueSponsorShip.length > 0 ) ? (<>
								{/* <h3 className={styles.heading}>Queue Sponsors</h3> */}
								<CardContainer mutate={mutate} status={fData && fData.data?.data?.status}  acceptButton={acceptQueueReq} data={queueSponsorShip} type={'applicant-queue-sponsor'}></CardContainer></>) : (
								<div className={styles.emptyQueue}><Image src={noImage} width={200} height={200} /><p>No Queue Sponsors</p></div>
							)}

						</div>)}


				</div>




			</Bar>

		)
	}

}

export default ProjectDetails
