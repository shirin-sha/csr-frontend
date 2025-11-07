import { React, useEffect, useState } from 'react'
import styles from './Faq1.module.css'
import Navbar from '../../components/navbar'
import { useForm } from 'react-hook-form'
import useDataQuery, { fetcher } from '../../hooks/useDataQuery'
// import Container from '../components/commen/Container'
import JoinUs from '../../components/joinus'
import Footer from '../../components/footer'
import FaqQuestionInstance from '../../components/FAQ/Faq'
// import Success from '../../components/popups/success/Success'
import sampleFaqImg from '../../images/sampleFaqImg.png'
import { usePopUp } from '../../hooks/usePopUp'
// const faqs = [{
// 	qstn: 'What does your agency do?',
// 	ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue proin habitant eleifend ultrices. Elementum purus dapibus. ',
// 	img: sampleFaqImg

// },
// {
// 	qstn: 'What does your agency do?',
// 	ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue proin habitant eleifend ultrices. Elementum purus dapibus. ',
// 	img: sampleFaqImg

// }, {
// 	qstn: 'What does your agency do?',
// 	ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue proin habitant eleifend ultrices. Elementum purus dapibus. ',
// 	img: sampleFaqImg

// },
// {
// 	qstn: 'What does your agency do?',
// 	ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue proin habitant eleifend ultrices. Elementum purus dapibus. ',
// 	img: sampleFaqImg

// },
// {
// 	qstn: 'What does your agency do?',
// 	ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue proin habitant eleifend ultrices. Elementum purus dapibus. ',
// 	img: sampleFaqImg

// }]

function Faqs() {
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues,reset,trigger
	} = useForm()
	const [showPopup, hidePopup] = usePopUp()

	const [faqs, setFaqs] = useState([])
	const [Qdata, error] = useDataQuery({ key: '/public/get-faq' })
	console.log('faq data ', Qdata)
	//setFaqs(Qdata?.data)
	const [success, setSuccess] = useState(false)
	const [message,setMessage]=useState(false)
	const [errMessage,setErrMessage]=useState(false)
	const [catcherr,setCatchErr]=useState(false)
	const faqMessageSubmit = async (values) => {
		console.log('values')
		console.log(values)
		const faqData = new FormData()
		faqData.append('name', values.name)
		faqData.append('email', values.email)
		faqData.append('subject', values.subject)
		faqData.append('message', values.message)
		try {
			console.log('dfd')
			const data = await fetcher({ key: '/public/post-question', data: faqData })
			console.log('dataaa', data)
			if (data && data.data.success === true) {
				console.log(data)
				setMessage(true)
				setTimeout(() => {
					setMessage(false);
					      }, 2000);
				
			} else {
				setErrMessage(true)
				setTimeout(() => {
					setErrMessage(false);
					      }, 2000);
				
			}
		} catch (e) {
			setCatchErr(e.message)
			// alert('message not send')
			// setErrorStatus(true)
			// alert('Asdasd')
		}
		reset();
	}

	const closeCode = () => {
		setSuccess(false)
	}
	return (
		<div>
			<div className={styles.navoverlay}>
				<Navbar />
			</div>
			<div className={styles.banner}>
				<h1>
					FAQ
				</h1>
			</div>

			<div className={styles.container}>
				<div className={styles.contentDiv}>
					<div className={styles.findHead}>
						<h3 className={styles.find}>
							Find Useful
						</h3>
					</div>
					<h1 className={styles.quesAnswer}>Question &amp; Answer</h1>
					<p className={styles.smallContent}>
						Check our FAQs for quic answers to requently ased questions we received.
						<br />
						if you have other questions write.
					</p>
					{/*	populate */}
					{Qdata?.data && Qdata?.data?.data?.map((Qdatas, key) => {
						console.log(Qdatas)
						return (
							<FaqQuestionInstance instanceData={{
								qstn: Qdatas.question,
								ans: Qdatas.answer,
								// img:sampleFaqImg
							}} />
						)
					})}
					{/*	end faqs */}
					<div className={styles.anyQuestion}>
						<h4 className={styles.sectionTitle}>
							Do You Have Any Questions?
						</h4>
						<p className={styles.description}>
							Capitalize On Low Hanging Fruit To Identify A Ballpark Value Added Activity To Beta Test.
							Override The Digital DivideWithAdditional Clickthroughs From DevOps.
							Nanotechnology Immersion Along The Inform Highway Will Close The LoopOn Focusing Solely On The Bottom Line.
						</p>
					</div>
					<form onSubmit={handleSubmit(faqMessageSubmit)}>
						<div className={styles.details}>
						<div className={styles.labelText}>
							<label>Your Name</label>
							<input type="text" className={styles.textbox}  name='name' {...register("name", { required: true })} onKeyUp={() => { trigger('name') }} />
							{errors.name && (<small className={styles.errorMessage}>**Your name is missing</small>)}
							</div>	

						<div className={styles.labelText}><label>Email</label>
						<input type="email" className={styles.textbox}  name='email' {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})} onKeyUp={() => { trigger('email') }} />
						{errors.email && (<small className={styles.errorMessage}>**Enter valid email</small>)}
						</div>
						<div className={styles.labelText}><label>Subject</label><input type="text" className={styles.textbox}  name='subject'{...register("subject", { required: true })} />
						{errors.subject && (<small className={styles.errorMessage}>**your subject missing</small>)}
						</div>

						</div><div className={styles.labelText}><label>Your Message</label>
						<textarea className={styles.textarea} rows="12"  name='message' {...register("message", { required: true })} />
						{errors.message && (<small className={styles.errorMessage}>**Type something</small>)}
						</div>
						
						{
								message &&(
							<div className={styles.successMsg}><span>Your message has been sent successfully</span></div>)}
							{
								errMessage &&(
							<div className={styles.errMsg}><span>Message not Send , Something went wrong</span></div>)}
						<div className={styles.btnDiv}>
							{catcherr &&(<div className={styles.errMsg}><span>{catcherr}</span></div>)}
							<button className={styles.sentMessage} type="submit">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
			<JoinUs />
			<Footer />
			{/* {success && (<Success heading="Success !" content="Your query is sent successfully." onClick={closeCode} transparent="true" />)} */}
		</div>
	)
}

export default Faqs
