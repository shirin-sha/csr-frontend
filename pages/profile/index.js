import React, { useRef,useContext, useEffect, useState } from "react";
import SideSection from "../../components/commonBar";
import styles from "./profile.module.css";
import { axiosDoc } from "../../hooks/useDataQuery";
import { AuthContext } from "../../store/context";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useDataQuery, {baseUrl ,fetcher } from "../../hooks/useDataQuery";
import { Router, useRouter } from "next/router";
import dayjs from "dayjs";
import Button from "../../components/Button";
import { usePopUp } from "../../hooks/usePopUp";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

function Profile() {
  // password form
  const {
    register,
    handleSubmit: handleSubmit1,
    formState: { errors, isSubmitted },
    getValues,
    trigger,
    reset,
  } = useForm();

  // const [data,setData]=useState(null)
  // const [profileData, setProfileData] = useState(false);
  const [profle, setProfile] = useState(true);
  const [showPopup, hidePopup] = usePopUp();
  const { userData, setUserData } = useContext(AuthContext);
  const userId = userData.userId;
  const [user, setUser] = useState(0);
  const [type, setType] = useState(0);
  const [changePassword, setChangePassword] = useState(false);
  const [passwordErr,setPasswordErr]=useState(false)
  const [passwordSuccess,setPasswordSuccess]=useState(false)
const [profileimage,setprofileimage]=useState('/assets/default.jpg')
// image upload
  const passwordpopup = useRef();
  useEffect(() => {
    setUser(userData?.userType || 0);
    setType(userData?.appType || 0);
  }, [userData, user]);

  const [popup, setPopup] = useState(false);
  console.log("USERID:-", userId);
  console.log("USERTYPE:", user);
  console.log("USERTOKEN:", userData.token);

  const [detail, setDetail] = useState({});

  console.log("detail", detail);
  console.log("useeeeeertype", detail?.type);
   const router = useRouter();
   console.log("uussseerr", userId);

  const Userlogout = (e) => {
    e.preventDefault();
    showPopup({
      transparent: true,
      content: "Do you want to Logout?",
      onOkPressed: () => {
        window.localStorage.clear();
        router.replace("/login");
        hidePopup();
      },
      onCancelpressed: () => {
        console.log("onCancelpressed");
        hidePopup();
      },
    });

    // window.localStorage.clear();
    // console.log("logout");
    // router.replace("/login");
  };
  let userUrl = "applicant";
  if (user == "1") {
    userUrl = "applicant";
  } else if (user == "2") {
    userUrl = "organizer";
  } else if (user == "3") {
    userUrl = "sponsor";
  }

  // let uType=userData.appType
  // console.log("uType",uType)
  const openInNewTab = (file) => {
    console.log({ file });

    axiosDoc(file, userUrl)
      .then((response) => {
        console.log("responsefile", { response });

        var urlCreator = window.URL || window.webkitURL;
        const docUrl = urlCreator.createObjectURL(response.data);
        window.open(docUrl, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleInput = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("");
    userData.userId &&
      fetcher({
        key: `/${userUrl}/profile`,
        header: {
          "Content-Type": "application/json",
          headers: { token: userData.token },
        },
      }).then((data) => {
        console.log("updatedata", data);
        setDetail(data?.data?.data);
      });
  }, [userData, user]);

  //  password

  // const passwordChange=()=>{
  //   setChangePassword(true)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData=new FormData();
profileData.append("first_name",detail.first_name)
profileData.append("last_name",detail.last_name)
profileData.append("company_name",detail.company_name)
profileData.append("address",detail.address)
profileData.append("contact_person_name",detail.contact_person_name)
profileData.append('secondemail',detail.secondemail)
profileData.append('img',profileimage)
profileData.append('type',detail.type)
    try {
      console.log("Data for update : ", detail);
      const resdata = await fetcher({
        key: `/${userUrl}/update-data`,
        data: profileData,
        header: { headers: { token: userData.token } },
      });
      console.log("fetchdata", resdata);
      if (resdata?.data?.success === true) {
        showPopup({
          transparent: true,
          content: "Your profile was updated successfully",
          onOkPressed: () => {
            console.log("onOkPressed");
            hidePopup();
          },
          // onCancelpressed: () => { console.log("onCancelpressed");hidePopup() }
        });
        const d = { ...userData };
        d.userName = detail.first_name || detail.company_name;
        console.log({ d });
        setUserData({ ...d });
        localStorage.setItem(
          "userName",
          detail.first_name || detail.company_name
        );
      }
    } catch (e) {
      console.log("error");
      alert(e);
    }
  };

  // const passwordChange = (e) => {
  //   console.log("clicked");
  //   e.preventDefault();
  //   setPopup(true);
  //   console.log({ popup });
    
  // };

  //  changepassword

  const newPassword = async (values) => {
    
    console.log("values");
    console.log(values);
    const newPasswordData = new FormData();
    // newPasswordData.append('token', token)
    newPasswordData.append("password", values.password);
    newPasswordData.append("re_password", values.cnfpassword);

    newPasswordData.append("currentpassword", values.currentpassword);
    try {
      console.log("insidetry");
      console.log("userUrluserUrl",userUrl)
      const resp = await fetcher({
        key: `/${userUrl}/change-password`,
        data: newPasswordData,
        header: { headers: { token: userData.token } },
      });
      console.log("responsepassw",resp.data.success);
if(resp.data.success===true){
  console.log("truecondition");
// alert("updated")
setPasswordSuccess(true)
setPasswordErr(false)
setTimeout(()=>{setPasswordSuccess(false)},2000)
setTimeout(()=>{passwordpopup.current.style.display='none'},2000)

  reset();
 
 
}else{
console.log("falsecon");
  setPasswordErr(resp.data.message)
  setTimeout(()=>{setPasswordErr(false)},2000)
  // alert(resp.message)
}
      console.log("fetchdatapassword", resp.data.message);
    } catch (e) {
      setPasswordErr(e);
      setTimeout(()=>{setPasswordErr(false)},2000)
    }
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  useEffect(()=>{
    uploadedImage.current.src=detail?.img ? `${baseUrl}/${userUrl}/profile/${detail?.img}`:"/assets/default.jpg"
    // "/assets/default.jpg"}
  })
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      console.log('current.file',current.file);
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setprofileimage(file)
    }
    
  };
  console.log("profileimg",profileimage);
  


  return (
    <>
      {/* // console.log("upvaluess", values);
    // // const updateData = new FormData();
    // // updateData.append("first_name", values.first_name);
    // // updateData.append("last_name", values.last_name); */}

      <SideSection active={0}>
        <div className={styles.container}>
         

          {profle && (
            <form className={styles.formDiv} onSubmit={handleSubmit}>
              <div className={styles.createEvent}>
                <div style={{ textAlign: "right", paddingTop: "10px" }}>
                  <Link href="/project">
                    <AiOutlineClose />
                  </Link>
                </div>
                <div className={styles.headerContent}>
                  {/* <div className={styles.actvClass}>
                    <h1 className={styles.h9}>P </h1>
                  </div> */}
                  <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
       name='img'
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
      style={{
        height: "70px",
        width: "70px",
        border: "1px solid black",borderRadius:"50%"
      }}
      onClick={() => imageUploader.current.click()}
    >
      <img
      // src={(`https://loop.credot.dev/${userUrl}/profile/${detail.img}`)}
  
        ref={uploadedImage}
        style={{
          width: "100%",
          height: "100%",
          position: "acsolute",
          borderRadius:"50%"
        }}
      />
    </div>
   
  </div>
                  <h1 className={styles.h1}>Personal information</h1>
                </div>

                <div className={styles.header}>
                  {(user == "1" && type == 1) ||
                  (user == "2" && type == 1) ||
                  user == "3" ? (
                    <div>
                      <div className={styles.flexLine}>
                        <div className={styles.labelInput}>
                          <label>Company Name</label>
                          <input
                            type="text"
                            className={styles.txtbox}
                            onChange={handleInput}
                            name="company_name"
                            value={detail?.company_name}
                          />
                        </div>
                        <div className={styles.labelInput}>
                          <label>Address</label>
                          <textarea
                            rows="3"
                            className={styles.txtbox}
                            onChange={handleInput}
                            name="address"
                            value={detail?.address}
                          />
                        </div>
                      </div>

                      <div>
                        <div className={styles.contactDiv}>
                          {" "}
                          <h5>Contact Person</h5>
                        </div>
                        <div className={styles.flexLine}>
                          <div className={styles.labelInput}>
                            <label> Name</label>
                            <input
                              type="text"
                              className={styles.txtbox}
                              onChange={handleInput}
                              name="contact_person_name"
                              value={detail?.contact_person_name}
                            />
                          </div>
                          <div className={styles.labelInput}>
                            <label>Mobile Number</label>
                            <input
                              type="text"
                              className={styles.txtbox}
                              onChange={handleInput}
                              name="mobile"
                              value={detail?.mobile}
                              disabled
                            />
                          </div>
                        </div>
                        <div className={styles.flexLine}>
                          <div className={styles.emaillabelInput}>
                            <label>Email</label>
                            <input
                              type="email"
                              className={styles.txtbox}
                              onChange={handleInput}
                              value={detail?.email}
                              name="email"
                              disabled
                            />
                          </div>
                          {user == "3" && (
                            <div
                              className={styles.emaillabelInput}
                              // style={{ display: "none" }}
                            >
                              <label>Company Email</label>
                              <input
                                type="email"
                                className={styles.txtbox}
                                name="secondemail"
                                onChange={handleInput}
                              />
                            </div>
                          )}
                          {user == "2" && type == 1 && (
                            <div
                              className={styles.emaillabelInput}
                              // style={{ display: "none" }}
                            >
                              <label>Expiry Date</label>
                              <input
                                type="text"
                                className={styles.txtbox}
                                value={dayjs(detail?.valid_upto).format(
                                  "DD/MM/YYYY"
                                )}
                                disabled
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {
                          <div className={styles.singleLineFlex}>
                            <p className={styles.labelDiv}>Documents</p>
                            <div className={styles.documentSection}>
                              {detail &&
                                detail.documents &&
                                detail?.documents.map((doc, idx) => {
                                  // console.log('doc',doc)
                                  return (
                                    <>
                                      <div className={styles.documentButton}>
                                        <p className={styles.docList}>
                                          Doc {idx + 1}
                                        </p>
                                        <div className={styles.buttonsWrapper}>
                                          {/* <button onClick={()=>openInNewTab(doc.file_name)} value='View' /> */}
                                          <button
                                            onClick={() =>
                                              openInNewTab(doc.file_name)
                                            }
                                            className={styles.docData}
                                          >
                                            View
                                          </button>
                                          {/* <button className={styles.docData}>Edit</button> */}
                                        </div>

                                        <br />
                                      </div>
                                      {/* <div className={styles.buttonUpload}>
                        <Button text={"Upload"}/>
                        </div> */}
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={styles.flexLine}>
                        <div className={styles.labelInput}>
                          <label>First Name</label>
                          <input
                            type="text"
                            className={styles.txtbox}
                            name="first_name"
                            onChange={handleInput}
                            // onChange={(e)=>{setDetail({...detail,first_name:e.target.value})}}

                            value={detail?.first_name}
                          />
                        </div>
                        <div className={styles.labelInput}>
                          <label>Last Name</label>
                          <input
                            type="text"
                            className={styles.txtbox}
                            name="last_name"
                            onChange={handleInput}
                            value={detail?.last_name}
                          />
                        </div>
                      </div>
                      <div className={styles.flexLine}>
                        <div className={styles.labelInput}>
                          <label>Email</label>
                          <input
                            type="email"
                            value={detail?.email}
                            className={styles.txtbox}
                            onChange={handleInput}
                            disabled
                          />
                        </div>
                        <div className={styles.labelInput}>
                          <label>Mobile Number</label>
                          <input
                            type="text"
                            className={styles.txtbox}
                            value={detail?.mobile}
                            onChange={handleInput}
                            disabled
                          />
                        </div>
                      </div>
                      {user == "1" ? (
                        <div className={styles.flexLine}>
                          <div className={styles.labelInput}>
                            <label>Gender</label>
                            <input
                            name="gender
                            "
                              type="text"
                              className={styles.txtbox}
                              value={detail?.gender}
                              onChange={handleInput}
                              disabled
                            />
                          </div>
                          <div className={styles.labelInput}>
                            <label>Date Of Birth</label>
                            <input
                              type="text"
                              className={styles.txtbox}
                              // onChange={handleInput}
                              // defaultValue={detail.dob}

                              value={dayjs(detail?.dob).format("DD/MM/YYYY")}
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={styles.flexLine}>
                          {detail &&
                            detail?.interested_categories?.length > 0 && (
                              <div className={styles.emaillabelInput}>
                                <label>Interested Category</label>
                                <input
                                  type="text"
                                  className={styles.txtbox}
                                  onChange={handleInput}
                                  value={detail?.interested_categories[0]?.name}
                                  disabled
                                />
                              </div>
                            )}
                          {/* {user==='2' &&( */}
                          <div className={styles.emaillabelInput}>
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              className={styles.txtbox}
                              value={dayjs(detail?.valid_upto).format(
                                "DD/MM/YYYY"
                              )}
                              disabled
                            />
                          </div>
                          {/* )} */}
                        </div>
                      )}
                      {/* end */}
                    </div>
                  )}
                  <div className={styles.commonButton}>
                    <button className={styles.logButton} onClick={Userlogout}>
                      Logout
                    </button>
                    <input
                      type="submit"
                      className={`${styles.logButton} ${styles.logButtonSpcng}`}
                      value="Update"
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {/* <button 
                      className={styles.passwordButton}
                      onClick={(e) => {
                        e.preventDefault();
setPopup(true)
                        // router.push("#popup1");
                      }}
                    >
                      Change Password
                    </button> */}
                    <a href="#popup1"><input type="button"className={styles.passwordButton} value="change password"/></a>
                    {/* <a className={styles.passwordButton} href="#popup1">Change Password</a> */}
                  </div>
                </div>
              </div>
            </form>
          )}


          { <div id="popup1" className={styles.overlay} ref={passwordpopup}>

            <div className={styles.popup}>
              <div
                style={{
                  textAlign: "right",
                  paddingTop: "15px",
                  paddingRight: "20px",
                }}
              >
                <a href="#">
                  <AiOutlineClose />
                </a>
              </div>
              {/* <a className={styles.close} href="#">&times;</a> */}
              <div className={styles.forgotPasswordWrap}>
                <div className={styles.newHeading}>
                  <div className={styles.newHeadingInner}>
                    <h1> Change password</h1>
                    <h2></h2>
                  </div>
                </div>
                <form
                  className={styles.formContent}
                  onSubmit={handleSubmit1(newPassword)}
                >
                  <div className={styles.emailWrap}>
                    <div className={styles.fieldWrap}>
                      <label className={styles.textLabel}>
                        Enter current password
                      </label>
                      <input
                        type="password"
                        name="currentpassword"
                        {...register("currentpassword", { required: true })}
                        onKeyUp={() => {
                          trigger("currentpassword");
                        }}
                      />
                      <div className={styles.errmsg}>
                        {errors?.currentpassword?.type === "required" && (
                          <span>Password required</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.fieldWrap}>
                      <label className={styles.textLabel}>
                        Create new password
                      </label>
                      <input
                        type="password"
                        name="password"
                        {...register("password", { required: true ,minLength:6})}
                        onKeyUp={() => {
                          trigger("password");
                        }}
                      />
                      {errors.password && errors.password.type ==='required' && (<small className={styles.errmsg}>Enter Password</small>)}
														{errors.password && errors.password.type==='minLength' && (
                            <small className={styles.errmsg}>
                               length  must atleast 6 charactor
                            </small>
                          )}
                      
                    </div>

                    <div className={styles.fieldWrap}>
                      <label className={styles.textLabel}>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="cnfpassword"
                        {...register("cnfpassword", { required: true })}
                        onKeyUp={() => {
                          trigger("cnfpassword");
                        }}
                      />

                      {getValues("cnfpassword") &&
                        getValues("password") !== getValues("cnfpassword") && (
                          <div className={styles.errmsg}>
                            {" "}
                            <span>Password Not Match</span>
                          </div>
                        )}
                    </div>
                    {passwordSuccess && 
                    <small className={styles.success}>Password is successfully change</small>
                    } 
{passwordErr && <small className={styles.errmsg} style={{textAlign:"center",width:"100%"}}>
                               Incorrect Password
                            </small>}
                    <input
                      type="submit"
                      className={styles.submitBtn}
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>}
        </div>
      </SideSection>
    </>
  );
}

export default Profile;

//  if(detail.dob)
//  {
//   console.log(detail)
//   setDetail(prev=>{return {...prev,dob:dayjs(prev.dob).format("DD/MM/YYYY")}})
//  }
