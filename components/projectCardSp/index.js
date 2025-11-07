	import React from 'react'
	import styles from './createcard.module.css'

	const Createcard = (props) => {
		console.log(props)
		const {heading} = props
		console.log(heading);
		return (
			<div>
				{/* <div className={styles.cardDiv}> */}
				<div className={styles.card}>
					<div className={styles.eventTitle}>
						<p>{heading}</p>
					</div>
					<div className={styles.container}>{props.children}
					</div>

					<div className={styles.cardButtondiv}>
						<button type="button" className={styles.cardbutton}>View More</button>
						<button type="button" className={styles.cardbutton}>Message</button>
					</div>
				</div>
				{/*  */}

				{/* </div> */}






			</div>
		)
	}
	export default Createcard

