import React from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../components/commonBar'
import styles from './sponsorProjects.module.css'
import Card from '../../components/projectCardSp'

function SponsorProjectListPage() {
	return (
		<div>
			{/* <Sidebar> */}
			<div className={styles.pageContainer}>
				<div className={styles.categoryContainer}>
					<span className={styles.categoryTitle}>Categories</span>
					<div className={styles.categories}>
						<ul className={styles.inputList}>
							<li className={styles.list}>
								<label className={styles.container}>
									One
									<input type="checkbox" />
									<span className={styles.checkmark} />
								</label>
							</li>
							<li className={styles.list}>
								<label className={styles.container}>
									Second
									<input type="checkbox" />
									<span className={styles.checkmark} />
								</label>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.leftPadder} />
				<div className={styles.RightContainer}>
					
					<div className={styles.topBar}>
						<button className={styles.button}> Active</button>
						<button className={styles.button}> Queue</button>
						<input className={styles.search} type="text" placeholder="search..." />
						<button className={`${styles.button}  ${styles.myProjectButton}`}>My Projects</button>
					</div>
					<div className={styles.cardContainer}>
						<Card  heading="Project Name" >
							<p>Category :</p> <br/>
							<p>Budjet   :</p> <br/>
							<p>Status   :</p> <br/>
							<p>Submission Date  :</p> <br/>

						</Card>
						<Card heading="Project Name" >
							<p>Category : Sports</p> <br/>
							<p>Budget   : 2000</p> <br/>
							<p>Status   : Active</p> <br/>
							<p>Submission Date  :15/3/2022</p> <br/>

						</Card>
						<Card  heading="Project Name" >
							<p>Category :aaaaa</p> <br/>
							<p>Budjet   :11111</p> <br/>
							<p>Status   :Active</p> <br/>
							<p>Submission Date  :11/2/2022</p> <br/>
						</Card>
					</div>
				</div>
			</div>
			{/* </Sidebar> */}
		</div>
	)
}

export default SponsorProjectListPage
