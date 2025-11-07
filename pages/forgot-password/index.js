import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import { Link } from "react-router-dom";
import styles from './forgotPassword.module.css'
import Connect from '../../components/commen/connect/ConnectLayout'
import { fetcher } from '../../hooks/useDataQuery'

import { usePopUp } from '../../hooks/usePopUp'
import Link from 'next/link'



function ForgotPassword() {
	const router = useRouter()
	const { userType } = router.query
	const [showPopup, hidePopup] = usePopUp()
const [errMsg,seterrMsg]=useState(false)
const[catchErr,setCatchErr]=useState(false)
	console.log({ userType });
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues
	} = useForm()
	const [mail, setMail] = useState('')
	// <Link to="/reset-password-email" state={{mail:mail}} >
	let userUrl = 'applicant'
	if (userType === '0') {
		userUrl = 'applicant'
	} else if (userType === '1') {
		userUrl = 'sponsor'

	} else if (userType === '2') {
		userUrl = 'organizer'

	}
	const forgotPassword = async (values) => {
		console.log('values')
		console.log(values)
		const forgotmail = getValues('email')
		console.log('forgotmail', forgotmail)
		setMail(forgotmail)
		console.log('mail', mail)
		// </Link>
		const forgotData = new FormData()

		forgotData.append('email', values.email)

		try {

			const data = await fetcher({ key: `/${userUrl}/reset-password-email`, data: forgotData })
			console.log('fetchdata', data)

			if (data && data.data.success === true) {
				console.log(data)
            console.log("maillllll",forgotmail)
				router.push(`/password-reset-email?mail=${forgotmail}`)
			}
			else {
				seterrMsg(data.data.message)
				console.log("errMsg",errMsg);
				
			}
		} catch (e) {
			setCatchErr(e)
		}
	}
	return (

		<Connect>
			<div className={styles.forgotPasswordWrap}>


				<div className={styles.newHeading}>
					<div className={styles.newHeadingInner}>
						<h1> Forgot password

						</h1>
						<h2>

						</h2>
					</div>
				</div>

				<p className={styles.prompt}>

					Submit your email address and we will send <br />you a link to reset your password


				</p>

				<form className={styles.formContent}
					// onSubmit={(e) => {e.preventDefault();router.push('/password-reset-email');}}
					onSubmit={handleSubmit(forgotPassword)}>
					<div className={styles.emailWrap}>
						<label>Email</label>
						<input type="email" name="email" placeholder='john@gmail.com' {...register("email", { required: true })} />

					</div>
					<div className={styles.errmsg}>{errors.email && <span>This field is required</span>}</div>
					{errMsg &&(<div className={styles.errmsg}><span>{errMsg}</span></div>)}
{catchErr&&(<div className={styles.errMsg}><span>{catchErr}</span></div>)}
					<div className={styles.submitWrap} >
						<input className={styles.submitButton} type="submit" value="Ok" />
						<Link href="/login"><a><input type="button"className={styles.submitButton} value="Back"/></a></Link>
					</div>


				</form>



			</div>

		</Connect>

	)

}

export default ForgotPassword

