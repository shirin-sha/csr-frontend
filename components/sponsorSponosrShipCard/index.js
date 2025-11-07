import styles from './sponsercard.module.css'
const Sponsercard = ({ children }) => {
	// const {heading}=props
	return (
<div className={styles.sponserCard}>
							<div className={styles.border}>
								<div className={styles.innerDiv}>{children}
									

								</div>
							</div>
							
                              
						</div>
    )
}
export default Sponsercard