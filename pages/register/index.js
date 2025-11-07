import { React, useState, useRef } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm ,Controller} from "react-hook-form";
import checkMarkImg from "../../images/checkMark.png";
import Connect from "../../components/commen/connect/ConnectLayout";
import useDataQuery, { fetcher } from "../../hooks/useDataQuery";
import FileUpload from "../../components/FileExport/FileUpload/FileUpload";
import FileList from "../../components/FileExport/FileList/FileList";
import styles from "./register.module.css";
import { usePopUp } from "../../hooks/usePopUp";
import Link from "next/link";

const RegisterPage = () => {
  const [individualType, setIndividualType] = useState(true); //	true - individual, false - corporate
  const [checkMark1, setCheckMark1] = useState(false);
  const [checkMark2, setCheckMark2] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileAlreadyExist, setFileAlreadyExist] = useState(false);
  const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([]);
  const [error, setError] = useState(null);

  // const [gg,dd]=useDataQuery({key:'/applicant/register'})
  const [showPopup, hidePopup] = usePopUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
    trigger,
    watch,
    reset,
	control,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  console.log(password.current);
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isSubmitted: isSubmitted2 },
    getValues: getValues2,
    trigger: trigger2,
    reset: reset2,
	control:control2,
  } = useForm();
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
  const toggleCheck1 = () => {
    setCheckMark1((prev) => {
      return !prev;
    });
  };
  const toggleCheck2 = () => {
    setCheckMark2((prev) => {
      return !prev;
    });
  };
  const [errorStatus, setErrorStatus] = useState(false);
  const [activationStatus, setActivationStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const router = useRouter();
  const printErrors = () => {
    const errorTxt = [];
    // 	//	checkmark validation
    if (!checkMark1 && isSubmitted) {
      errorTxt.push("Please accept terms & conditions");
    }

    return errorTxt;
  };
  const CoperateErrors = () => {
    const errorTxt = [];
    if (!checkMark2 && isSubmitted2) {
      errorTxt.push("Please accept terms & conditions");
    }

    return errorTxt;
  };
  const [mail, setMail] = useState("");
  const [mobile, setMobile] = useState("");
  const [phonenumber, setPhoneNumber] = useState();
  const [phonenumber1, setPhoneNumber1] = useState();
  const [coperateNumber, setCoperateNumber] = useState();
  console.log("usermail", mail);
  console.log("coprtphn", coperateNumber);
  console.log("phonenumberphonenumber", phonenumber);
  const individualFormSubmit = async (values) => {
    console.log("values", values);
    const individualData = new FormData();
    individualData.append("first_name", values.first_name);
    individualData.append("last_name", values.last_name);
    individualData.append("email", values.email);
    individualData.append("mobile", values.mobile);
    individualData.append("password", values.password);
    individualData.append("re_password", values.re_password);
    individualData.append("dob", values.dob);
    individualData.append("gender", values.gender);
    individualData.append("type", 0);
    const re_password = getValues("re_password").length;
    console.log("re_passwordddddddd", re_password);
    // console.log("passswordddddddd",getValue('re_password'));
    if (checkMark1 && getValues("password") === getValues("re_password")) {
      console.log("form submit");
      const individualmail = getValues("email");
      console.log("individual mail :", individualmail);
      setMail(individualmail);
      setMobile(getValues("mobile"));
      const data = await fetcher({
        key: "/applicant/register",
        data: individualData,
      });
      console.log("data", data);
      if (data && data.data.success === true) {
        console.log("succ", data);
        console.log("succmail", individualmail);
        showPopup({
          transparent: true,
          showClose: true,
          heading: "Registration Successful",
          customContent: <> Your user account has been created ,</>,
          pointFinger: true,
          message: (
            <>
              <p>
                An email has been sent to you.
                <br />
                Please click on the link in the email then your user account
                will be activated
              </p>
            </>
          ),
          // "An email has been sent to you.\n Please click on the link in the email then your user account will be activated",
          gotoEmailAction: () => {
            console.log("gotoEmailAction");
            hidePopup();
          },
          resendEmailAction: () => {
            console.log("resendEmailAction");
            hidePopup();
          },
        });
        reset();
        setError(null);
      } else {
        setError(data.data.message);
      }
    }
  };
  const corporateFormSubmit = async (values) => {
    console.log(values);
    const contactMail = getValues2("email");
    console.log("contactMail", contactMail);
    setMail(contactMail);
    setMobile(getValues2("mobile"));
    console.log(mobile);
    console.log("mail", mail);
    const coporateData = new FormData();
    coporateData.append("type", 1);
    coporateData.append("company_name", values.company_name);
    coporateData.append("contact_person_name", values.contact_person_name);
    coporateData.append("email", values.email);
    coporateData.append("address", values.address);
    coporateData.append("mobile", values.mobile);
    coporateData.append("password", values.password);
    coporateData.append("re_password", values.re_password);
    files.forEach((docs) => {
      console.log({ docs });
      coporateData.append("documents", docs);
    });
    console.log("form data :", ...coporateData);

    // coporateData.append('file', files)

    try {
      if (checkMark2 && getValues2("password") === getValues2("re_password")) {
        console.log("corporate");
        const data = await fetcher({
          key: "/applicant/register",
          data: coporateData,
        });
        // const formData = new FormData()
        // formData.append('file', data.file[0])
        console.log("fetchdata", data);
        if (data && data.data.success === true) {
          console.log({ data });
          showPopup({
            transparent: true,
            showClose: true,
            heading: "Registration Successful",
            // customContent: <> An activation email was send to < span > {values.email}</span ></>,
            customContent: <> Your user account has been created ,</>,
            pointFinger: true,
            message: (
              <>
                <p>
                  An email has been sent to you.
                  <br />
                  Please click on the link in the email then your user account
                  will be activated
                </p>
              </>
            ),
            gotoEmailAction: () => {
              console.log("gotoEmailAction");
              hidePopup();
            },
            resendEmailAction: () => {
              console.log("resendEmailAction");
              hidePopup();
            },
          });
          reset2();
          setError(null);
        } else {
          setError(data.data.message);
          // setErrorStatus(true)
        }
      }
    } catch (e) {
      console.log("error :", { e });
      showPopup({
        transparent: true,
        showClose: true,
        ThumbDown: true,
        heading: "Error !",
        customContent: <>{e.message}</>,
      });
    }
    // setActivationStatus(true)
  };
  // instead of react forms, should be changed
  return (
    <div>
      <Connect>
        <div className={styles.section2}>
          <div className={styles.hybridForm}>
            <h5 className={styles.formHeading}>Register As Applicant </h5>
            <div className={styles.tabType}>
              <div
                className={styles.tabTypeIndividual}
                style={{
                  backgroundColor: individualType ? "#9E8959" : "#D9D9D9",
                  color: individualType ? "#fff" : "#000",
                }}
                onClick={() => {
                  reset();
                  setError(null);
                  setIndividualType(true);
                }}
                onKeyDown={() => {
                  setIndividualType(true);
                }}
                tabIndex={0}
                role="button"
              >
                Individual
              </div>
              <div
                className={styles.tabTypeCorporate}
                style={{
                  backgroundColor: !individualType ? "#9E8959" : "#D9D9D9",
                  color: !individualType ? "#fff" : "#000",
                }}
                onClick={() => {
                  reset();
                  setError(null);
                  setIndividualType(false);
                }}
                onKeyDown={() => {
                  setIndividualType(false);
                }}
                tabIndex={0}
                role="button"
              >
                Corporate
              </div>
            </div>
            {individualType && (
              <div className={styles.individualForm}>
                <form
                  name="individualFormEntry"
                  className={styles.individualFormEntry}
                  onSubmit={handleSubmit(individualFormSubmit)}
                >
                  <div className={styles.formContent1}>
                    <div className={styles.formContentFlex1}>
                      <div className={styles.formContentWrapDiv1}>
                        <span htmlFor="first_name">First Name</span>
                        <div className={styles.validateMessage}>
                          <input
                            type="text"
                            id="first_name"
                            {...register("first_name", {
                              required: true,
                              minLength: 3,
                            })}
                            onKeyUp={() => {
                              trigger("first_name");
                            }}
                          />
                          {errors.first_name &&
                            errors.first_name.type === "required" && (
                              <small className={styles.errorMessage}>
                                Name is Required
                              </small>
                            )}
                          {errors.first_name &&
                            errors.first_name.type === "minLength" && (
                              <small className={styles.errorMessage}>
                                You must provide at least 3 characters
                              </small>
                            )}
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv2}>
                        <span htmlFor="last_name">Last Name</span>
                        <div className={styles.validateMessage}>
                          <input
                            type="text"
                            name="last_name"
                            {...register("last_name", { required: true })}
                            onKeyUp={() => {
                              trigger("last_name");
                            }}
                          />
                          {errors.last_name && (
                            <small className={styles.errorMessage}>
                              LastName is Required
                            </small>
                          )}
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv1}>
                        <span htmlFor="email">Email</span>
                        <div className={styles.validateMessage}>
                          <input
                            type="email"
                            name="email"
                            {...register("email", {
                              required: true,
                              pattern:
                                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            })}
                            onKeyUp={() => {
                              trigger("email");
                            }}
                          />
                          {errors.email && (
                            <small className={styles.errorMessage}>
                              Invalid Email
                            </small>
                          )}
                        </div>
                      </div>
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

                          
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv1}>
                        <span htmlFor="password">Password</span>
                        <div className={styles.validateMessage}>
                          <input
                            type="password"
                            name="password"
                            {...register("password", {
                              required: true,
                              minLength: 6,
                            })}
                            onKeyUp={() => {
                              trigger("password");
                            }}
                          />

                          {errors.password &&
                            errors.password.type === "required" && (
                              <small className={styles.errorMessage}>
                                Enter Password
                              </small>
                            )}
                          {errors.password &&
                            errors.password.type === "minLength" && (
                              <small className={styles.errorMessage}>
                                length must atleast 6 charactor
                              </small>
                            )}
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv2}>
                        <span htmlFor="re_password">Confirm Password</span>
                        <div className={styles.validateMessage}>
                          <input
                            type="password"
                            name="re_password"
                            {...register(
                              "re_password",
                              { required: true }
                              //   { validate:(value)=>{ return (value===password.current?true:false)} }
                            )}
                            onKeyUp={() => {
                              trigger("re_password");
                            }}
                          />
                          {getValues("re_password") &&
                            getValues("password") !==
                              getValues("re_password") && (
                              <small className={styles.errorMessage}>
                                Password Not Match
                              </small>
                            )}
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv2}>
                        <span htmlFor="dob">Date Of Birth</span>
                        <div className={styles.validateMessage}>
                          <input
                            className={styles.dob}
                            type="date"
                            name="dob"
                            {...register("dob")}
                            onKeyUp={() => {
                              trigger("dob");
                            }}
                          />
                          {/* {errors.dob && (
                            <small className={styles.errorMessage}>
                              Enter date of birth
                            </small>
                          )} */}
                        </div>
                      </div>
                      <div className={styles.formContentWrapDiv1}>
                        <span htmlFor="gender">Gender</span>
                        <div className={styles.validateMessage}>
                          <select
                            className={styles.selector}
                            name="gender"
                            {...register("gender")}
                            onKeyUp={() => {
                              trigger("gender");
                            }}
                          >
                            <option value="" disabled selected>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {/* {errors.gender && (
                            <small className={styles.errorMessage}>
                              Gender Required
                            </small>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.accept}>
                    {/* <input required type="checkbox" /> */}
                    <div
                      className={styles.checkBox}
                      onClick={() => {
                        toggleCheck1();
                      }}
                      onKeyDown={() => {
                        toggleCheck1();
                      }}
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
                          <span>Terms & Condition</span>
                        </a>
                      </Link>
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
                        );
                      })}
                    </p>
                  )}
                  <input
                    type="submit"
                    className={styles.payAndPublish}
                    value="Register"
                  />
                  {
                    <div className={styles.errorMessageSubmit}>
                      {" "}
                      <span>{error}</span>
                    </div>
                  }

                  <div className={styles.already}>
                    <p>
                      Already have an Account?{" "}
                      <span
                        onClick={() => {
                          router.push("/login");
                        }}
                        onKeyDown={() => {
                          router.push("/login");
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        Sign in
                      </span>{" "}
                    </p>
                  </div>
                </form>
              </div>
            )}
            {!individualType && (
              <div className={styles.corporateForm}>
                
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
                            <span
                              htmlFor="companyName"
                              className={styles.textspan}
                            >
                              Company Name
                            </span>
                            <input
                              type="text"
                              className={styles.companytext}
                              name="company_name"
                              {...register2("company_name", {
                                required: true,
                                minLength: 3,
                              })}
                              onKeyUp={() => {
                                trigger2("company_name");
                              }}
                            />
                            {errors2.company_name &&
                              errors2.company_name.type === "required" && (
                                <small className={styles.errorMessage}>
                                  Name is Required
                                </small>
                              )}
                            {errors2.company_name &&
                              errors2.company_name.type === "minLength" && (
                                <small className={styles.errorMessage}>
                                  You must provide at least 3 characters
                                </small>
                              )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span htmlFor="address" className={styles.textspan}>
                              Address
                            </span>

                            <input
                              className={styles.companytext}
                              name="address"
                              {...register2("address", {
                                required: true,
                                minLength: 5,
                              })}
                              onKeyUp={() => {
                                trigger2("address");
                              }}
                            />
                            {errors2.address &&
                              errors2.address.type === "required" && (
                                <small className={styles.errorMessage}>
                                  Address is Required
                                </small>
                              )}
                            {errors2.address &&
                              errors2.address.type === "minLength" && (
                                <small className={styles.errorMessage}>
                                  You must provide at least 5 characters
                                </small>
                              )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span
                              htmlFor="Password"
                              className={styles.textspan}
                            >
                              Password
                            </span>

                            <input
                              type="password"
                              className={styles.companytext}
                              name="password"
                              {...register2("password", {
                                required: true,
                                minLength: 6,
                              })}
                              onKeyUp={() => {
                                trigger2("password");
                              }}
                            />
                            {errors2.password &&
                              errors2.password.type === "required" && (
                                <small className={styles.errorMessage}>
                                  Password Required
                                </small>
                              )}
                            {errors2.password &&
                              errors2.password.type === "minLength" && (
                                <small className={styles.errorMessage}>
                                  length must atleast 6 charactor
                                </small>
                              )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span
                              htmlFor="confirm_password"
                              className={styles.textspan}
                            >
                              Confirm Password
                            </span>

                            <input
                              type="password"
                              className={styles.companytext}
                              name="re_password"
                              {...register2("re_password", { required: true })}
                              onKeyUp={() => {
                                trigger2("re_password");
                              }}
                            />
                            {getValues2("re_password") &&
                              getValues2("password") !==
                                getValues2("re_password") && (
                                <small className={styles.errorMessage}>
                                  Password Not Match
                                </small>
                              )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <span htmlFor="documents" className={styles.textspan}>
                            Document
                          </span>
                          <div className={styles.companySecValidate}>
                            <div className={styles.fileSelection}>
                              <FileUpload
                                files={files}
                                setFiles={setFiles}
                                removeFile={removeFile}
                                uploadHandler={uploadHandler}
                              />
                              <FileList
                                files={files}
                                removeFile={removeFile}
                                {...register2("file")}
                              />
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                      <h5
                        style={{
                          alignSelf: "start",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        className={styles.contactPerson}
                      >
                        Contact Person
                      </h5>

                      <div className={styles.companySec}>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span htmlFor="name" className={styles.textspan}>
                              Name
                            </span>

                            <input
                              type="text"
                              className={styles.companytext}
                              name="contact_person_name"
                              {...register2("contact_person_name", {
                                required: true,
                                minLength: 3,
                              })}
                              onKeyUp={() => {
                                trigger2("contact_person_name");
                              }}
                            />
                            {errors2.contact_person_name &&
                              errors2.contact_person_name.type ===
                                "required" && (
                                <small className={styles.errorMessage}>
                                  Name is Required
                                </small>
                              )}
                            {errors2.contact_person_name &&
                              errors2.contact_person_name.type ===
                                "minLength" && (
                                <small className={styles.errorMessage}>
                                  You must provide at least 3 characters
                                </small>
                              )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span htmlFor="email" className={styles.textspan}>
                              Email
                            </span>

                            <input
                              type="text"
                              className={styles.companytext}
                              name="email"
                              {...register2("email", {
                                required: true,
                                pattern:
                                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              })}
                              onKeyUp={() => {
                                trigger2("email");
                              }}
                            />
                            {errors2.email && (
                              <small className={styles.errorMessage}>
                                Email Required
                              </small>
                            )}
                          </div>
                        </div>
                        <div className={styles.textandlabel}>
                          <div className={styles.companySecValidate}>
                            <span htmlFor="mobile" className={styles.textspan}>
                              Phone Number
                            </span>
                            {/* <PhoneInput/> */}
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
									coperateNumber
                                    ? isValidPhoneNumber(coperateNumber)
                                      ? undefined
                                      : "Invalid phone number"
                                    : "Phone number required"
                                }
                                
                              />
							  
                              
                            )}
                          />
{errors2.mobile && (
								<small className={styles.errorMessage}>
								Mobile number is required
								</small>
							  )} 
							
                                                     </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                  <div className={styles.accept}>
                   
                    <div
                      className={styles.checkBox}
                      onClick={() => {
                        toggleCheck2();
                      }}
                      onKeyDown={() => {
                        toggleCheck2();
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {checkMark2 && (
                        <Image src={checkMarkImg} width="10" height="10" />
                      )}
                    </div>
                    <p>
                      I do accept the
                      <Link href="/terms&condition">
                        <a>
                          <span>Terms & Condition</span>
                        </a>
                      </Link>
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
                        );
                      })}
                    </p>
                  )}
                  <input
                    type="submit"
                    className={styles.payAndPublish}
                    value="Register"
                  />
                  {error && (
                    <div className={styles.errorMessageSubmit}>
                      {" "}
                      <span>{error}</span>
                    </div>
                  )}

                  <div className={styles.already}>
                    <p>
                      Already have an Account?
                      <span
                        onClick={() => {
                          router.push("/login");
                        }}
                        onKeyDown={() => {
                          router.push("/login");
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        Sign in
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Connect>

      {fileAlreadyExist && (
        <ErrorPopup
          heading="Error !"
          content={`${fileNameAlreadyExist.toString()} already selected !`}
          onClick={() => {
            setFileAlreadyExist(false);
          }}
        />
      )}
    </div>
  );
};
export default RegisterPage;
