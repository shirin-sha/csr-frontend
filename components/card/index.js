
import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./card.module.css";
import Link from 'next/link'
import { useRouter } from 'next/router'
import next from "next";
import dayjs from 'dayjs'
import { AuthContext } from "../../store/context";
import { baseUrl, fetcher } from "../../hooks/useDataQuery";
import {MdNotificationsActive}from 'react-icons/md'



const Card = ({ title, detailsprop, isEvent, isApplicant, user ,isNewUpdate}) => {


  // declarations and states
  const cardRef = useRef(null)
  const [details, setdetails] = useState({
    category: "",
    budget: "",
    location: "",
    status: "",
    submission_date: "",
    img: ''
  });
  const [url, setUrl] = useState('')
  const { userData, setUserData } = useContext(AuthContext);
  const { userId } = userData


  const router = useRouter()


  // use effects
  useEffect(() => {
    switch (parseInt(user)) {
      case 1:
        setUrl('applicant')

      case 2:
        setUrl('organizer')
        break;
      case 3:
        setUrl('sponsor')

        break;
      default:
        break;

    }

  }, [userData, user])

  useEffect(() => {
    console.log("user in card :", user);
    setdetails(detailsprop);
  }, []);


  if (details?.temp) {
    console.log('temp', { details });
    console.log('temp image', details?.img);

  }

  // functions
  const toMessage = () => {
    console.log('chat...');
    const data = {
      ownerId: detailsprop.added_sponsor || detailsprop.added_applicant || detailsprop.added_organizer,
      userName: userData.userName,
      userId,
      isApplicant: detailsprop.added_applicant ? true : false,
      isEvent: isEvent || false

    }
    console.log('message', { data });
    fetcher({
      key: `/${url}/startChat`, data, header: {
        headers: { token: userData.token }
      }
    }).then(res => {
      console.log('chat data sent', { res });
      console.log('chat data', data);
      console.log('chat id', res.data.data);
      router.push(`messages?id=${res.data.data}`)

    })

  }

  const viewCount = async () => {
    console.log("sfdfvfdf", details)
    console.log("details._id,", details.objectID
    );
    if (userData.userType == 3 || userData.userType == 2)
    console.log("viewed" );
      setTimeout(async () => {
        const data = await fetcher({
          key: `/${url}/viewCount`,
          data: { id: details.objectID },
          header: { headers: { token: userData.token } }

        })
      })
  }
  console.log('card url', { url });
  return (
    <div >
      <div className={styles.card} ref={cardRef}>
        <div className={styles.eventTitle}>
          
          <p>{details?.name || details?.event_title}</p>
          {details.status == 'INACTIVE' && isEvent && <div className={styles.tag}>
            <p>Closed</p>
          </div>}
         { (!isEvent && !isApplicant &&isNewUpdate) ?<div className={styles.notificationDot}><MdNotificationsActive color="black" size={'20px'} ></MdNotificationsActive></div> :''}

        </div>
        <div className={styles.container}>
          <div className={styles.imgDiv}>
            {!isEvent ? (
              <div>
                {/* src={`https://loop.credot.dev/${url}/list-projects/${details?.img}`}  */}
                <img className={details.status == 'INACTIVE' && styles.imgDivGrey} alt="Image" width='100%' height='92px' src={details?.temp ? details?.img : `${baseUrl}/${url}/list-projects/${details?.img}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/assets/default.jpg"  //"images/default.png";
                  }}

                />
              </div>
            )
              : <div>
                <img className={details.status == 'INACTIVE' && styles.imgDivGrey} alt="Image" width='100%' height='92px' src={details?.temp ? details?.img : `${baseUrl}/${url}/list-events/${details?.img}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/assets/default.jpg"  //"images/default.png";
                  }}
                /></div>}


          </div>
          <div className={styles.conBody}>
            <div className={styles.singleLine}>
              <p className={styles.eventlabel}>Category </p>
              <p>:</p>

              <p className={styles.colonspace}> {details?.category && details?.category[0]?.name}</p>

            </div>
            <div className={styles.singleLine}>
              <p className={styles.eventlabel}>Budget</p>
              <p>:</p>
              <p className={styles.colonspace}>{details?.budget}</p>
            </div>
            {isEvent ? (
              <div className={styles.singleLine}>
                <p className={styles.eventlabel}>Location</p>
                <p>:</p>
                <p className={styles.colonspace}>{details?.location}</p>
              </div>
            ) : (
              <div className={styles.singleLine}>
                <p className={styles.eventlabel}>Status</p>
                <p>:</p>
                {/* {details?.status=='CLOSED' ?styles.closedStatus:styles.activeStatus && */}
                <p className={details?.status == 'CLOSED' || details?.status == 'INACTIVE' || details?.status == 'EXPIRED' ? styles.closedStatus : styles.activeStatus}>{details?.status}</p>
                {/* }  */}
              </div>
            )}
            {/* <p className={styles.eventlabel}>{isEvent ?'Location': 'Status'}</p> */}
            {/* <p>{isEvent ? details.location:details.status}</p> */}


            <div className={styles.singleLine}>

              <p className={styles.eventlabel}>Submission Date </p>
              <p>:</p>
              <p className={styles.colonspace}>{dayjs(new Date(details?.submission_date).toDateString()).format("DD/MM/YYYY")}</p>


            </div>
          </div>
        </div>
        {isApplicant ? (
          <div className={styles.eventcardButtondiv}>

            <Link href={isEvent ? { pathname: `event/details/${details.objectID}` } : { pathname: `project/details/${details.objectID}` }}>
              <button onClick={viewCount} type="button" className={styles.cardbutton}>

                View More
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.cardButtondiv}>

            <Link href={isEvent ? { pathname: `event/details/${details.objectID}` } : { pathname: `project/details/${details.objectID}` }}>
              <button onClick={viewCount} type="button" className={styles.cardbutton}>

                View More
              </button>
            </Link>



            <button type="button" onClick={toMessage} className={styles.cardbutton}>
              Message
            </button>


          </div>
        )}
      </div>
      {/* project */}
    </div>
  );
};
export default Card;
