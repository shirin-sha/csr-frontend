import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import { fetcher } from "../../../hooks/useDataQuery";
import { AuthContext } from "../../../store/context";
import { usePopUp } from "../../../hooks/usePopUp";
import { useRouter } from "next/router";


const Card = (props) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [showPopup, hidePopup] = usePopUp();
  const router = useRouter();
  const user = userData.userType;
  const {
    type,
    data: {
      sponsor_status,
      hide_name,
      amount,
      deleted_by,
      sponsor_status: confirmBySponsor,
      applicant_status: confirmByYou,
      sponsor_id,
    },
    noButtonClicked,
    status,
    acceptButton,
    messageButton,
    confirmHandler,
    editHandler,
    messageHandler,
    deleteHandler,
    apiCall,
    projectId,
    mutate,
  } = props;
  console.log({ deleted_by });
  let userUrl = "applicant";

  if (user == 1) {
    userUrl = "applicant";
  } else if (user == 2) {
    userUrl = "organizer";
  } else if (user == 3) {
    userUrl = "sponsor";
  }
  // accept applicant sponsorship
  const sponsorAcceptByApplicant = async (sponsor_id) => {
    const queryData = {
      project_id: projectId,
      sponsor_id,
    };
    const fetchData = await fetcher({
      key: `/${userUrl}/accept-bid`,
      data: queryData,
      header: { headers: { token: userData.token } },
    });
    console.log("accept by applicant", { fetchData });
    if (fetchData && fetchData?.data?.success === true) {
      mutate(`/${userUrl}/list-projects`);

      showPopup({
        transparent: true,
        content: "You are accepted this sponsorship request",
        onOkPressed: () => {
          console.log("onOkPressed");
          hidePopup();
        },
      });
      setConfirmByYouState(true);
    }
    if (fetchData && fetchData?.data?.success === false) {
      showPopup({
        transparent: true,
        content: fetchData?.data?.message,
        onOkPressed: () => {
          console.log("onOkPressed");
          hidePopup();
        },
      });
      setConfirmByYouState(false);
    }
  };

  // only for applicants
  const toMessage = (e) => {
    e.preventDefault();
    console.log("chat...appl");

    const data = {
      ownerId: sponsor_id._id,
      userName: userData.userName,
      userId: userData.userId,
      isApplicant: true,
      isEvent: false,
    };
    fetcher({
      key: `/${userUrl}/startChat`,
      data,
      header: {
        headers: { token: userData.token },
      },
    }).then((res) => {
      console.log("chat data sent", { res });
      console.log("chat data", data);
      router.push(`/messages?id=${res.data.data}`);
    });
  };
  console.log("status from sponsor card", status);
  const removeButton = async (sponsor_id) => {
    const removeSp = async () => {
      console.log("amount ", amount);
      console.log("this request is removing");
      const queryData = {
        project_id: projectId,
        amount,
        sponsor_id: sponsor_id._id,
      };
      const fetchData = await fetcher({
        key: `/${userUrl}/remove-sponsorship`,
        data: queryData,
        header: { headers: { token: userData.token } },
      });
      console.log("remove by applicant", { fetchData });
      if (fetchData && fetchData?.data?.success === true) {
        mutate(`/${userUrl}/list-projects`);

        showPopup({
          transparent: true,
          content: "Your Sponsorship is deleted",
          onOkPressed: () => {
            console.log("onOkPressed");
            hidePopup();
          },
        });
      }
      if (fetchData && fetchData?.data?.success === false) {
				showPopup({
					transparent: true,
					content: fetchData?.data?.message,
					onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
				})

			}
		}
      showPopup({
        transparent: true,
        content: "Do you want to remove this sponsorship",
        onCancelpressed: () => {
          console.log("onCancelpressed");
          hidePopup();
        },
        onYesPressed: () => {
          removeSp();
          hidePopup();
        },
      });
    };

    // applicant states
    //console.log('data',data);
    const [confirmByYouState, setConfirmByYouState] = useState(confirmByYou);
    const yesButtonClicked = (e) => {
      e.preventDefault();
      console.log("yes Button Clicked");
      console.log({ confirmByYou });
      console.log({ confirmByYouState });

      if (confirmByYou === false && confirmByYouState === false) {
        showPopup({
          transparent: true,
          content: "Do you want to confirm this sponsorship",
          onCancelpressed: () => {
            console.log("onCancelpressed");
            hidePopup();
          },
          onYesPressed: () => {
            sponsorAcceptByApplicant(sponsor_id);
            hidePopup();
          },
        });
      }
    };

    return (
      <div
        className={
          type === "sponsor-sponsorship"
            ? styles.cardContainerSponsor
            : styles.cardContainer
        }
      >
        <div className={styles.sponsorTopcontent}>
          {type === "sponsor-sponsorship" && (
            <span className={styles.sponsorshipHeading}> Sponsorship</span>
          )}
          {type === "sponsor-sponsorship" ? (
            <p className={styles.labelRed}>
              {deleted_by
                ? "Your Sponsorship Request is deleted by Applicant"
                : null}
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className={styles.mainContent}>
          {(type === "applicant-sponsor" ||
            type === "applicant-queue-sponsor" ||
            type === "sponsor-sponsorship" ||
            type === "sponsor-sponsor-list") && (
            <div className={styles.row}>
              <p className={styles.label}>
                <span className={styles.labelTxt}>Name</span>
                <span className={styles.semiColon}>:</span>
              </p>
              <span className={styles.labelContent}>
                {!hide_name ? sponsor_id?.company_name : "Sponsor"}
              </span>
            </div>
          )}
          {(type === "applicant-sponsor" ||
            type === "applicant-queue-sponsor" ||
            type === "sponsor-sponsorship" ||
            type === "sponsor-sponsor-list") && (
            <div className={styles.row}>
              <p className={styles.label}>
                <span className={styles.labelTxt}>Amount</span>
                <span className={styles.semiColon}>:</span>
              </p>
              <span className={styles.labelContent}>{amount}</span>
            </div>
          )}
          {type === "sponsor-sponsorship" && (
            <div className={styles.row}>
              <p className={styles.label}>
                <span className={styles.labelTxt}>Confirm By Applicant</span>
                <span className={styles.semiColon}>:</span>
              </p>
              <span className={styles.labelContent}>
                {confirmByYou === true ? "Yes" : "No"}
              </span>
            </div>
          )}

          {type === "applicant-sponsor" && (
            <div className={styles.row}>
              <p className={styles.label}>
                <span className={styles.labelTxt}>Confirm by sponsor</span>
                <span className={styles.semiColon}>:</span>
              </p>
              <span className={styles.labelContent}>
                <span
                  className={
                    confirmBySponsor === true
                      ? styles.yellowTxt
                      : styles.normalText
                  }
                >
                  {confirmBySponsor === true ? "Yes" : "No"}
                </span>
              </span>
            </div>
          )}
          {type === "applicant-sponsor" && (
            <div className={styles.row}>
              <p className={styles.label}>
                <span className={styles.labelTxt}>Confirm by you</span>
                <span className={styles.semiColon}>:</span>
              </p>
              {confirmByYouState === false ? (
                <button className={styles.yesBtn} onClick={yesButtonClicked}>
                  Yes
                </button>
              ) : (
                <p style={{ color: "#9e8959" }}>Yes</p>
              )}
            </div>
          )}
        </div>
        {type === "sponsor-sponsorship" &&(status == "ACTIVE" || status == 'QUEUE' )  && (
          <div className={styles.buttonHandler}>
            {!sponsor_status && !deleted_by && (
              <button
                type="button"
                onClick={confirmHandler}
                onKeyDown={confirmHandler}
              >
                Confirm
              </button>
            )}
            {!deleted_by && (
              <button
                type="button"
                onClick={editHandler}
                onKeyDown={editHandler}
              >
                Edit
              </button>
            )}
            {/* <button type="button" onClick={messageHandler} onKeyDown={messageHandler}>Message</button> */}
            <button type="button" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        )}
        {(type === "applicant-sponsor" || type === "applicant-queue-sponsor") &&
          (status == "ACTIVE" || status == 'QUEUE' )&& (
            <div className={styles.controls}>
              {type === "applicant-sponsor" ? (
                <span
                  onClick={() => removeButton(sponsor_id)}
                  role="button"
                  tabIndex={-1}
                >
                  Remove
                </span>
              ) : (
                ""
              )}
              {type === "applicant-queue-sponsor" &&  (status == "ACTIVE" || status == 'QUEUE' )? (
                <span
                  onClick={() => acceptButton(sponsor_id, amount)}
                  role="button"
                  tabIndex={-1}
                >
                  Accept
                </span>
              ) : (
                ""
              )}
              <span onClick={toMessage} role="button" tabIndex={-1}>
                Message
              </span>
            </div>
          )}
      </div>
    );
  };

Card.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    deleted_by: PropTypes.number,
    confirmBySponsor: PropTypes.bool,
    confirmByYou: PropTypes.bool,
    projectId: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.oneOf([
    "applicant-sponsor",
    "applicant-queue-sponsor",
    "sponsor-sponsorship",
    "sponsor-sponsor-list",
  ]),
  // eslint-disable-next-line react/require-default-props
  apiCall: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  noButtonClicked: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  acceptButton: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  removeButton: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  messageButton: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  confirmHandler: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  editHandler: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  messageHandler: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  deleteHandler: PropTypes.func,
  mutate: PropTypes.func,
};
export default Card;
