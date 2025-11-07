import { useState, React } from 'react'
import styles from './signin.module.css'
import { BiSearch } from 'react-icons/bi'

import Test from '../../components/commonBar'
import Createcard from '../../components/createcard'


function Signin() {
	const [files, setFiles] = useState([])
	const [fileAlreadyExist, setFileAlreadyExist] = useState(false)
	const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([])
	const [createEvent, setcreateEvent] = useState(false)
	const [card, setCard] = useState(false)
	const [search, setSearch] = useState(true)
	const removeFile = (filename) => {

		setFiles((prev) => {
			return prev.filter(
				(fl) => {
					return (fl.name !== filename)
				}
			)
		})
	}
	const uploadHandler = (event) => {
		setFileNameAlradyExist([])
		const file = Array.from(event.target.files)

		if (!file) return
		// check if file already exist
		const alreadyIncludedFileNames = files.map((fls) => {
			return fls.name
		})
		file.map((fl) => {
			if (alreadyIncludedFileNames.includes(fl.name)) {
				setFileNameAlradyExist((prev) => { return [...prev, fl.name] })
				setFileAlreadyExist(true)
			} else {
				setFiles((prev) => { return [...prev, fl] })
			}
		})
		console.log('file got')
	}
	const showEvent = () => {
		setSearch(false)
		setcreateEvent(true)
		setCard(false)
	}
	const showCard = () => {
		setSearch(true)
		setCard(true)
		setcreateEvent(false)
	}

	return (
		<Test>
			<div className={styles.childMargin}>
				{
					search && (
						<div className={styles.flexDiv}>
							<div>
								<h3>Events</h3>
								<div style={{ position: "relative" }}><input type="text" className={styles.searchBox} placeholder='Search Event' />
									<BiSearch className={styles.searchIcon} />
								</div>
							</div>
							<div className={styles.btnDiv}>
								<button
									type="button"
									onClick={showEvent}
								className={styles.createBtn}>Create Events</button></div>
						</div>)}
				{
					createEvent && (
						<div className={styles.formDiv}>
							<div className={styles.createEvent}>
								<h3 className={styles.newEventTitle}>New Events</h3>
								<form>
									<div className={styles.flexMain}>
										<div>
											<div className={styles.textLabel}>
												<span htmlFor="Event Title" className={styles.textspan}>Event Title</span>
												<input type="text" className={styles.inputtext} />
												<input type="text" className={styles.textOnlyInput} placeholder="عربى" />
											</div>
											<div className={styles.textLabel}>
												<span htmlFor="Category" className={styles.textspan}>Category</span>
												<input type="text" className={styles.inputtext} />
												<input type="text" className={styles.textOnlyInput} placeholder="عربى" />
											</div>
											<div className={styles.textLabel}>
												<span htmlFor="Budjet" className={styles.textspan}>Budget</span>
												<input type="text" className={styles.inputtext} />
												<input type="text" className={styles.textOnlyInput} placeholder="Location" />
											</div>
											<div className={styles.textLabel}>
												<span htmlFor="Events Date" className={styles.textspan}>Events Date</span>
												<input type="date_select" className={styles.inputtext} />
												<input type="text" className={styles.textOnlyInput} />
											</div>
											<div className={styles.textLabel}>
												<span htmlFor="Documents" className={styles.textspan}>Documents</span>
												<div className={styles.fileDiv}>
													<div className={styles.browseButtonWrap}>
														<input
															type="file"
															className={styles.customFileInput}
														/>
													</div>
												</div>
												<input type="text" className={styles.textOnlyInput} placeholder="Number of Attendees" />
											</div>
										</div>
									</div>
									<div className={styles.buttonFlex}>
										<input type="submit" className={styles.payAndPublish} value="Pay & Publish" onClick={showCard} />
									</div>
								</form>
							</div>
						</div>
					)
				}
				{
					card && (
						<div className={styles.cardDiv}>
							<Createcard heading={"Events"} viewlink={'/eventdetails'}>
								<div className={styles.singleLine}>
									<p className={styles.eventlabel}>
										Category
									</p>
									<p>:</p>
								</div>
								<div className={styles.singleLine}>
									<p>Submission Date </p>
									<p>:</p>
								</div>

							</Createcard>
							<Createcard heading={"Events"} viewlink={'/eventdetails'}>

								<div className={styles.singleLine}>
									<p className={styles.eventlabel}>
										Category
									</p>
									<p>:</p>

								</div>
								<div className={styles.singleLine}>
									<p>Submission Date </p>
									<p>:</p>
								</div>
							</Createcard>
						</div>
					)
				}
			</div>
		</Test>
	)
}
export default Signin;
