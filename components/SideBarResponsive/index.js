import Link from 'next/link'
import { BiMessage } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { MdEventNote } from 'react-icons/md'
import { SiCodeproject } from 'react-icons/si'
import styles from './test.module.css'


function SideBarRes({active,top}){


    return(<>
    	<div style={{ display: 'flex', width: '100%' }}>
				<div className={top?styles.sidebarFlexTop:styles.sidebarFlex}>
					<div className={styles.wrap}>
						<div className={active == 0 ? styles.activeClass : styles.circle}><BsPerson className={styles.icon} /></div>
						<div className={styles.iconTitle}>Profile</div>
					</div>
					<Link href={'/project'}>
						<div className={styles.wrap}>
							<div className={active == 1 ? styles.activeClass : styles.circle}><SiCodeproject className={styles.icon} /></div>
							<div className={styles.iconTitle}>Project</div>
						</div>
					</Link>
					<Link href={'/event'}>
						<div className={styles.wrap}>
							<div className={active == 2 ? styles.activeClass : styles.circle}><MdEventNote className={styles.icon} /></div>
							<div className={styles.iconTitle}>Events</div>
						</div>
					</Link>
					<Link href={'/messages'}>
						<div className={styles.wrap}>
							<div className={active == 3 ? styles.activeClass : styles.circle}><BiMessage className={styles.icon} /></div>
							<div className={styles.iconTitle}>Message</div>
						</div>
					</Link>

				</div>

				{/* <div className={styles.childDiv}>{children}</div> */}

			</div>
    
    </>)
}

export default SideBarRes