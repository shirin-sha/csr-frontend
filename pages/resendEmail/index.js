import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import { Link } from "react-router-dom";
import styles from './styles.module.css'
import Connect from '../../components/commen/connect/ConnectLayout'
import { fetcher } from '../../hooks/useDataQuery'

import { usePopUp } from '../../hooks/usePopUp'



function ResendEmail() {
	const router = useRouter()
	const { userType } = router.query
	const [showPopup, hidePopup] = usePopUp()

	console.log({ userType });
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues
	} = useForm()
	const [mail, setMail] = useState('')
	// <Link to="/reset-password-email" state={{mail:mail}} >
	// if (userType === '0') {
	// 	userUrl = 'applicant'
	// } else if (userType === '1') {
	// 	userUrl = 'organizer'

	// } else if (userType === '2') {
	// 	userUrl = 'sponsor'

	// }
	console.log('user type from resend email page',{userType});
	let userUrl = 'applicant'
	
	switch (parseInt(userType)) {
		case 0:
			userUrl = 'applicant'
			
			break;
		case 1:
			userUrl = 'sponsor'
			
			break;
		case 2:
			userUrl = 'organizer'
			
			break;
		default:
			break;

	}
console.log('user url in resend page ',userUrl);
	const sendEmail = async (values) => {
		console.log('values')
		console.log(values)
		const email = getValues('email')
		
		setMail(email)
		console.log('mail', mail)
		// </Link>
		const dataform = new FormData()

		dataform.append('email', values.email)

		try {

			const data = await fetcher({ key: `/${userUrl}/send-activateLink`, data: dataform })
			console.log('fetchdata', data)

			if (data && data.data.success === true) {
				console.log(data)
					showPopup({
			transparent: true,
			showClose: true,
			heading: 'Activate Account',
			customContent: <> An activation email was send to < span > {values.email}</span ></>,
			pointFinger: true,
			message: "Please click the link in the email to activate your Account",
			gotoEmailAction: () => { console.log("gotoEmailAction");hidePopup() },
			
		})
				
			}
			else {
				showPopup({
					transparent: true,
					showClose: true,
					ThumbDown: true,
					heading: 'Error !',
					customContent: <>{data.data.message}</>
				})
			}
		} catch (e) {
			// setErrorStatus(true)
			alert(e)
		}
	}
	return (

		<Connect>
			<div className={styles.forgotPasswordWrap}>


				<div className={styles.newHeading}>
					<div className={styles.newHeadingInner}>
						<h1> Your Account is  not Activated

						</h1>
						<h2>

						</h2>
					</div>
				</div>

				<p className={styles.prompt}>

				Your Account is not activated Reset the mail


				</p>

				<form className={styles.formContent}
					// onSubmit={(e) => {e.preventDefault();router.push('/password-reset-email');}}
					onSubmit={handleSubmit(sendEmail)}>
					<div className={styles.emailWrap}>
						<label>Enter Your mail</label>
						<input type="email" name="email"  {...register("email", { required: true })} />

					</div>
					<div className={styles.errmsg}>{errors.email && <span>This field is required</span>}</div>
					<div className={styles.submitWrap} >
						<input className={styles.submitButton} type="submit" value="Resend" />
					</div>


				</form>



			</div>

		</Connect>

	)

}

export default ResendEmail

