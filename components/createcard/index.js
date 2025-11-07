import Link from 'next/link'
import React from 'react'
import styles from './createcard.module.css'

const Createcard = (props) => {
	console.log(props)
	const { heading } = props
	const { viewlink } = props
	console.log({viewlink})
	console.log(heading)
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
					<Link href={viewlink}>
						<button type="button" className={styles.cardbutton}>View More</button>

					</Link>
					<button type="button" className={styles.cardbutton}>Message</button>
				</div>
			</div>
			{/*  */}

			{/* </div> */}

		</div>
	)
}
export default Createcard

