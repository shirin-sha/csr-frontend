import styles from './sponsercard.module.css'

const Sponsercard = ({ children }) => {
	// const {heading}=props
	return (
		<div className={styles.sponserCard}>
			<div className={styles.border}>
				<div className={styles.innerDiv}>
					{children}
					<div className={styles.buttonGroup2}>
						<input type="button" value="Confirm" className={styles.viewButton2} />
						<input type="button" value="Edit" className={styles.viewButton2} />
						<input type="button" value="Message" className={styles.viewButton2} />
						<input type="button" value="Delete" className={styles.viewButton2} />

					</div>
				</div>

			</div>

		</div>
	)
}
export default Sponsercard
