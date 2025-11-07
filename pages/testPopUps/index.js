import React, { useEffect } from 'react'
import { usePopUp } from '../../hooks/usePopUp';

const TestPopup = () => {
	const [showPopup, hidePopup] = usePopUp()
	// showPopup - use it for diplaying popups with specified options
	// hidePopup - use it for hiding the popup
	// useEffect(() => {
	// 	// successPopup
		// showPopup({
		// 	successTick: true,
		// 	transparent: true,
		// 	heading: 'Success !',
		// 	showClose: true,
		// 	content: 'You are now a new member !'
		// })

	// 	// errorPopup
	// 	showPopup({
	// 		transparent: true,
	// 		showClose: true,
	// 		ThumbDown: true,
	// 		heading: 'Error !',
	// 		customContent: <>An account with email <span>John@gmail.com</span> already exist</>
	// 	})
	// 	// activationPopup
	// 	showPopup({
	// 		transparent: true,
	// 		showClose: true,
	// 		heading: 'Activate Account',
	// 		customContent: <> An activation email was send to < span > John@gmail.com</span ></>,
	// 		pointFinger: true,
	// 		message: "Please click the link in the email to activate your Account",
	// 		gotoEmailAction: () => { console.log("gotoEmailAction");hidePopup() },
	// 		resendEmailAction: () => { console.log("resendEmailAction");hidePopup() },
	// 	})
	// 	// okPopup
	// 	showPopup({
	// 		transparent: true,
	// 		content: 'Please check your email and click on the received link to activate account',
	// 		onOkPressed: () => { console.log("onOkPressed");hidePopup() }
	// 	})
	// 	// yesCancelPopup
	// 	showPopup({
	// 		transparent: true,
	// 		content: 'Please check your email and click on the received link to activate account',
	// 		onCancelpressed: () => { console.log("onCancelpressed");hidePopup() },
	// 		onYesPressed: () => { console.log("onYesPressed");hidePopup() }
	// 	})
	// 	// OkCancelPopup
	// 	showPopup({
	// 		transparent: true,
	// 		content: 'Please check your email and click on the received link to activate account',
	// 		onOkPressed: () => { console.log("onOkPressed");hidePopup() },
	// 		onCancelpressed: () => { console.log("onCancelpressed");hidePopup() }
	// 	})

	// 	return () => { hidePopup() }
	// }, [])

	return (
		<div>
			<button onClick={() => {
				showPopup({
					successTick: true,
					transparent: true,
					heading: 'Success !',
					showClose: true,
					content: 'You are now a new member !'
				})
			}}>
				Activate Popup 1
			</button>
			<button onClick={() => {
				showPopup({
					transparent: true,
					showClose: true,
					ThumbDown: true,
					heading: 'Error !',
					customContent: <>An account with email <span>John@gmail.com</span> already exist</>
				})
			}}>
				Activate Popup 2
			</button>
			<button onClick={() => {
				showPopup({
					transparent: true,
					showClose: true,
					heading: 'Activate Account',
					customContent: <> An activation email was send to < span > John@gmail.com</span ></>,
					pointFinger: true,
					message: "Please click the link in the email to activate your Account",
					gotoEmailAction: () => { console.log("gotoEmailAction");hidePopup() },
					resendEmailAction: () => { console.log("resendEmailAction");hidePopup() },
				})
			}}>
				Activate Popup 3
			</button>
			<button onClick={() => {
				showPopup({
					transparent: true,
					content: 'Please check your email and click on the received link to activate account',
					onOkPressed: () => { console.log("onOkPressed");hidePopup() }
				})
			}}>
				Activate Popup 4
			</button>
			<button onClick={() => {
				showPopup({
					transparent: true,
					content: 'Please check your email and click on the received link to activate account',
					onCancelpressed: () => { console.log("onCancelpressed");hidePopup() },
					onYesPressed: () => { console.log("onYesPressed");hidePopup() }
				})
			}}>
				Activate Popup 5
			</button>
			<button onClick={() => {
				showPopup({
					transparent: true,
					content: 'Please check your email and click on the received link to activate account',
					onOkPressed: () => { console.log("onOkPressed");hidePopup() },
					onCancelpressed: () => { console.log("onCancelpressed");hidePopup() }
				})
			}}>
				Activate Popup 6
			</button>
		</div >
	)
}
export default TestPopup