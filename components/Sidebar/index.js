import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { SiCodeproject } from 'react-icons/si'
import { MdEventNote } from 'react-icons/md'
import { BiMessage } from 'react-icons/bi'
import styles from './sidebar.module.css'
import { useState } from 'react'

function Sidebar() {
	return (
		<div>
			<div className={styles.sidebarFlex}>
				<div className={styles.wrap} >
					<div className={styles.circle}><BsPerson className={styles.icon} /></div>
					<div className={styles.iconTitle}>Profile</div>
				</div>
				<div className={styles.wrap}>
					<div className={styles.circle}><SiCodeproject className={styles.icon} /><p>Project</p></div>
					<div className={styles.iconTitle}>Project</div>
				</div>
				<div className={styles.wrap}>
					<div className={styles.circle}><MdEventNote className={styles.icon} /></div>
					<div className={styles.iconTitle}>Events</div>
				</div>
				<div className={styles.wrap}>
					<div className={styles.circle} ><BiMessage className={styles.icon} /></div>
					<div className={styles.iconTitle}>Message</div>
				</div>
			</div>
		</div>
	)
}
export default Sidebar
