import React from 'react'
import styles from './eventdetail.module.css'

import Bar from '../../components/commonBar'
const Eventdetail = () => {
	return (
		<Bar>
			<div className={styles.eventDetails}>
				<h3 className={styles.eventTitle}>Event Details</h3>
				<h3 className={styles.eventName}>Event Name</h3>
				<div className={styles.innerDiv}>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Categary</p>
						<p>:</p>
						<p className={styles.spanContent}>Environment</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Budjet</p>
						<p>:</p>
						<p className={styles.spanContent}>20,000 KWD</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Location Name</p>
						<p>:</p>
						<p className={styles.spanContent}>2Hotel Sherton</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Start date</p>
						<p>:</p>
						<p className={styles.spanContent}>22/12/2019</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Submission Date</p>
						<p>:</p>
						<p className={styles.spanContent}>2/12/2019</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Number of Quotation</p>
						<p>:</p>
						<p className={styles.spanContent}>4</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>View</p>
						<p>:</p>
						<p className={styles.spanContent}>10</p>
					</div>
					<div className={styles.singleLineFlex}>
						<p className={styles.labelDiv}>Documents</p>
						<div className={styles.documentSection}>
						<p>:</p>
							<div className={styles.documentButton}>
								
								<p className={styles.docList}>Document Name 1</p>
								<input type="button" value='View' className={styles.viewButton}/>
							</div>
						</div>
					</div>
					<div className={styles.viewQuatation}><button className={styles.quatationBtn}>View Quotation</button></div>
				</div>
			</div>
		</Bar>
	)
}
export default Eventdetail
