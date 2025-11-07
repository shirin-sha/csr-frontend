import { useState, React, Fragment, useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";

import FileUpload from '../FileExport/FileUpload/FileUpload'
import FileList from '../FileExport/FileList/FileList'
import styles from './addproject.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from '../../store/context';
import useDataQuery, { fetcher } from '../../hooks/useDataQuery';
import Link from 'next/link';
import Image from 'next/image'
import checkMarkImg from '../../images/checkMark.png'
import axios from 'axios';
import { searchClient } from '../../helperFuctions/database';
function AddProject({ setProjects, setOpenPopup, openPopup, mutate, setSearchQuery }) {
	const [files, setFiles] = useState([])
	const [fileAlreadyExist, setFileAlreadyExist] = useState(false)
	const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([])

	const [budget, setBudget] = useState()
	const [submitErr, setSubmitErr] = useState(null)

	const userData = useContext(AuthContext).userData
	const user = userData.userType

	console.log('userdata :', userData);
	console.log('budget', budget);

	const [selectedImage, setSelectedImage] = useState(null);

	console.log("selectedImage", selectedImage)
	const [catcherrMsg, setCatchErrMsg] = useState()
	const [checkMark1, setCheckMark1] = useState(false)
	const [submitted, setSubmitted] = useState(false);


	//react form
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors: V_errors, isSubmitting, isSubmitted },
		getValues,
		trigger, watch, resetField, reset,
	} = useForm();

	const form = useForm();

	const printErrors = () => {
		const errorTxt = []
		// 	//	checkmark validation
		if (!checkMark1 && isSubmitted) {
			errorTxt.push('Please accept terms & conditions')
		}

		return errorTxt
	}
	const toggleCheck1 = () => {
		setCheckMark1((prev) => { return (!prev) })
	}


	//remove file function
	const removeFile = (filename) => {
		setFiles((prev) => {
			return prev.filter(
				(fl) => {
					return (fl.name !== filename)
				}
			)
		})
	}



	console.log("///", V_errors)
	//upload file function
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
	let userUrl = ''
	if (user == 1) {
		userUrl = 'applicant'

	} else if (user == 2) {
		userUrl = 'organizer'

	}
	//get categories
	const [categorydata, errors] = useDataQuery({
		key: "/public/get-categories",
		data: {},
	});
	console.log("categorydata ", categorydata);
	const categories = categorydata?.data?.categories
	// console.log({ categories });

	//project submit
	const projectFormSubmit = async (values) => {
		console.log("project submitted");
		//	await searchClient.clearCache()
		if (checkMark1 && files.length !== 0) {

			console.log("values", values, { selectedImage });
			const addProjectData = new FormData();
			console.log("added files :", { files });

			addProjectData.append("project_name", values.project_name);
			addProjectData.append("project_name_ar", values.project_name_ar);
			addProjectData.append("category", values.category);
			addProjectData.append("budget", values.budget);
			addProjectData.append("fees", values.fees);
			addProjectData.append('img', selectedImage)


			const urlIMage = selectedImage && await URL.createObjectURL(selectedImage)


			console.log('selected image', urlIMage);
			files.map((docs) => {
				console.log({ docs });
				addProjectData.append("documents", docs);
			});
			console.log("form data :", { ...addProjectData })

			try {

				console.log('submitted');
				const data = await fetcher({
					key: `/${userUrl}/add-project`,
					data: addProjectData,
					header: { headers: { token: userData.token } }
				});
				console.log("fetchdata", data);
				if (data.data && data.data.success === true) {
					const index = searchClient.initIndex('projects')

					console.log(data);
					mutate(`/${userUrl}/list-projects`, addProjectData, false)
					reset()
					setBudget(0)
					setOpenPopup(false)
					const project = data.data.data
					const category = categories.find((x) => {
						return x._id == project.category[0]
					})

					const newProject = {
						name: project.name,
						status: project.status,
						objectID: project._id,
						submission_date: project.submission_date,
						category: [category],
						budget: project.budget,
						img: urlIMage,
						temp: true
					}
					setProjects(prj => [newProject, ...prj])
					setSearchQuery('')
				} else {
					setSubmitErr(data.data.message)

				}
			} catch (e) {
				setSubmitErr(e.message)

			}
		}

	};







	return (
		<div className={styles.modalWRapper}>

			<div className={styles.formDiv}>

				<div className={styles.createEvent}>
					<div onClick={() => setOpenPopup(!openPopup)} className={styles.close}><AiOutlineClose /></div>
					<h3 className={styles.newEventTitle}>New Project</h3>
					<form onSubmit={handleSubmit(projectFormSubmit)} className={styles.spacing}>
						<div className={styles.flexMain}>


							<div className={styles.textLabel}>
								<span htmlFor="Event Title" className={styles.textspan}>Project Name</span>
								<input {...register("project_name", {
									required: {
										value: true,
										message: "Missing your project name"
									}, minLength: {
										value: 3,
										message: "Project name must be at least 3 characters"
									}, maxLength: {
										value: 15,
										message: "Project name should not exceed 15 characters"
									},
								})} type="text" className={styles.inputtext} />

								{V_errors.project_name && (<small className={styles.errorMessage}>{V_errors.project_name.message} </small>)}

							</div>
							<div className={styles.textLabel}>
								<span className={styles.textspan}>اسم المشروع</span>

								<input {...register("project_name_ar", {
									// required: {
									// 	value: false,
									// 	message: "Missing your arabic project name"
									// },
									validate: {
										isArabic: value => {
											if (value && !/^[\u0621-\u064A\u0660-\u0669 ]+$/.test(value)) {
												return "Arabic values only allowed";
											}
											return true;
											// var isArabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
											// if (isArabic.test(value)) {
											// 	return true;
											// } else {
											// 	return false;
											// }
										},
									},
									minLength: { value: 3, message: "Project name arabic must be at least 3 characters" },
									maxLength: { value: 15, message: "Project name arabic should not exceed 15 characters" },
								})} type="text" className={styles.inputtext} />
								{/* {V_errors.project_name_ar && (<small className={styles.errorMessage}>{V_errors.project_name_ar.message} </small>)} */}
								{/* {V_errors.project_name_ar && V_errors.project_name_ar.type == "isArabic" && (<small className={styles.errorMessage}>{V_errors.project_name_ar.message} </small>)} */}
								{V_errors.project_name_ar && V_errors.project_name_ar.message && (
									<small className={styles.errorMessage}>{V_errors.project_name_ar.message}</small>
								)}
							</div>
							<div className={styles.textLabel}>
								<span htmlFor="Category" className={styles.textspan}>Category</span>
								<select
									className={styles.inputtextSelect}

									name="category"
									{...register("category")}

								>
									<option value="63ecbf9f7cd9fd406c074884" key="">select a category</option>
									{
										categories?.map((cat) => {
											return (<option key={cat._id} value={cat._id}>{cat.name}</option>)

										})
									}
								</select>
								{/* {V_errors.category && (<small className={styles.errorMessage}>Missing your Category </small>)} */}

							</div>
							<div className={styles.textLabel}>
								<span htmlFor="Budget" className={styles.textspan}>Required Budget</span>

								<input type="number" {...register("budget", {
									required: {
										value: true,
										message: "Missing your Budget"
									},
									min: {
										value: 3,
										message: "Non zero value should be given"
									},
									onChange: ((e) => {
										console.log('on change..');
										// setBudget(Number())
										// value={}
										setValue('fees', parseInt(100 + (e.target.value / 10)))
									})

								})}

									className={styles.inputtext} />
								{V_errors.budget && (<small className={styles.errorMessage}>{V_errors.budget.message} </small>)}

							</div>




							<div className={styles.textLabel}>
								<span className={styles.textspan}>Service Fees</span>


								<input name='fees' {...register("fees", { required: true })} type="number" readOnly className={styles.inputtext} />

							</div>


							<div className={styles.textLabel}>
								<span htmlFor="Documents" className={styles.textspan}>Documents</span>

								<div className={styles.fileDiv}>
									<FileUpload
										files={files}
										setFiles={setFiles}
										removeFile={removeFile}
										uploadHandler={uploadHandler}
									/>
									<FileList files={files} removeFile={removeFile} />
								</div>
								{files.length === 0 && isSubmitted && (<small className={styles.errorMessage}>Files is required </small>)}
							</div>
							<div className={styles.textLabel}>
								<span className={styles.textspan}>Upload Image</span>
								{/* <div className={styles.tooltip}> */}
								<div className={styles.fileDiv}>
									<div className={styles.browseButtonWrap}>
										<input type='file' name="img" style={{ marginLeft: "-86px", width: "293px" }} className={styles.customFileInput} placeholder='Upload image'
											accept=".png, .jpg, .jpeg"


											// lessThan10MB: (files) => files[0]?.size < 30000 || "Max 30kb"}}
											onChange={(event) => {
												console.log(event.target.files[0]);


												setSelectedImage(event.target.files[0]);
											}
											} /></div></div>

								{/* {(selectedImage === null) && isSubmitted && (
									<small className={styles.errorMessage}>Image is required </small>

								)} */}


								{/* {V_errors.img && (<small className={styles.errorMessage}>upload image </small>)} */}

							</div>
						</div>
						<div className={styles.accept}>

							<div
								className={styles.checkBox}
								onClick={() => { toggleCheck1() }}
								onKeyDown={() => { toggleCheck1() }}
								role="button"
								tabIndex={0}

							>
								{checkMark1 && (
									<Image src={checkMarkImg} width="10" height="10" />
								)}

							</div>
							<p>
								I do accept the
								<Link href="/terms&condition">
									<a>
										<span>
											Terms & Condition
										</span>
									</a>
								</Link>
							</p>


							{/* <div
								className={styles.checkBox}
								onClick={() => { toggleCheck1() }}
								onKeyDown={() => { toggleCheck1() }}
								role="button"
								tabIndex={0}

							>
								{checkMark1 && (
									<Image src={checkMarkImg} width="10" height="10" />
								)}

							</div>
							<p>
								I do accept the
								<Link href="/terms&condition">
									<a>
										<span>
											Terms & Condition
										</span>
									</a>
								</Link>
							</p> */}

						</div>

						{V_errors && (
							<p className={styles.acceptError}>
								{printErrors().map((er) => {
									return (
										<div className={styles.condition}>
											{er}
											<br />
										</div>
									)
								})}
							</p>
						)}


						<div className={styles.buttonFlex}>
							<input type="submit" disabled={isSubmitting} name="myButton" className={styles.payAndPublish} value="Pay & Publish" />
							{submitErr && (<small className={styles.errorMessageSubmit}>{submitErr}</small>)}

						</div>
					</form>
				</div>
			</div>

		</div>
	)
}
export default AddProject
