import { React, useState, useContext } from "react";
import DateSelector from "../dateSelector";
import { useForm } from "react-hook-form";
import { fetcher } from "../../hooks/useDataQuery";
import styles from "./formstyle.module.css";
import FileUpload from "../FileExport/FileUpload/FileUpload";
import FileList from "../FileExport/FileList/FileList";
import { AiOutlineClose } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { AuthContext } from '../../store/context'
import useDataQuery from "../../hooks/useDataQuery"
import * as dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image'
import checkMarkImg from '../../images/checkMark.png'
// import useDataQuery, { fetcher } from '../../hooks/useDataQuery'

function FormComponent({ setEvents, setOpenPopup, openPopup, mutate, setSearchQuery }) {
  const [date, setDate] = useState();
  const [todate, setTodate] = useState();
  const [files, setFiles] = useState([]);
  const [fileAlreadyExist, setFileAlreadyExist] = useState(false);
  const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([]);
  const { userData, setUserData } = useContext(AuthContext)
  const user = userData.userType
  const [filterValue, setFilterValue] = useState('all')
  const [budget, setBudget] = useState()
  const [fees, setFees] = useState()
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("event selectedImage", selectedImage)

  const [fileError, setFileError] = useState(false)
  const [catcherrMsg, setCatchErrMsg] = useState()
  const [checkMark1, setCheckMark1] = useState(false)

  const toggleCheck1 = () => {
		setCheckMark1((prev) => { return (!prev) })
	}
  const printErrors = () => {
		const errorTxt = []
		// 	//	checkmark validation
		if (!checkMark1 && isSubmitted) {
			errorTxt.push('Please accept terms & conditions')
		}


		return errorTxt
	}
  let userUrl = ''
  let queryData = {}
  if (user == 1) {
    userUrl = 'applicant'
    queryData = {}
  } else if (user == 3) {
    userUrl = 'sponsor'
    queryData = {}
  }
  

  console.log('userData :', userData);
 
  const date1 = dayjs('2021-03-15');
  const date2 = dayjs('2021-03-14');
  const diff = date2.diff(date1, 'day', true);
 

  const {
    register, handleSubmit, formState: { errors, isSubmitted, isSubmitting }, getValues, trigger
  } = useForm();
  const [categorydata, error] = useDataQuery({
    key: "/public/get-categories"
  });
  console.log("categorydata ", categorydata);
  const categories = categorydata?.data?.categories
  console.log({ categories });
  
  const removeFile = (filename) => {
    setFiles((prev) => {
      return prev.filter((fl) => {
        return fl.name !== filename;
      });
    });
  };
  const uploadHandler = (event) => {
    setFileNameAlradyExist([]);
    const file = Array.from(event.target.files);

    if (!file) return;
    // check if file already exist
    const alreadyIncludedFileNames = files.map((fls) => {
      return fls.name;
    });
    file.map((fl) => {
      if (alreadyIncludedFileNames.includes(fl.name)) {
        setFileNameAlradyExist((prev) => {
          return [...prev, fl.name];
        });
        setFileAlreadyExist(true);
      } else {
        setFiles((prev) => {
          return [...prev, fl];
        });
      }
    });
    console.log("file got");
  };

  const newEventFormSubmit = async (values) => {
    if (checkMark1 && files.length !== 0 && (selectedImage !== undefined && selectedImage !== null)) {
      console.log("values:", values,{selectedImage});
      const addEventeData = new FormData();
      console.log("added files :", { files });

      addEventeData.append("event_title", values.event_title);
      addEventeData.append("event_title_ar", values.event_title_ar);
      addEventeData.append("category", values.category);
      addEventeData.append("location", values.location);
      addEventeData.append("budget", values.budget);
      addEventeData.append("event_type", values.event_type);
      addEventeData.append("from_date", values.from_date);
      addEventeData.append("to_date", values.to_date);
      addEventeData.append("number_of_attendees", values.number_of_attendees);
      addEventeData.append('fees', values.fees);
      addEventeData.append('img', selectedImage)


      const urlIMage = selectedImage && await URL.createObjectURL(selectedImage)


      console.log('selected image', urlIMage);
      console.log({ date });
      files.map((docs) => {
        console.log({ docs });
        addEventeData.append("documents", docs);
      });

      console.log("form data :", { ...addEventeData });

      try {
        const data = await fetcher({
          key: `/${userUrl}/add-event`,
          data: addEventeData,
          header: {
            headers:

              { token: userData.token }
          }
        });
        console.log("fetchdata", data);
        if (data && data.data.success === true) {
          console.log('fsucessdata', data.data.data);
          setOpenPopup(false)
          mutate(`/${userUrl}/list-events`, addEventeData, false)

          setBudget(0)
          const evnt = data.data.data
          const category = categories.find((x) => {
            return x._id == evnt.category[0]
          })
          console.log('fetchdata', category);
          const newEvent = {
            event_title: evnt.event_title,
            location: evnt.location,
            objectID: evnt._id,
            submission_date: evnt.submission_date,
            category: [category],
            budget: evnt.budget,
            img: urlIMage,
            temp: true
          }
          setEvents(evnts => [newEvent, ...evnts])


        } else {
        console.log("error",data.data.message);
          // setErrorStatus(true)
        }
      } catch (e) {
        alert(e);
        // setActivationStatus(true)
      }
    } else
      setFileError(true)
  };


  return (


    <div className={styles.modalWRapper}>

      <div className={styles.formDiv}>

        <div className={styles.createEvent}>
          <div onClick={() => setOpenPopup(!openPopup)} className={styles.close}><AiOutlineClose /></div>
          <h3 className={styles.newEventTitle}>New Event</h3>
          <form onSubmit={handleSubmit(newEventFormSubmit)} className={styles.spacing}>
            <div className={styles.flexMain}>


              <div className={styles.textLabel}>
                <span htmlFor="Event Title" className={styles.textspan}>Event Title</span>
                <input {...register("event_title", { required: true })} type="text" name='event_title' className={styles.inputtext} onKeyUp={() => { trigger('title') }} />
                {errors.event_title && (<small className={styles.errorMessage}>Missing your event title </small>)}
              </div>
              <div className={styles.textLabel}>
                <span className={styles.textspan}>اسم المشروع</span>


                <input {...register("event_title_ar",
                  // { required: true }
                  {
                    required: {
                      value: true,
                      message: "Missing your arabic project name"
                    },
                    validate: {
                      isArabic: value => {
                        var isArabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
                        if (isArabic.test(value)) {
                          return true;
                        } else {
                          return false;
                        }
                      },
                    },
                    minLength: { value: 3, message: "Project name arabic must be at least 3 characters" },
                    maxLength: { value: 15, message: "Project name arabic should not exceed 15 characters" },
                  }
                )
                } type="text" name='event_title_ar' className={styles.inputtext}
                />
                {errors.event_title_ar && (<small className={styles.errorMessage}>Missing your event title </small>)}
              </div>
              <div className={styles.textLabel}>
                <span htmlFor="Category" className={styles.textspan}>Category</span>
                {/* <label htmlFor="category">Category</label><br /> */}
                <select name="category" className={styles.selectBox} {...register('category')}>

                  <option value='63ecbf9f7cd9fd406c074884' selected disabled hidden>Select Category</option>


                  {
                    categories?.map((cat) => {
                      return (<option key={cat._id} value={cat._id}>{cat.name}</option>)

                    })
                  }

                </select>
                {/* {errors.category && (<small className={styles.errorMessage}>Select a category </small>)} */}
                {/* <input type="text" className={styles.inputtext} />category */}

              </div>
              <div className={styles.textLabel}>
                <span htmlFor="event_type" className={styles.textspan}>Event Type</span>

                <select name="event_type" className={styles.selectBox} {...register('event_type', { required: true })}>
                  <option value={''} selected disabled hidden>Select Event Type</option>
                  <option value="PUBLIC">public</option>
                  <option value="PRIVATE">private</option>
                </select>

                {errors.event_type && (<small className={styles.errorMessage}>Select a Type </small>)}
              </div>
              <div className={styles.textLabel}>
                <span htmlFor="location" className={styles.textspan}>Location</span>

                <input type="text" name='location' {...register("location")} className={styles.inputtext} />
                {/* {errors.location && (<small className={styles.errorMessage}>Missing Your Location </small>)} */}
              </div>




              <div className={styles.textLabel}>
                <span htmlFor="Events Date" className={styles.textspan}>Events Date</span>

                <div className={styles.dateDiv}>



                  <div className={styles.dobcalDiv}>
                    <input type="date" className={styles.dob} name='from_date' placeholder="Date"
                      {...register("from_date", { required: true })} />
                    <div className={styles.calenderIcon}> <SlCalender size={'13px'} /></div></div>
                  {/* {errors.from_date && (<small className={styles.errorMessage}>Missing start date  </small>)} */}






                  <p className={styles.toDate}>To</p>
                  <div className={styles.dobcalDiv}>
                    <input type="date" className={styles.dob} name='to_date'
                      {...register("to_date", {
                        required: true, validate: (x => {
                         
                          console.log("date validation ", x)
                          const fromdate = getValues('from_date')
                          if(fromdate>new Date()){
                          const date2 = dayjs(x);
                          const date1 = dayjs(fromdate);
                          const diff = date2.diff(date1, 'day', true);
                          console.log("obtained", diff);

                          return diff >= 0 }
                        })
                      })} />
                    <div className={styles.calenderIcon}> <SlCalender size={'13px'} /></div>
                  </div>


                </div>
                {errors.to_date?.type === 'required' && (<small className={styles.errorMessage}>Missing date  </small>)}
                {errors.to_date?.type === 'validate' && (<small className={styles.errorMessage}> Invalid Date </small>)}

              </div>




              <div className={styles.textLabel}>
                <span htmlFor="numberOfAttendees" className={styles.textspan}>Number of Attendees</span>

                <input type="number" name='number_of_attendees'{...register("number_of_attendees")} className={styles.inputtext} />
                {/* {errors.number_of_attendees && (<small className={styles.errorMessage}>Missing Your Number Of Attendees  </small>)} */}

              </div>
              <div className={styles.textLabel}>
                <span htmlFor="budget" className={styles.textspan}> Estimated Budget</span>

                <input type="number" name='budget' {...register("budget", { required: true, onChange: (e) => { setBudget(e.target.value) } })} className={styles.inputtext} />
                {errors.budget && (<small className={styles.errorMessage}>Missing your estimate  budget  </small>)}
              </div>
              <div className={styles.textLabel}>
                <span htmlFor="Service Fees" className={styles.textspan}>Service Fees</span>

                <input type="text" readOnly

                  value={parseInt(100 + (budget / 10)) || 100} name='fees'{...register("fees", { required: true })} className={styles.inputtext} />

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
                <div className={styles.fileDiv}>
                  <div className={styles.browseButtonWrap}>
                    <input type='file' name="img" style={{ marginLeft: "-86px", width: "325px" }} className={styles.customFileInput} placeholder='Upload image'
                    accept=".png, .jpg, .jpeg"
                      onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }} /></div></div>

                {(selectedImage === null || selectedImage ===undefined) && isSubmitted && (
                  <small className={styles.errorMessage}>Image is required </small>
                )}


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

										</div>
                    {errors && (
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
              <input type="submit" disabled={isSubmitting} className={styles.payAndPublish} value="Pay & Publish" />
            </div>
            <div className={styles.catchErr}>{catcherrMsg}</div>
          </form>
        </div>
      </div>

    </div>

  );
}
export default FormComponent;