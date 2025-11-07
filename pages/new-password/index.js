import styles from './newPassword.module.css'
import Connect from '../../components/commen/connect/ConnectLayout';
import { useEffect, useState } from 'react'
// import Success from '../../components/popups/success/Success'
import { useRouter } from 'next/router';
import { fetcher } from '../../hooks/useDataQuery';
import { useForm } from 'react-hook-form'
import { usePopUp } from '../../hooks/usePopUp'

import jwtDecode from 'jwt-decode';




function ForgotPassword() {
    const {
        register, handleSubmit, formState: { errors, isSubmitted }, getValues, trigger,reset
    } = useForm()
    const [successStatus, setSuccessStatus] = useState(false)
    const [errorMessage, seterrorMessage] = useState(null)
    const [catchError, setCatchError] = useState(false)
    const [showPopup, hidePopup] = usePopUp()

    const [usertype, setUsertype] = useState(null)
    const [userUrl, setUserUrl] = useState('')

    const [successMsg, setSuccessMsg] = useState(false)

    const router = useRouter()
    const token = router.query.token

    useEffect(() => {
        console.log('token', { token });
        const tokenData = token && jwtDecode(token)
        console.log({ tokenData });
        if (tokenData) {
            switch (parseInt(tokenData.data.role)) {

                case 1:
                    setUserUrl('applicant')
                    break;
                case 2:
                    setUserUrl('organizer')
                    break;
                case 3:
                    setUserUrl('sponsor')
                    break;
                default:
                    break;

            }
        }

    }, [router]);

    const newPassword = async (values) => {

        console.log('values')
        console.log(values)
        const newPasswordData = new FormData()
        newPasswordData.append('token', token)
        newPasswordData.append('password', values.password)
        newPasswordData.append('re_password', values.cnfpassword)
        try {
            const resp = await fetcher({ key: `/${userUrl}/reset-password`, data: newPasswordData })
            console.log('fetchdata', resp)

            if (resp && resp?.data?.success === true) {

                console.log({ resp })
                setSuccessMsg(true)
                reset()
                setTimeout(()=>{
                    router.push('/login')
                },2000)
                // showPopup({
                //     successTick: true,
                //     transparent: true,
                //     heading: 'Success !',
                //     showClose: true,
                //     content: 'Password reset sucessfully !'
                // })

            }
            else {
                seterrorMessage(resp?.data?.message)
                // showPopup({
                //     transparent: true,
                //     showClose: true,
                //     ThumbDown: true,
                //     heading: 'Error !',
                //     customContent: <>{!resp?.data?.validation_err ? resp?.data?.message : resp?.data?.validation_err?.message}</>
                // })
                // alert(resp.data.message)
            }
        }
        catch (e) {

            setCatchError(e.message)
            setCatchError(true)
            // showPopup({
            //     transparent: true,
            //     showClose: true,
            //     ThumbDown: true,
            //     heading: 'Error !',

            //     customContent: <>{e.message}</>

            // })
        }
    }
    return (

        <Connect>
            <div className={styles.forgotPasswordWrap}>


                <div className={styles.newHeading}>
                    <div className={styles.newHeadingInner}>
                        <h1> New password

                        </h1>
                        <h2>

                        </h2>
                    </div>
                    <p> Enter your new password</p>
                </div>

                <form className={styles.formContent} onSubmit={handleSubmit(newPassword)}>
                    {/* // { (e) => {e.preventDefault();setSuccessStatus(true)}}> */}
                    <div className={styles.emailWrap}>
                        <div className={styles.fieldWrap}>
                            <label className={styles.textLabel}>Create new password</label>
                            <input type="password" name="password"  {...register("password", { required: true,minLength:6  })}
                                onKeyUp={() => {
                                    trigger("password");
                                }} />

                            <div className={styles.errmsg}>{errors.password && errors.password.type === 'required' && <span>Password required</span>}</div>
                            <div className={styles.errmsg}>{errors.password && errors.password.type === 'minLength' && <span>length  must atleast 6 charactor</span>}</div>
                            {/* <div className={styles.errmsg}>{errors?.password?.type === 'minLength' && <span>Password must be </span>}</div> */}

                        </div>
                        <div className={styles.fieldWrap}>

                            <label className={styles.textLabel}>Confirm Password</label>
                            <input type="password" name="cnfpassword"
                                {...register("cnfpassword", { required: true })}
                                onKeyUp={() => { trigger("cnfpassword") }} />

                            {getValues("cnfpassword") && getValues("password") !== getValues("cnfpassword") &&
                                (<div className={styles.errmsg}> <span>Password Not Match</span></div>)}
                            {/* <div className={styles.errmsg}>{getValues('password') !== getValues('cnfpassword') &&"Password Not Match"}</div> */}


                        </div>
                    </div>
                  
                    <div className={styles.submitWrap} >
                        <input type="submit" value="Submit" />
                    </div>
                    {errorMessage && <div style={{ fontSize:'12px',textAlign: "center", color: "red" }}>{errorMessage ? errorMessage : ''}
                    </div>}
                    {successMsg && <div style={{ fontSize:'12px',textAlign: "center", color: "green" }}>Success !
                        Password reset sucessfully !</div>}
                    {catchError && <div style={{ fontSize:'12px',textAlign: "center", color: "red" }}>{catchError}
                    </div>}

                </form>



            </div>
            {/* {successStatus && <Success heading="Success !" content="You are now a new member !" onClick={() => { router.push('/login');setSuccessStatus(false)}} />} */}

        </Connect>

    )

}

export default ForgotPassword
