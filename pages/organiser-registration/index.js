import { React, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm,Controller } from 'react-hook-form'
import PhoneInput,{ formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import checkMarkImg from '../../images/checkMark.png'
import Connect from '../../components/commen/connect/ConnectLayout'
import useDataQuery, { fetcher } from '../../hooks/useDataQuery'
import FileUpload from '../../components/FileExport/FileUpload/FileUpload'
import FileList from '../../components/FileExport/FileList/FileList'
import styles from './register.module.css'
import { usePopUp } from '../../hooks/usePopUp'
import Link from 'next/link'

const RegisterPage = () => {
	const [individualType, setIndividualType] = useState(true) //	true - individual, false - corporate
	const [checkMark1, setCheckMark1] = useState(false)
	const [checkMark2, setCheckMark2] = useState(false)
	const [files, setFiles] = useState([])
	const [fileAlreadyExist, setFileAlreadyExist] = useState(false)
	const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([])
	const [error, setError] = useState(null)
	const [phonenumber,setPhoneNumber]=useState()
	const [phonenumber1,setPhoneNumber1]=useState()
	const [categorydata, err] = useDataQuery({
		key: "/public/get-categories",
		data: {},
	});
	console.log("categorydata ", categorydata);
	const categories = categorydata?.data?.categories
	console.log({ categories });
	const [showPopup, hidePopup] = usePopUp()
	const {
		register, handleSubmit, formState: { errors, isSubmitted }, getValues, trigger, reset,control
	} = useForm()
	const {
		register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2, isSubmitted: isSubmitted2 }, getValues: getValues2, trigger: trigger2, reset: reset2,control:control2,
	} = useForm()

	const removeFile = (filename) => {
		// let updatedFiles=files.filter((file) => { return (file.name !== filename) })
		// setFiles(files.filter((file) => { return (file.name !== filename) }))
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
		// console.log('fileeee')
		// console.log(file)
		// console.log(file.Filelist)

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
	const toggleCheck1 = () => {
		setCheckMark1((prev) => { return (!prev) })
	}
	const toggleCheck2 = () => {
		setCheckMark2((prev) => { return (!prev) })
	}
	const [errorStatus, setErrorStatus] = useState(false)
	const [activationStatus, setActivationStatus] = useState(false)
	const [successStatus, setSuccessStatus] = useState(false)
	const router = useRouter()
	const printErrors = () => {
		const errorTxt = []
		//	checkmark validation
		if (!checkMark1 && isSubmitted) {
			errorTxt.push('Please accept terms & conditions')
		}

		return errorTxt
	}
	const CoperateErrors = () => {
		const errorTxt = []
		if (!checkMark2 && isSubmitted2) {
			errorTxt.push('Please accept terms & conditions')
		}

		return errorTxt
	}
	const [mail, setMail] = useState('')
	const individualFormSubmit = async (values) => {
		console.log({ values });
		// new
		const individualData=new FormData()
		individualData.append('first_name',values.first_name)
		individualData.append('last_name',values.last_name)
		individualData.append('email',values.email)
		individualData.append('mobile',values.mobile)
		individualData.append('password',values.password)
		individualData.append('re_password',values.re_password)
		individualData.append('type',0)
		
		// 
		if (checkMark1 && getValues('password') === getValues('re_password')) {
			console.log('form submit')
			const individualmail = getValues('email')
			setMail(individualmail)
			const data = await fetcher({ key: '/organizer/register', data:  individualData })
			console.log('data', data)
			if (data && data.data.success === true) {
				console.log('succ', data)
				showPopup({
					transparent: true,
					showClose: true,
					heading: 'Registration Successful',
					customContent: <> Your user account has been created ,</>,
					pointFinger: true,
					message: <><p>An email has been sent to you.<br/>Please click on the link in the email then your user account will be activated</p></> ,
					gotoEmailAction: () => { console.log("gotoEmailAction"); hidePopup() },
					resendEmailAction: () => { console.log("resendEmailAction"); hidePopup() },
				})
				reset();
				setError(null)
			} else {
				console.log('succ', data.message)
				setError(data.data.message)
			}
		}
	}
	const corporateFormSubmit = async (values) => {
		console.log({ values })
		const contactMail = getValues2('email')
		console.log('contactMail', contactMail)
		setMail(contactMail)
		console.log('mail', mail)
		const coporateData = new FormData()
		coporateData.append('company_name', values.company_name)
		coporateData.append('contact_person_name', values.contact_person_name)
		coporateData.append('email', values.email)
		coporateData.append('address', values.address)
		coporateData.append('mobile', values.mobile)
		coporateData.append('password', values.password)
		coporateData.append('re_password', values.re_password)
		coporateData.append('type', 1)
		coporateData.append("interested_categories", values.interested_categories);
		files.forEach((docs) => {
			console.log({ docs });
			coporateData.append('documents', docs)
		})
		console.log('form data :', ...coporateData)

		try {
			if (checkMark2 && files.length !== 0 && getValues2('password') === getValues2('re_password')) {
				console.log('corporate')
				const data = await fetcher({ key: '/organizer/register', data: coporateData })
				// const formData = new FormData()
				// formData.append('file', data.file[0])
				console.log('fetchdata', data)
				if (data && data.data.success === true) {
					console.log(data)
					showPopup({
						transparent: true,
						showClose: true,
						heading: 'Registration Successful',
						customContent: <> Your user account has been created ,</>,
						pointFinger: true,
						message: <><p>An email has been sent to you.<br/>Please click on the link in the email then your user account will be activated</p></>,
						gotoEmailAction: () => { console.log("gotoEmailAction"); hidePopup() },
						resendEmailAction: () => { console.log("resendEmailAction"); hidePopup() },
					})
					reset2()
					setError(null)
					setPhoneNumber('')
				} else {
					setError(data.data.message)
				}
			}
		}
		catch (e) {
			console.log('error :', { e });
			showPopup({
				transparent: true,
				showClose: true,
				ThumbDown: true,
				heading: 'CError !',
				customContent: <>{e.message}</>
			})
		}

	}
	// instead of react forms, should be changed
	return (
		<div>
			<Connect>
				<div className={styles.section2}>
					<div className={styles.hybridForm}>
						<div style={{ padding: '20px',textAlign:'center' }}><h3>Register As Event Organizer </h3></div>
						<div className={styles.tabType}>
							<div
								className={styles.tabTypeIndividual}
								style={
									{
										backgroundColor: individualType ? '#9E8959' : '#D9D9D9',
										color: individualType ? '#fff' : '#000'
									}
								}
								onClick={() => { reset(); setError(null); setIndividualType(true) }}
								onKeyDown={() => { setIndividualType(true) }}
								tabIndex={0}
								role="button"
							>
								Individual
							</div>
							<div
								className={styles.tabTypeCorporate}
								style={
									{
										backgroundColor: !individualType ? '#9E8959' : '#D9D9D9',
										color: !individualType ? '#fff' : '#000'
									}
								}
								onClick={() => { reset(); setError(null); setIndividualType(false) }}
								onKeyDown={() => { setIndividualType(false) }}
								tabIndex={0}
								role="button"
							>
								Corporate
							</div>

						</div>
						{
							individualType && (
								<div className={styles.individualForm}>

									<form name="individualFormEntry" className={styles.individualFormEntry} onSubmit={handleSubmit(individualFormSubmit)}>
										<div className={styles.formContent1}>
											<div className={styles.formContentFlex1}>
												<div className={styles.formContentWrapDiv1}>
													<span htmlFor="first_name">
														First Name
													</span>
													<div className={styles.validateMessage}>
														<input type="text" id="first_name" {...register("first_name", { required: true, minLength:3})} onKeyUp={() => { trigger('first_name') }} />
														{errors.first_name && errors.first_name.type==='required' &&(<small className={styles.errorMessage}>Name is Required</small>)}
														{errors.first_name && errors.first_name.type==='minLength' && (
                            <small className={styles.errorMessage}>
                              You must provide at least 3 characters
                            </small>
                          )}

													</div>
												</div>
												<div className={styles.formContentWrapDiv2}>
													<span htmlFor="last_name">Last Name</span>
													<div className={styles.validateMessage}>
														<input type="text" name="last_name" {...register("last_name", { required: true })} onKeyUp={() => { trigger('last_name') }} />
														{errors.last_name && (<small className={styles.errorMessage}>LastName is Required</small>)}
													</div></div>
												<div className={styles.formContentWrapDiv1}>
													<span htmlFor="email">Email</span>
													<div className={styles.validateMessage}>
														<input type="email" name="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} onKeyUp={() => { trigger('email') }} />
														{errors.email && (<small className={styles.errorMessage}>Invalid Email</small>)}
													</div></div>
												<div className={styles.formContentWrapDiv2}>
													<span htmlFor="mobile">Mobile</span>
													<div className={styles.validateMessage}>
													<Controller
                            control={control}
                            name="mobile"
							rules={{ required: true }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                              fieldState: {
                                invalid,
                                isTouched,
                                isDirty,
                                error,
                              },
                              formState,
                            }) => (
                              <PhoneInput
							  
                                international
                                defaultCountry="KW"
                                value={value}
                                onChange={onChange}
                                error={
                                  phonenumber
                                    ? isValidPhoneNumber(phonenumber)
                                      ? undefined
                                      : "Invalid phone number"
                                    : "Phone number required"
                                }
                                
                              />
                            )}
                          />
						   {errors.mobile && (
                            <small className={styles.errorMessage}>
                             Mobile number is required
                            </small>
                          )}
													{/* <PhoneInput
                           
						//    className={styles.companytext}

						   international defaultCountry="KW"  value={phonenumber1} onChange={setPhoneNumber1}
						   
						   error={phonenumber1 ? (isValidPhoneNumber(phonenumber1) ? undefined : 'Invalid phone number') : 'Phone number required'}
						   onKeyUp={() => {
							 trigger2("mobile");
						   }}
						 /> */}
														{/* <input type="text" name="mobile" {...register("mobile", { required: true, pattern: /^[0-9]{10}$/i })} onKeyUp={() => { trigger('mobile') }} /> */}
														{/* {errors.mobile && (<small className={styles.errorMessage}>Invalid Number</small>)} */}
														{/* {errors.mobile?.type === 'required' && (
															<small className={styles.errorMessage}>
																Mobile number is required
															</small>
														)}
														{errors.mobile?.type === 'pattern' && (
															<small className={styles.errorMessage}>
																Enter valid mobile number
															</small>
														)} */}
													</div></div>
												<div className={styles.formContentWrapDiv1}>
													<span htmlFor="password">Password</span>

													<div className={styles.validateMessage}>
														<input type="password" name="password"
															{...register("password", { required: true,minLength:6 })} onKeyUp={() => { trigger('password') }} />

														{errors.password && errors.password.type ==='required'&&(<small className={styles.errorMessage}>Enter Password</small>)}
														{errors.password && errors.password.type==='minLength' && (
                            <small className={styles.errorMessage}>
                               length  must atleast 6 charactor
                            </small>
                          )}
													</div>
												</div>
												<div className={styles.formContentWrapDiv2}>
													<span htmlFor="re_password">Confirm Password</span>
													<div className={styles.validateMessage}>
														<input type="password" name="re_password"
															{...register("re_password", { required: true },

															)} onKeyUp={() => { trigger('re_password') }} />
														{getValues('re_password') && (getValues('password') !== getValues('re_password') && (<small className={styles.errorMessage}>Password Not Match</small>))}
													</div>
												</div>

												<div className={styles.formContentWrapDiv2}>
													<div className={styles.validateMessage}>
														<span htmlFor="interested_categories">Interested Category</span>
														<select className={styles.categoryinput} name="interested_categories"
															{...register("interested_categories", { required: true })}
															onKeyUp={() => {
																trigger("interested_categories");
															}} >
															<option value="" disabled selected>Select Category</option>
															{
																categories?.map((cat) => {
																	return (<option key={cat._id} value={cat._id}>{cat.name}</option>)

																})
															}
														</select>
														{errors.interested_categories && (<small className={styles.errorMessage}>Select Category</small>)}
													</div>
												</div>

											</div>

										</div>
										<div className={styles.accept}>
											{/* <input required type="checkbox" /> */}
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
													<a> <span>
														Terms & Condition
													</span></a></Link>
											</p>
										</div>
										{errors && (
											<p className={styles.individualFormErrorMessage}>
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
										<input type="submit" className={styles.payAndPublish} value="Register" />
										{<div className={styles.errorMessageSubmit}> <span>{error}</span></div>}
										<div className={styles.already}>
											<p>
												Already have an Account?
												{' '}
												<span
													onClick={() => { router.push('/login') }}
													onKeyDown={() => { router.push('/login') }}
													role="button"
													tabIndex={0}
												>
													Sign in
												</span>
												{' '}
											</p>
										</div>
									</form>
								</div>
							)
						}
						{
							!individualType && (
								<div className={styles.corporateForm}>
									{/* {errors && (
										<p className={styles.individualFormErrorMessage}>
											{CoperateErrors().map((er) => {
												return (
													<div>
														{er}
														<br />
													</div>
												)
											})}
										</p>
									)} */}
									<form
										name="corportateFormEntry"
										className={styles.corportateFormEntry}
										onSubmit={handleSubmit2(corporateFormSubmit)}
									>
										<div className={styles.formContent2}>
											{/* <div className={styles.contactmain}>
													<div></div>
													<div className={styles.contactpersontitle}><p>Contact Person</p></div>
													</div> */}
											<div className={styles.mainflex}>

												<div className={styles.companySec}>

													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span htmlFor="companyName" className={styles.textspan}>Company Name</span>

															<input type="text" className={styles.companytext} name="company_name" {...register2("company_name", { required: true,minLength:3 })} onKeyUp={() => { trigger2('company_name') }} />
															{errors2.company_name && errors2.company_name.type==='required' &&(<small className={styles.errorMessage}>Name is Required</small>)}
															{errors2.company_name && errors2.company_name.type==='minLength' && (
                            <small className={styles.errorMessage}>
                              You must provide at least 3 characters
                            </small>
                          )}
														</div></div>
													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span htmlFor="address" className={styles.textspan}>Address</span>

															<input className={styles.companytext} name="address" {...register2("address", { required: true,minLength:5 })} onKeyUp={() => { trigger2('address') }} />
															{errors2.address && errors2.address.type==='required'&&  (<small className={styles.errorMessage}>Address is Required</small>)}
															{errors2.address && errors2.address.type==='minLength' && (<small className={styles.errorMessage}>You must provide at least 5 characters</small>)}

														</div></div>
													<div className={styles.textandlabel}>
														<span htmlFor="documents" className={styles.textspan}>Document</span>
														<div className={styles.companySecValidate}>
															<div className={styles.fileSelection}>
																<FileUpload
																	files={files}
																	setFiles={setFiles}
																	removeFile={removeFile}
																	uploadHandler={uploadHandler}
																/>
																<FileList files={files} removeFile={removeFile} {...register2("file")} />
															</div>
															{files.length === 0 && isSubmitted2 && (<small className={styles.errorMessage}>Files is required </small>)}</div>
													</div>
												</div>
												<h5 style={{ 'alignSelf': 'start', 'marginTop': '10px', marginBottom: '10px' }} className={styles.contactPeson}>Contact Person</h5>

												<div className={styles.companySec}>
													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span className={styles.textspan}>Name</span>

															<input
																type="text" className={styles.companytext}

																name="contact_person_name"
																{...register2("contact_person_name", { required: true,minLength:3 })} onKeyUp={() => { trigger2('contact_person_name') }} />
															{errors2.contact_person_name && errors2.contact_person_name.type==='required' && (<small className={styles.errorMessage}>Name is Required</small>)}
															{errors2.contact_person_name && errors2.contact_person_name.type==='minLength' && (
                            <small className={styles.errorMessage}>
                              You must provide at least 3 characters
                            </small>
                          )}
														</div>
													</div>

													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span className={styles.textspan}>Email</span>
															<input
																type="text"
																className={styles.companytext}
																name="email"
																{...register2("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} onKeyUp={() => { trigger2('email') }} />
															{errors2.email && (<small className={styles.errorMessage}>Email Required</small>)}
														</div>
													</div>

													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span className={styles.textspan}>Phone Number</span>
															<Controller
                            control={control2}
                            name="mobile"
							rules={{ required: true }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                              fieldState: {
                                invalid,
                                isTouched,
                                isDirty,
                                error,
                              },
                              formState,
                            }) => (
                              <PhoneInput
							  className={styles.companytext}
                                international
                                defaultCountry="KW"
                                value={value}
                                onChange={onChange}
                                error={
                                  phonenumber
                                    ? isValidPhoneNumber(phonenumber)
                                      ? undefined
                                      : "Invalid phone number"
                                    : "Phone number required"
                                }
                                
                              />
                            )}
                          />
						   {errors.mobile && (
                            <small className={styles.errorMessage}>
                             Mobile number is required
                            </small>
                          )}
															{/* <PhoneInput
                           
                            className={styles.companytext}

                            international defaultCountry="KW" value={phonenumber} onChange={setPhoneNumber}
                            
                            error={phonenumber ? (isValidPhoneNumber(phonenumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                            onKeyUp={() => {
                              trigger2("mobile");
                            }}
                          /> */}
															{/* <input type="text" className={styles.companytext} name="mobile" {...register2("mobile", { required: true, pattern: /^[0-9]{10}$/i })} onKeyUp={() => { trigger2('mobile') }} /> */}
															{/* {errors2.mobile && (<small className={styles.errorMessage}>Mobile Number Required</small>)} */}
															{/* {errors2.mobile?.type === 'required' && (
																<small className={styles.errorMessage}>
																	Mobile number is required
																</small>
															)}
															{errors2.mobile?.type === 'pattern' && (
																<small className={styles.errorMessage}>
																	Enter valid mobile number
																</small>
															)} */}
														</div>
													</div>
													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span htmlFor="Category" className={styles.textspan}>
																Interested Category
															</span>
															<select
																className={styles.categoryinput}
																placeholder="Select Category"
																name="category"
																{...register2("interested_categories", { required: true })}
																onKeyUp={() => {
																	trigger2("interested_categories");
																}}
															><option value="" disabled selected>Select Category</option>
																{
																	categories?.map((cat) => {
																		return (<option key={cat._id} value={cat._id}>{cat.name}</option>)

																	})
																}
															</select>
															{errors2.interested_categories && (
																<small className={styles.errorMessage}>
																	Select Category
																</small>
															)}
														</div>
													</div>

												</div>
												<div className={styles.companySec}>
													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span className={styles.textspan}>Password</span>
															<input type="password" className={styles.companytext} name="password" {...register2("password", { required: true,minLength:6 })} onKeyUp={() => { trigger2('password') }} />
															{errors2.password && errors2.password.type==='required' && (<small className={styles.errorMessage}>Password Required</small>)}
															{errors2.password && errors2.password.type==='minLength' && (
                            <small className={styles.errorMessage}>
                               length  must atleast 6 charactor
                            </small>
                          )}
														</div>
													</div>

													<div className={styles.textandlabel}>
														<div className={styles.companySecValidate}>
															<span className={styles.textspan}>Confirm Password</span>
															<input type="password" className={styles.companytext} name="re_password" {...register2("re_password", { required: true })} onKeyUp={() => { trigger2('re_password') }} />
															{getValues2('re_password') && (getValues2('password') !== getValues2('re_password') && (<small className={styles.errorMessage}>Password Not Match</small>))}

														</div>
													</div>

												</div>
											</div>
											{/* dsfdgf */}
											{/* <div>

											</div> */}
										</div>
										<div className={styles.accept}>
											{/* <input required type="checkbox" /> */}
											<div
												className={styles.checkBox}
												onClick={() => { toggleCheck2() }}
												onKeyDown={() => { toggleCheck2() }}
												role="button"
												tabIndex={0}
											>
												{checkMark2 && (<Image src={checkMarkImg} width="10" height="10" />)}

											</div>
											<p>
												I do accept the
												<Link href="/terms&condition">
													<a> <span>
														Terms & Condition
													</span></a></Link>
											</p>
										</div>
										{errors2 && (
											<p className={styles.individualFormErrorMessage}>
												{CoperateErrors().map((er) => {
													return (
														<div className={styles.condition}>
															{er}
															<br />
														</div>
													)
												})}
											</p>
										)}
										<input type="submit" className={styles.payAndPublish} value="Register" />
										{error && <div className={styles.errorMessageSubmit}> <span>{error}</span></div>}
										<div className={styles.already}>
											<p>
												Already have an Account?
												<span
													onClick={() => { router.push('/login') }}
													onKeyDown={() => { router.push('/login') }}
													role="button"
													tabIndex={0}
												>
													Sign in
												</span>
											</p>
										</div>
									</form>
								</div>
							)
						}
					</div>
				</div>

			</Connect>



		</div>

	)
}
export default RegisterPage


