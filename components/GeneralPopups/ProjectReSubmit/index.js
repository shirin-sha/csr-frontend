import React from 'react'
import styles from './projectresubmit.module.css'

function ProjectReSubmit(props) {
	return (
		<div className={styles.mailPopup}>
			<p className={styles.activationLink}>Hi {props.username}, <br /> {props.content}</p>
			<button className={styles.okayBtn}>SUBMIT</button>
		</div>
	)
}
export default ProjectReSubmit
