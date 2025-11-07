import { React, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { BsTelephone } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'
import styles from './ContactUs.module.css'
import JoinUs from '../../components/joinus'
import Footer from '../../components/footer'
import GoogleMap from '../../components/googleMap'
import mapImage from '../../images/mapImage.png'
import Navbar from '../../components/navbar'
// import Success from '../../components/popups/success/Success'
// import ErrorPopup from '../../components/popups/error/Error'
import useDataQuery, { baseUrl, fetcher } from '../../hooks/useDataQuery'
import { usePopUp } from '../../hooks/usePopUp'
// import GoogleMapReact from "google-map-react";
// const MapMarker = ({ text }) => <div>{text}</div>;

function ContactUs({contactInfo}) {

	//let [contactdetail, setContactdetail] = useState({})
	const [useOgMapOrImg, setUseOgMapOrImg] = useState(true) //true-map,false-Img
	const [showPopup, hidePopup] = usePopUp()
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues, reset,trigger
	} = useForm()
	
	const [successStatus, setSuccessStatus] = useState(false)
	const [errorStatus, setErrorStatus] = useState(false)
	const [message,setMessage]=useState(false)
	const [errMessage,setErrMessage]=useState(false)
	const contactMessage = async (values) => {
		// {(e) => { e.preventDefault() }}
		//console.log('values')
		console.log('values : ', values)
		const messageData = new FormData()
		messageData.append('name', values.name)
		messageData.append('mobile', values.mobile)
		messageData.append('email', values.email)
		messageData.append('subject', values.subject)
		messageData.append('message', values.message)
		try {
			console.log('dfgh')
			console.log(...messageData);
			const data = await fetcher({ key: '/public/post-inquiry', data: messageData })
			console.log('fetchdata', data)
			if (data && data.data.success === true) {
				console.log('sucessdataaaa', data)

				setMessage(true)
				setTimeout(() => {
					setMessage(false);
					      }, 2000);
				setErrMessage(false)
			
				reset();
			
			} else {
				setErrMessage(true)
				
			
			}
		} catch (e) {
			setErrorStatus(e.message)
			// alert('message sent failed in catch block')
			
		}
		
	}
	return (
		<div className={styles.contactPage}>
			<div className={styles.navoverlay}>
				<Navbar />
			</div>
			<div className={styles.bannerPic}>
				<h1>CONTACT US </h1>
			</div>
			<div className={styles.container}>
				<div className={styles.contact}>
					<div className={styles.number}>
						<Link href={`tel:${contactInfo.contact_mobile}`}>
							<a>
								<BsTelephone className={styles.icon} />
								<p>{contactInfo.contact_mobile}</p>
							</a>
						</Link>
					</div>
					<div className={styles.number}>
						<Link href={`mailto:care@loop.co`}>
						<a>
							<FiMail className={styles.icon} />
							<p>{contactInfo.contact_email}</p>
							</a>
						</Link>
						{/* <p>dfgjhklkjhkjhgfcgdhghkjjhcgfdgfjhkhhgdtrfgj</p> */}
					</div>
					<div className={styles.number}>
						<IoLocationOutline className={styles.icon} />
						<p>{contactInfo.contact_location}</p>
					</div>
				</div>
				<div className={styles.messageForm}>
					<div className={styles.googleMapWrap}>
						{useOgMapOrImg && <GoogleMap />}
						{!useOgMapOrImg
							&&
							(
								<div className={styles.dummyMapWrap}>
									<Image src={mapImage} layout="fill" />
								</div>
							)}
					</div>

					<form className={styles.formContent} onSubmit={handleSubmit(contactMessage)}>
						<h1 className={styles.formHeading}>Send Us Message</h1>

						<div className={styles.formFields}>
							<div className={styles.singlerow}><div className={styles.textLabel}>
							<label>Your Name</label>
							<input type="text" name='name' {...register("name", { required: true })} onKeyUp={() => { trigger('name') }} />
							{errors.name && (<small className={styles.errorMessage}>**Your name is missing</small>)}

							</div>
							<div className={styles.textLabel}>
							<label>Phone Number</label>
							<input type="tel" name='mobile' {...register("mobile", { required: true ,pattern: /^[0-9]{10}$/i })} onKeyUp={() => { trigger('mobile') }}  />
							{errors.mobile?.type ==='required'&& (<small className={styles.errorMessage}>**Your Phone Number Is Missing</small>)}
							{errors.mobile?.type==='pattern' && (<small className={styles.errorMessage}>**Enter Valid Mobile Number</small>)}
							</div>
							</div>
							<div className={styles.singlerow}><div className={styles.textLabel}>
							<label>Email Address</label>
							<input type="email" name='email' {...register("email", { required: true ,pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})} onKeyUp={() => { trigger('email') }} />
							{errors.email && (<small className={styles.errorMessage}>**Enter valid email</small>)}
							</div>
							<div className={styles.textLabel}>
							<label>Subject</label>
							<input type="text" name='subject'{...register("subject", { required: true })} />
							{errors.subject && (<small className={styles.errorMessage}>**your subject missing</small>)}
							</div>
							</div>
							<div className={styles.MsgtextLabel}><label>Message</label>
							<textarea className={styles.spanField} rows="5" name='message'{...register("message", { required: true })} />
							{errors.message && (<small className={styles.errorMessage}>**Type something</small>)}
							</div>
							{
								message &&(
							<div className={styles.successMsg}><span class="tooltiptext">Your message has been sent successfully</span></div>)}
							{
								errMessage &&(
							<div className={styles.errMsg}><span class="tooltiptext">Message not Send , Something went wrong</span></div>)}
							{errorStatus &&(
								<div className={styles.errMsg}><span class="tooltiptext">{errorStatus}</span></div>
							)}
							<div className={styles.messagebtn}><input type="submit" value='Send Message' /></div>
							{/* <label>Your Name</label>
							<input type="text" name='name' {...register("name", { required: true })} />
							<label>Phone Number</label>
							<input type="tel" name='mobile' {...register("mobile", { required: true })} />
							<label>Email Address</label>
							<input type="email" name='email' {...register("email", { required: true })} />
							<label>Subject</label>
							<input type="text" name='subject'{...register("subject", { required: true })} />
							<label>Message</label>
							<textarea className={styles.spanField} rows="5" name='message'{...register("message", { required: true })} />
							<input type="submit" value='Send Message' /> */}
						</div>

					</form>

				</div>
			</div>
			<JoinUs />
			<Footer />
			
			
		</div>
	)
}

export default ContactUs

export async function getServerSideProps() {
	// Fetch data from external API
const response=	await axios.post(`${baseUrl}/public/get-contactInfo`)

	const contactInfo=await response.data.data

	// Pass data to the page via props
	return { props: { contactInfo} }
  }