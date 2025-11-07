import React from 'react'
import { useRouter } from 'next/router'
import styles from './passwordResetEmail.module.css'
import Connect from '../../components/commen/connect/ConnectLayout'
function ForgotPassword(props) {
	const router = useRouter()
// 	console.log(props, " props");
// console.log(location, " useLocation Hook");
// const mail = location.state?.mail
let {mail}=router.query
console.log("emaillll",mail);
	return (

		<Connect>
			<div className={styles.forgotPasswordWrap}>

				<p className={styles.message}>
					A password reset email has been send to {mail}

				</p>

				<p className={styles.prompt}>
					Please follow the instruction in the email to reset your password
				</p>

				<a className={styles.formContent} href='https://mail.google.com/mail'>

					<div className={styles.submitWrap}>
						<input type="submit" value="Check Mail" />
					</div>
				</a>
			</div>

		</Connect>

	)
}

export default ForgotPassword
