import React, { useContext, useEffect, useState } from "react";
import styles from "./details.module.css";
import dayjs from "dayjs";
import Button from "../Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosDoc, fetcher } from "../../hooks/useDataQuery";
import { searchClient } from '../../helperFuctions/database'
import { AuthContext } from "../../store/context";
import next from "next";
import axios from "axios";

import Card from "../sponserCards/card";
import { useForm } from "react-hook-form";
import { usePopUp } from "../../hooks/usePopUp";



function Details({
  mutate,
  user,
  setEditMode,
  pageTitle,

  details,
  viewButtonClick,
  button_link,
  isEvent,
  button_value,
  isApplicant,
  mySponsorShip,
  editHandler,
  editMode,
  messageHandler,
  deleteHandler,
  confirmHandler
}) {
  console.log("user in details ", user);
  console.log("details from component :", details);

  const router = useRouter();
  const [detail, setDetail] = useState();
  const organizer = details?.organizers;
  const { userData, setUserData } = useContext(AuthContext);
  const [fullamount, setFullAmount] = useState(false);
  const [sponsorType, setSponsorType] = useState(null)

  console.log("user data for getting id:", userData);
  const userId = userData.userId;

  const [showPopup, hidePopup] = usePopUp()
  console.log("userId", userId);
  console.log("organiserarrayyyy", organizer);
  useEffect(() => {
    setDetail(details);
  });
  let userUrl = "";
  if (user == 1) {
    userUrl = "applicant";
  } else if (user == 2) {
    userUrl = "organizer";
  } else if (user == 3) {
    userUrl = "sponsor";
  }
  console.log("ddddddddddd", detail)
  const deleteFileHandler = (_name) => {
    console.log("file delete");
    removeFile(_name);
  };
  const organizerFind = (id) => {
    console.log("hhhj");
    return organizer?.filter((item) => item.organizer_id === id);
  };

  const filteredArray = organizerFind(userId);
  console.log("newArrayy", filteredArray);
  const amount = filteredArray?.map((item) => item.amount);
  const openInNewTab = (file) => {
    console.log("fileview");
    console.log({ file });

    axiosDoc(file, userUrl)
      .then((response) => {
        console.log("responsefile",{ response });

        var urlCreator = window.URL || window.webkitURL;
        const docUrl = urlCreator.createObjectURL(response.data);
        window.open(docUrl, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        console.log({ err });
      });
  };




  const { register, reset, handleSubmit, formState: { errors, isSubmitted }, setValue, getValues, trigger, watch } = useForm()


  useEffect(() => {
    setSponsorType(localStorage.getItem('SponsorType'))
  }, [userData])




  const addSponsorShip = async (values) => {
    //variables

    console.log({ sponsorType }, { editMode });
    // console.log('submitted');
    let endPoint = `add-sponsorship`

    console.log({ values });
    console.log('prop', details?.status);

    const sponsorship = new FormData()
    sponsorship.append('project_id', details._id)
    sponsorship.append('type', values.type)
    sponsorship.append('hide_name', values.hide_name)
    sponsorship.append('amount', values.amount)


    if (details.status === 'ACTIVE') {
      sponsorship.append('status', 0)

    } else if (details.status === 'QUEUE') {
      sponsorship.append('status', 1)

    }

    // switch edit or add sponsorship
    if (editMode) {
      endPoint = `editSponsor`
    }
    console.log('add sponsorship', { ...sponsorship });
    const response = await fetcher({ key: `/sponsor/${endPoint}`, data: sponsorship, header: { headers: { token: userData.token } } })
    console.log({ response });

    if (response.data.success === true) {
      if (editMode) {
        showPopup({
          transparent: true,
          content: `Your request is updated successfully`,
          onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
        })
      }
      if (!editMode && details.status === 'ACTIVE') {
        showPopup({
          transparent: true,
          content: `Your bid  of ${values.amount} has saved in sponsorship list`,
          onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
        })
      } else if (!editMode && details.status === 'QUEUE') {
        showPopup({
          transparent: true,
          content: `Dear sponsor, \n
                    your bid of ${values.amount} has saved in the queue.\n
                    You will be notified, if your bid  is selected by applicant`,
          onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
        })

      }
      setEditMode(false);

    } else {
      showPopup({
        transparent: true,
        content: response.data.message,
        onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
      })
    }


    mutate('/sponsor/list-projects')


  }

  const endSponsor = (e) => {
    e.preventDefault();
    try {
      showPopup({
        transparent: true,
        content: 'Do you want to close this project',
        onCancelpressed: () => { console.log("onCancelpressed"); hidePopup() },
        onYesPressed: () => {
          console.log('closing function', details?._id);
          const data = {
            id: details?._id
          }
          fetcher({
            key: `/${userUrl}/endSponsor`, data, header: {
              headers: { token: userData.token }
            }
          }).then(async (res) => {
            console.log('closed result', { res });
            if (res.data.success == true) {
              mutate(`/${userUrl}/list-projects`)
              setTimeout(() => {
                searchClient.clearCache().then(e => {
                  router.push('/project')


                })

              }, 2000);



            } else {
              showPopup({
                transparent: true,
                content: res?.data?.message,
                onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
              })
            }


          });
          hidePopup()
        }
      })




    } catch (error) {
      showPopup({
        transparent: true,
        content: error?.message,
        onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
      })
    }



  }
  const closeEvent = async () => {
    showPopup({
      transparent: true,
      content: 'Do you want to close this event',
      onCancelpressed: () => { console.log("onCancelpressed"); hidePopup() },
      onYesPressed: async () => {

        const data = {
          projectId: details._id
        }
        const updateProject = await fetcher({ key: `/${userUrl}/closeEvent`, data: data, header: { headers: { token: userData.token } } })

        console.log({ updateProject });
        hidePopup()
        mutate(`/${userUrl}/list-events`)

        setTimeout(() => {
          searchClient.clearCache().then(e => {
            router.push('/event')
          })

        }, 2000);
      }
    })
    // console.log({ });

  }

  // setMySponsorShip(details?.mySponsorShip)


  return (
    <div className={styles.eventDetails}>
      <div className={styles.outerDiv}>
        <div>
          <h3 className={styles.pagetitle}>
            {details?.name || details?.event_title}
          </h3>
        </div>
        <div className={styles.budjetSection}>
          {detail?.budget && (
            <div className={styles.titleSection}>
              <p className={styles.budgetTag}>{detail?.budget}</p>
              <p className={styles.budLabel}>Budget</p>
            </div>
          )}
          {!isEvent ? (<div className={styles.sectionRight}>
            <p className={styles.budgetTag}>{detail?.sponsor_amount || 0}</p>
            <p className={styles.budLabel}>Sponsored</p>
          </div>) : (<></>)}
          {!isEvent ? (<div className={styles.sectionRight}>
            <p className={styles.budgetTag}>{(parseInt(detail?.budget - detail?.sponsor_amount) >= 0) ? (parseInt(detail?.budget - detail?.sponsor_amount)) : 0}</p>
            <p className={styles.budLabel}>Remaining</p>
          </div>) : (<></>)}
          {isEvent && (
            <div className={styles.sectionRight}>
              <p className={styles.budgetTag}>{detail?.quote_count || 0}</p>
              <p className={styles.budLabel}>Number of quotations</p>
            </div>
          )}
        </div>

        <div className={styles.contantDiv}>
          <div className={styles.secondSec}>
            <div className={styles.sectionDiv} style={{ lineHeight: "40px" }}>
              {detail?.category[0]?.name && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>Category</p>
                  <p>:</p>
                  <p className={styles.dataStyle}>
                    {detail?.category[0]?.name}
                  </p>
                </div>
              )}
              {detail?.location && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>Location Name</p> <p>:</p>
                  <p className={styles.dataStyle}>{detail?.location}</p>
                </div>
              )}
              {detail?.submission_date && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>Submission Date</p><p>:</p>
                  <p className={styles.dataStyle}>
                    {" "}
                    {dayjs(detail?.submission_date).format("DD/MM/YYYY")}
                  </p>
                </div>
              )}
              {isEvent && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>No. of Attenties</p> <p>:</p>
                  <p className={styles.dataStyle}>
                    {detail?.number_of_attendees || 0}
                  </p>
                </div>
              )}
              {!isEvent ? (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>No. of Sponsors</p><p>:</p>
                  <p className={styles.dataStyle}>{detail?.sponsor_count || 0}</p>
                </div>) : (
                <></>
              )}
            </div>
            <div className={styles.sectionDiv} style={{ lineHeight: "40px" }}>
              {detail?.from_date && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>Start Date</p> <p>:</p>
                  <p className={styles.dataStyle}>
                    {" "}
                    {dayjs(detail?.from_date).format("DD/MM/YYYY")}
                  </p>
                </div>
              )}
              {detail?.to_date && (
                <div className={styles.linePara}>
                  <p className={styles.nameStyle}>End Date</p> <p>:</p>
                  <p className={styles.dataStyle}>
                    {" "}
                    {dayjs(detail?.to_date).format("DD/MM/YYYY")}
                  </p>
                </div>
              )}
              {/* {isEvent && ( */}
              <div className={styles.linePara}>
                <p className={styles.nameStyle}> View</p> <p>:</p>
                <p className={styles.dataStyle}>{detail?.viewed_by.length || 0}</p>
              </div>
              {/* // )} */}

              {!isEvent ? (<div className={styles.linePara}>
                <p className={styles.nameStyle}>Sponsered Percentage</p><p>:</p>
                <p className={styles.dataStyle}> {parseFloat((detail?.sponsor_amount / detail?.budget) * 100,).toFixed(1) || 0}%</p>
              </div>) : (<></>)}
            </div>
          </div>
        </div>

        <div className={styles.docSection}>
          {
            <div className={styles.singleLineFlex}>
              <p className={styles.docnameStyle}>Documents</p><p>:</p>
              <div className={styles.documentSection}>
                {detail &&
                  detail.documents.map((doc, idx) => {
                    // console.log('doc',doc)
                    return (
                      < >
                        <div key={idx} className={styles.documentButton}>
                          <p className={styles.docList}>Document {idx + 1}</p>
                          <div className={styles.buttonsWrapper}>
                            <Button
                              onClick={() => openInNewTab(doc.file_name)}
                              sm
                              text={"View"}
                            />

                          </div>
                          <br />
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          }
          {/* <div style={{width:"50%"}}></div> */}
        </div>
        {/* sponsershipard */}
        {(!isEvent && !isApplicant) && <>
          {
            (mySponsorShip?.length > 0 && !editMode) ?
              <>
                <div className={styles.my_sponsor}>{details && mySponsorShip?.length > 0 && <Card data={mySponsorShip[0]} status={details?.status} editHandler={editHandler} messageHandler={messageHandler} deleteHandler={deleteHandler} confirmHandler={confirmHandler} projectId={details._id} type={'sponsor-sponsorship'} />}</div>
                <div className={styles.bottomButton}>
                  {!isEvent && (
                    <div className={styles.lineParastatus}>
                      <div className={styles.statusDiv}><p className={styles.nameStylestatus}> Status</p> <p>:</p>
                        <p className={details?.status == 'CLOSED' || details?.status == 'INACTIVE' || details?.status == 'EXPIRED' ? styles.closedStatus : styles.activeStatus}>{detail?.status}</p></div>
                      {/* {details && details?.status != 'CLOSED' && <div><SponsorshipBar projectDetails={details} isSponsored={details?.mySponsorShip && details?.mySponsorShip.length === 0} projectId={details?._id} amount={details?.budget} buttonHandler={endSponsor} button_value={'End Sponsor'} ></SponsorshipBar></div>} */}

                      <div className={styles.messagebtnDiv}>
                        <Button onClick={messageHandler} text={'Message'}></Button></div>
                      <div className={styles.messagebtnDivResponse}>
                        <button className={styles.mobilebtn} onClick={messageHandler}>Message</button>
                      </div>


                    </div>
                  )}
                </div>

              </>

              : <>
                {<form onSubmit={handleSubmit(addSponsorShip)} className={styles.form}>

                  {(detail?.status == 'ACTIVE' || details?.status == 'QUEUE') && <div className={styles.checkDiv} >
                    {sponsorType == 1 && <div className={styles.radioClassWrapper}>
                      <div className={styles.radioButtonWrapper}>
                        <input defaultChecked value={"GENERAL"} {...register("type", { required: true })} type="radio" className={styles.radioButton} name="type" />
                        <label className={styles.radioLabel}>
                          General
                        </label>
                      </div>
                      <div className={styles.radioButtonWrapper}>
                        <input value={"CLEARANCE"} type="radio" {...register("type", { required: true })} className={styles.radioButton} name="type" />
                        <label className={styles.radioLabel}>
                          Clearance
                        </label>
                      </div>
                    </div>}
                    <div style={{ display: 'flex' }}>
                      <label className={styles.checkboxWrapper}>
                        Full Amount
                        <input type='checkbox'
                          // value={e.target}
                          onClick={(e) => {
                            const { value, checked } = e.target
                            if (checked) {
                              console.log('category value', { value });
                            }
                            console.log("clicked");
                            console.log('full amount ', e.currentTarget.checked);
                            setFullAmount(e.currentTarget.checked)
                            e.currentTarget.checked ? setValue('amount', (parseInt(detail?.budget - detail?.sponsor_amount) >= 0) ? (parseInt(detail?.budget - detail?.sponsor_amount)) : 0) : setValue('amount', null)
                          }} />
                        <span className={styles.checkmark} />
                      </label>

                      <input {...register("amount", { required: true, min: 1, max: details?.budget })} className={!errors.amount ? styles.numberInput : styles.numberInputErr} id='amt' type="number" placeholder='Enter Amount' />
                      {' '}
                      {errors.amount && errors.amount.type === "required" && (<small className={styles.errorMessage}>Amount is Required </small>)}
                      {errors.amount && errors.amount.type === "max" && (<small className={styles.errorMessage}>Amount is must be no more than Budget Amount</small>)}
                      {errors.amount && errors.amount.type === "min" && (<small className={styles.errorMessage}>Amount is must be at least 1</small>)}



                    </div>
                    <label className={styles.checkboxWrapper}>Hide My Name
                      <input type='checkbox'{...register("hide_name")} />
                      <span className={styles.checkmark} />
                    </label>


                  </div>}



                  <div className={styles.bottomButton}>
                    <div className={styles.lineParastatus}>
                      <div className={styles.statusDiv}><p className={styles.nameStylestatus}> Status</p> <p>:</p>
                        <p className={details?.status == 'CLOSED' || details?.status == 'INACTIVE' || details?.status == 'EXPIRED' ? styles.closedStatus : styles.activeStatus}>{detail?.status}</p></div>
                      {/* {details && details?.status != 'CLOSED' && <div><SponsorshipBar projectDetails={details} isSponsored={details?.mySponsorShip && details?.mySponsorShip.length === 0} projectId={details?._id} amount={details?.budget} buttonHandler={endSponsor} button_value={'End Sponsor'} ></SponsorshipBar></div>} */}

                      {(detail?.status == 'ACTIVE' || details?.status == 'QUEUE') && <div className={styles.buttonCont}>
                        <Button onClick={(e) => {
                          e.preventDefault()
                          messageHandler()
                        }} text={'Message'}></Button>
                        {editMode && <Button className={styles.btn} onClick={() => setEditMode(false)} text={'Cancel'}></Button>}

                        {<input className={styles.btn} type="submit" value={'sponsor'} />}
                      </div>}

                      <div className={styles.sponsorBottonBtnRes}>
                        <button className={styles.mobilebtn} onClick={messageHandler} >Message</button>
                        {editMode && <button className={styles.mobilebtn} onClick={() => setEditMode(false)} >Cancel</button>}

                        {<input className={styles.mobilebtn} type="submit" value={'sponsor'} />}
                      </div>


                    </div>


                  </div>

                </form>}  </>}
        </>}
        {(isEvent || isApplicant) && <div className={styles.bottomButton}>

          {isEvent && filteredArray?.length === 0 ? (
            <>
              <div className={styles.viewQuatationDiv}>
                <Button
                  onClick={() =>
                    router.push({ pathname: `${button_link}/${detail._id}` })
                  }
                  text={button_value}
                  className={styles.quatationBtn}
                ></Button>
                {/* end event component */}
                {
                  isApplicant && details.status == 'ACTIVE' &&
                  <>
                    <div className={styles.endbtnLg}><Button onClick={closeEvent} text={'End Event'}></Button></div>

                  </>
                }
              </div>
              <div className={styles.viewQuatationDivMobile
              }><button className={styles.mobilebtn} onClick={() =>
                router.push({ pathname: `${button_link}/${detail._id}` })
              }>{button_value}</button>
                {isApplicant && details.status == 'ACTIVE' &&

                  <div style={{ width: '100%' }} ><button className={styles.mobilebtn} onClick={closeEvent} >End Event</button></div>

                }
              </div>

            </>


          ) : (<></>)}


          {/* as a project for applicant  */}
          {!isEvent && isApplicant && (
            <div className={styles.lineParastatus}>
              <div className={styles.statusDiv}><p className={styles.nameStylestatus}> Status</p> <p>:</p>
                <p className={details?.status == 'CLOSED' || details?.status == 'INACTIVE' || details?.status == 'EXPIRED' ? styles.closedStatus : styles.activeStatus}>{detail?.status}</p></div>
              {/* {details && details?.status != 'CLOSED' && <div><SponsorshipBar projectDetails={details} isSponsored={details?.mySponsorShip && details?.mySponsorShip.length === 0} projectId={details?._id} amount={details?.budget} buttonHandler={endSponsor} button_value={'End Sponsor'} ></SponsorshipBar></div>} */}


              {details?.status === 'ACTIVE' && <><div className={styles.endbtnLg}><Button onClick={endSponsor} text={'End Sponsor'}></Button></div>
                <div className={styles.viewQuatationDivMobile}><button onClick={endSponsor} className={styles.mobilebtn}>End Sponsor</button></div></>}



            </div>
          )}

          {/* organizer */}
          {!isApplicant && isEvent && filteredArray?.length > 0 ? (<div><p style={{ textAlign: 'center' }}>Your Quotation Prize &nbsp; :&nbsp;{amount}</p></div>) : (
            <></>
          )}


        </div>}


      </div>

    </div>

  );
}

export default Details;
