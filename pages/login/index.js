import { React, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGooglePlusG, FaTwitter } from 'react-icons/fa'
import Connect from '../../components/commen/connect/ConnectLayout'
import styles from './Login.module.css'
import useDataQuery, { fetcher } from '../../hooks/useDataQuery'
import Link from 'next/link'
import decoder from 'jwt-decode'
import { usePopUp } from '../../hooks/usePopUp'
import { AuthContext } from '../../store/context'


function Login() {
	const router = useRouter()
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues, reset
	} = useForm()
	const { userData, setUserData } = useContext(AuthContext)

	const [tokenResp, setTokenResp] = useState(null)
	const [tokenMsg, setTokenMsg] = useState(null)
	const [showPopup, hidePopup] = usePopUp()
	const [error, setError] = useState(null)
	const [userType, setUserType] = useState(0)
	//
const [catchErr,setcatchErr]=useState(false)
	console.log({ userType });
	let verificationUser;
	let verifyUrl;
	let registerUrl = 'register'
	let userUrl = 'applicant'
	const token = router.query.token
	console.log("tokeeeen", { token });
	const role = router.query.role
	console.log({ role });
	let userName;
	if (token) {
		verificationUser = parseInt(role)
	}
	//this switching only based on login buttons
	switch (userType) {
		case 0:
			userUrl = 'applicant'
			registerUrl = 'register'
			break;
		case 1:
			userUrl = 'sponsor'
			registerUrl = 'registerSponsor'
			break;
		case 2:
			userUrl = 'organizer'
			registerUrl = 'organiser-registration'
			break;
		default:
			break;

	}
	console.log({ verificationUser });
	switch (verificationUser) {
		case 0:
			verifyUrl = 'applicant'

			break;
		case 1:
			verifyUrl = 'sponsor'

			break;
		case 2:
			verifyUrl = 'organizer'

			break;
		default:
			break;

	}

	console.log({ registerUrl, verifyUrl });
	console.log({ error });
	console.log("tokenmessage", tokenMsg)
	useEffect(() => {

		console.log('useeffect started');

		console.log('check token');

		console.log('user url from usereffect', verifyUrl);
		token !== undefined && fetcher({ key: `/${verifyUrl}/activate-account`, data: { token } }).then(async (resp) => {
			console.log('validation token', resp);
			setTokenResp(resp.data.success)
			setTokenMsg(resp.data.message)

			console.log('validation token ', token);

			console.log('it is direct login page');

		})

	}, [router.isReady]);
	// prefetch dashboard
	useEffect(() => {

		router.prefetch('/project')
	}, [])
	console.log({ tokenResp });
	const loginFormSubmit = async (values) => {

		console.log('values')
		console.log(values)
		const loginData = new FormData()
		loginData.append('email', values.email)
		loginData.append('password', values.password)
		try {
			const data = await fetcher({ key: `/${userUrl}/login`, data: loginData })
			console.log("logindataaaaaaaaaaaaaa", data)

			if (data && data.data.success === true) {

				const token = data.headers.token
				console.log({ token });
				localStorage.setItem('Token', token)
				const decodedToken = decoder(token)
				console.log("sssssssssss", data.data.data.first_name)
				if (data.data.data.type === 0) {
					userName = data.data.data.first_name
				}
				else if (data.data.data.type === 1) {
					userName = data.data.data.company_name
				}
				if (decodedToken.data.role == 3) {
					userName = data.data.data.company_name
					console.log('sponsor name', userName);

				}
				if (decodedToken.data.role == 2) {
					const showReminderPopup = data.data.expireDateReminder
					console.log({ showReminderPopup });
					localStorage.setItem('canSHowReminder', showReminderPopup.showReminder)
					if (showReminderPopup.showReminder == true) {
						showPopup({
							transparent: true,
							content: <>Your account is expiring soon ,<br/>please contact admin for more information </>,
							onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
						})
					}

				}

				console.log({ decodedToken }, { userName });
				localStorage.setItem('User', decodedToken.data.role)
				localStorage.setItem('UserId', decodedToken.data.id)
				localStorage.setItem('SponsorType', data.data?.data?.type)
				localStorage.setItem('userName', userName)
				console.log('sponsortype', data?.data?.data?.type);

				localStorage.setItem('AppType', data.data?.data?.type)
				//set item in context
				setUserData({
					token: token,
					userId: decodedToken.data.id,
					userType: decodedToken.data.role,
					isAuthorized: true,

					userName: userName,
					appType: data.data?.data?.type



				})
				router.push('/project')
			} else {
				// showPopup({
				// 	transparent: true,
				// 	showClose: true,
				// 	ThumbDown: true,
				// 	heading: 'Error !',
				// 	customContent: <>{data.data.message}</>
				// })
				setError(data.data.message)
				console.log({ error });
			}
		} catch (e) {
			setcatchErr(true)
			// alert('Error', e)
			// console.log('eerror :', { e });
		}
	}
	return (
		<div>
			<Connect>
				<form className={styles.forgotForm} onSubmit={handleSubmit(loginFormSubmit)}>
					{tokenMsg && <div className={styles.tokenValidationBox}>
						<p className={(tokenResp === true || tokenResp === null) ? styles.tokenValidationMsgSuccess : styles.tokenValidationMsg}>{tokenMsg}{(tokenResp === false)
							&& <a href={`/resendEmail?userType=${userType}`} >
								Please click to <span style={{ textDecoration: 'underline' }}>Resend activation mail </span> </a>
						}
						</p>
					</div>}

					<h1 className={styles.welcome}>Welcome</h1>
					<p className={styles.para}>Login into your account to continue </p>
					<div className={styles.usersWrapper}>

						<a className={userType !== 0 ? styles.usersSwitcherA : styles.userSwitcherClickA}>
							<h6 onClick={() => { reset(); setError(''); setUserType(0) }} >Applicant</h6>
						</a>
						<a className={userType !== 1 ? styles.usersSwitcherO : styles.userSwitcherClickO}>
							<h6 onClick={() => { reset(); setError(''); setUserType(1) }} >Sponsor</h6>
						</a>


						<a className={userType !== 2 ? styles.usersSwitcherS : styles.userSwitcherClickS}>
							<h6 onClick={() => { reset(); setError(''); setUserType(2) }}>Event Organizer</h6>
						</a>

					</div>
					<div className={styles.textIcon} >
						<label>Email</label>
						<input type="email" className={styles.emailInput} name="email" {...register("email", { required: true })} />
					</div>
					<div className={styles.errmsg}>{errors.email && <span>Enter your Email</span>}</div>
					<div className={styles.textIcon}>
						<label>Password</label>
						<input type="password" className={styles.emailInput} name="password" {...register("password", { required: true })} />
					</div>
					<div className={styles.errmsg}>{errors.password && <span>Enter your password</span>}</div>
					{/* check */}
					<div className={styles.checkRow}>
						<div className={styles.remember}>
							<input type="checkbox" className={styles.checkbox} />
							<p style={{ color: "#222221b2" }}>Remember me</p>
						</div>
						<div className={styles.forgotPassword}><p onClick={() => router.push({ pathname: '/forgot-password', query: { userType } })}>Forgot Password</p></div>
					</div>

					<input type="submit" value='Login' className={styles.loginBtn} />
					{<div className={styles.errmsg}> <span>{error}</span></div>}
					{catchErr &&<div className={styles.catcherrmsg}> <span>Something went wrong,Please try again later</span></div>}
					<div className={styles.account}><p>Dont have an account ?</p><span className={styles.signUp} onClick={() => router.push(`/${registerUrl}`)}>Signup</span></div>

				</form>

			</Connect>


		</div>
	)
}

export default Login
