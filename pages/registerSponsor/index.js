import { React, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm,Controller } from "react-hook-form";
import { ButtonToggle } from "reactstrap";
import checkMarkImg from "../../images/checkMark.png";
import Connect from "../../components/commen/connect/ConnectLayout";
import useDataQuery, { fetcher } from "../../hooks/useDataQuery";
import FileUpload from "../../components/FileExport/FileUpload/FileUpload";
import FileList from "../../components/FileExport/FileList/FileList";
import styles from "./register.module.css";
import { usePopUp } from "../../hooks/usePopUp";
import Link from 'next/link'
import PhoneInput,{ formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const RegisterPage = () => {
  const [checkMark2, setCheckMark2] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileAlreadyExist, setFileAlreadyExist] = useState(false);
  const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([]);
  const [showPopup, hidePopup] = usePopUp();
	const[error,setError]=useState(null)
const [phonenumber,setPhoneNumber]=useState()
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isSubmitted: isSubmitted2 },
    getValues: getValues2,
    trigger: trigger2,reset,control,
  } = useForm();
  const [categorydata, errors] = useDataQuery({
    key: "/public/get-categories",
    data: {},
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
  console.log("phonenumber",phonenumber);
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
  const toggleCheck2 = () => {
    setCheckMark2((prev) => {
      return !prev;
    });
  };
  const [errorStatus, setErrorStatus] = useState(false);
  const [activationStatus, setActivationStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const router = useRouter();

  const CoperateErrors = () => {
    const errorTxt = [];
    if (!checkMark2 && isSubmitted2) {
      errorTxt.push("Please accept terms & conditions");
    }
    
    // if (errors2.company_name?.type === 'required' || errors2.address?.type === 'required' || errors2.mobile?.type === 'required' || errors2.email?.type === 'required' || errors2.documents?.type === 'required' || errors2.password?.type === 'required' || errors2.contact_person_name?.type === 'required' || errors2.re_password?.type === 'required') {
    // 	errorTxt.push('All fields are required')
    // }
    // if (errors2.email?.type === 'pattern') {
    // 	errorTxt.push('Email is incorrect')
    // }
    // if (errors2.mobile?.type === 'pattern') {
    // 	errorTxt.push('Phone number is incorrect')
    // }
    // if (getValues2('password') !== getValues2('re_password')) {
    // 	errorTxt.push('Passwords do not match')
    // }
    return errorTxt;
  };
  const [mail, setMail] = useState("");

  const corporateFormSubmit = async (values) => {
    console.log({ values });
    const contactMail = getValues2("email");
    console.log("contactMail", contactMail);
    setMail(contactMail);
    console.log("mail", mail);
    const coporateData = new FormData();
    console.log({ files });

    coporateData.append("company_name", values.company_name);
    coporateData.append("contact_person_name", values.contact_person_name);
    coporateData.append("email", values.email);
    coporateData.append("address", values.address);
    coporateData.append("mobile", values.mobile);
    coporateData.append("password", values.password);
    coporateData.append("re_password", values.re_password);
    coporateData.append("interested_categories", values.category);


    files.forEach((docs) => {
      console.log({ docs });
      coporateData.append("documents", docs);
    });
    console.log("form data :", ...coporateData);
    try {
      if (checkMark2 && getValues2("password") === getValues2("re_password")) {
        console.log({ checkMark2 });
        if (checkMark2) {
          console.log({ checkMark2 });

          console.log("corporate");
          const data = await fetcher({
            key: "/sponsor/register",
            data: coporateData,
          });
          // const formData = new FormData()
          // formData.append('file', data.file[0])
          console.log("fetchdata", data);
          if (data && data.data.success === true) {
            console.log({ data });
            reset();
            setError(null)
            showPopup({
              transparent: true,
              showClose: true,
              heading: "Registration successful",
              customContent: (
                <>
                  {" "}
                  Your user account has been created,
                </>
              ),
              pointFinger: true,
              message:<><p>After verification an email will sent to you.<br/>Click on the link in email then your user account will be activated.</p></>,
              gotoEmailAction: () => {
                console.log("gotoEmailAction");
                hidePopup();
              },
              resendEmailAction: () => {
                console.log("resendEmailAction");
                hidePopup();
              },
            });
            setPhoneNumber('')
          } else {
            setError(data.data.message)
          }
        }
      }
    } catch (e) {
      showPopup({
        transparent: true,
        showClose: true,
        ThumbDown: true,
        heading: "CError !",
        customContent: <>{e.message}</>,
      });
      //setError(e.message)
    }
    // setActivationStatus(true)
  };
  // instead of react forms, should be changed
  return (
    <div>
      <Connect>
        <div className={styles.section2}>
          <div className={styles.hybridForm}>

            <h4 className={styles.formTitle}>Register As Sponsor</h4>


            <div className={styles.corporateForm}>
              <form
                name="corportateFormEntry"
                className={styles.corportateFormEntry}
                onSubmit={handleSubmit2(corporateFormSubmit)}
              >
                <div className={styles.formContent2}>
                  <div className={styles.mainflex}>
                    <div className={styles.companySec}>

                      <div className={styles.textandlabel}>

                        <div className={styles.companySecValidate}>
                          <span htmlFor="companyName" className={styles.textspan}>
                            Company Name
                          </span>
                          <input
                            type="text"
                            className={styles.companytext}
                            name="company_name"
                            {...register2("company_name", { required: true,minLength:3 })}
                            onKeyUp={() => {
                              trigger2("company_name");
                            }}
                          />
                          {errors2.company_name && errors2.company_name.type==='required' && (
                            <small className={styles.errorMessage}>
                              Name is Required
                            </small>
                          )}
                          {errors2.company_name && errors2.company_name.type==='minLength' && (
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
                            {...register2("address", { required: true })}
                            onKeyUp={() => {
                              trigger2("address");
                            }}
                          />
                          {errors2.address && (
                            <small className={styles.errorMessage}>
                              Address is Required
                            </small>
                          )}
                        </div>
                      </div>
                      <div className={styles.textandlabel}>

                        <div className={styles.companySecValidate}>
                          <span htmlFor="Category" className={styles.textspan}>
                            Category
                          </span>
                          <select
                            className={styles.inputtext}
                          
                            name="category"
                            {...register2("category", { required: true })}
                            onKeyUp={() => {
                              trigger2("category");
                            }}
                          >
                            <option value={''} selected disabled hidden>Select Category</option>
                            {
                              categories?.map((cat) => {
                                
                                return (<option key={cat._id} value={cat._id}>{cat.name}</option>)

                              })
                            }
                          </select>
                          {errors2.category && (
                            <small className={styles.errorMessage}>
                              Select Category
                            </small>
                          )}
                        </div>
                      </div>
                      <div className={styles.textandlabel}>

                        <div className={styles.companySecValidate}>
                          <span htmlFor="documents" className={styles.textspan}>
                            Document
                          </span>
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
                        </div>
                      </div>
                    </div>
                    <h5 style={{'alignSelf':'start','marginTop':'10px',marginBottom:'10px',paddingLeft:"10px"}}>Contact Person</h5>

                    <div className={styles.companySec}>

                      <div className={styles.textandlabel}>
                        <div className={styles.companySecValidate}>
                          <span htmlFor="Name" className={styles.textspan}>
                            Name
                          </span>
                          <input
                            type="text"
                            className={styles.companytext}

                            name="contact_person_name"
                            {...register2("contact_person_name", {
                              required: true,minLength:3
                            })}
                            onKeyUp={() => {
                              trigger2("contact_person_name");
                            }}
                          />
                          {errors2.contact_person_name && errors2.contact_person_name.type==='required' && (
                            <small className={styles.errorMessage}>
                              Name is Required
                            </small>
                          )}
                           {errors2.contact_person_name && errors2.contact_person_name.type==='minLength' && (
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
                          <span htmlFor="phone" className={styles.textspan}>
                            Phone Number
                          </span>
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
						   {errors2.mobile && (
                            <small className={styles.errorMessage}>
                            Mobile number is required
                            </small>
                          )}
                         
                          
                        </div>
                      </div>
                      <div className={styles.companySec}>
                        <div className={styles.textandlabel}>
                        <div className={styles.companySecValidate}>
                          <label className={styles.textspan}>Password</label>
                          <input
                            type="password"
                            className={styles.companytext}

                            name="password"
                            {...register2("password", { required: true ,minLength:6 })}
                            onKeyUp={() => {
                              trigger2("password");
                            }}
                          />
                          {errors2.password && errors2.password.type ==='required'&&(
                            <small className={styles.errorMessage}>
                              Password Required
                            </small>
                          )}
                          {errors2.password && errors2.password.type==='minLength' && (
                            <small className={styles.errorMessage}>
                               length  must atleast 6 charactor
                            </small>
                          )}
                        </div>
                        </div>

                        <div className={styles.textandlabel}>
                        <div className={styles.companySecValidate}>
                          <label className={styles.textspan}>Confirm Password</label>
                          <input
                            type="password"
                            className={styles.companytext}

                            name="re_password"
                            {...register2("re_password", { required: true })}
                            onKeyUp={() => {
                              trigger2("re_password");
                            }}
                          />
                          {getValues2("re_password")&& getValues2("password") !==
                            getValues2("re_password") && (
                              <small className={styles.errorMessage}>
                                Password Not Match
                              </small>
                            )}
                        </div>
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
												<a> <span>Terms & Condition</span></a></Link>
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
{ <div className={styles.errorMessageSubmit}> <span>{error}</span></div>}
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
          </div>
        </div>
      </Connect>


     
    </div>
  );
};
export default RegisterPage;

