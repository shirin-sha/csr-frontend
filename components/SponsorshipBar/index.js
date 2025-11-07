import React, { useContext, useState } from 'react'
import styles from './spon.module.css'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { fetcher } from '../../hooks/useDataQuery'
import { AuthContext } from '../../store/context'
import { usePopUp } from '../../hooks/usePopUp'


function SponsBtmBar({ mySponsorShip, editMode, setEditMode, mutate, projectDetails, isSponsored, projectId, isSponsor, amount, balance, buttonHandler, button_value, messageHandler }) {

    const { register, reset, handleSubmit, formState: { errors, isSubmitted }, setValue, getValues, trigger, watch } = useForm()
    const { userData, setUserData } = useContext(AuthContext)
    const [fullamount, setFullAmount] = useState(false);
    const [showPopup, hidePopup] = usePopUp()

    console.log({ balance });
    console.log('error', errors.amount);
    //variables
    const user = userData.userType
    const sponsorType = localStorage.getItem('SponsorType')
    console.log({ sponsorType });

    const addSponsorShip = async (values) => {
        // console.log('submitted');
        let endPoint = `add-sponsorship`

        console.log({ values });
        console.log('prop', projectDetails.status);

        const sponsorship = new FormData()
        sponsorship.append('project_id', projectId)
        sponsorship.append('type', values.type)
        sponsorship.append('hide_name', values.hide_name)
        sponsorship.append('amount', values.amount)
        console.log('at bar componenet', { isSponsored });

        if (projectDetails.status === 'ACTIVE') {
            sponsorship.append('status', 0)

        } else if (projectDetails.status === 'QUEUE') {
            sponsorship.append('status', 1)

        }

        // switch edit or add sponsorship
        if (editMode) {
            endPoint = `editSponsor`
        }
        console.log({ ...sponsorship });
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
            if (!editMode && projectDetails.status === 'ACTIVE') {
                showPopup({
                    transparent: true,
                    content: `Your bid  of ${values.amount} has saved in sponsorship list`,
                    onOkPressed: () => { console.log("onOkPressed"); hidePopup() }
                })
            } else if (!editMode && projectDetails.status === 'QUEUE') {
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
    return (
        <div className={styles.container} >
            {/* <div className={styles.sidebarCover}></div>  */}
            <div className={styles.sponsorshipForm}>
                {isSponsor ? (
                    <div>
                        <form onSubmit={handleSubmit(addSponsorShip)} className={styles.form}>
                            {(isSponsored || editMode) &&
                                <div >
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
                                    <div className={styles.checkboxWrapper}>
                                        <input onClick={(e) => {
                                            console.log('full amount ', e.currentTarget.checked);
                                            setFullAmount(e.currentTarget.checked)
                                            e.currentTarget.checked ? setValue('amount', balance) : setValue('amount', null)
                                        }} type="checkbox" className={styles.checkBox} />
                                        <label className={styles.checkboxLabel}>
                                            Full Amount
                                        </label>

                                        {' '}
                                        <input {...register("amount", { required: true, min: 1, max: amount })} defaultValue={mySponsorShip.amount} className={!errors.amount ? styles.numberInput : styles.numberInputErr} id='amt' type="number" placeholder='Enter Amount' />
                                        {' '}
                                        {errors.amount && errors.amount.type === "required" && (<small className={styles.errorMessage}>Amount is Required </small>)}
                                        {errors.amount && errors.amount.type === "max" && (<small className={styles.errorMessage}>Amount is must be no more than Budget Amount</small>)}
                                        {errors.amount && errors.amount.type === "min" && (<small className={styles.errorMessage}>Amount is must be at least 1</small>)}



                                    </div>
                                    <div className={styles.checkboxWrapper}>
                                        <input {...register("hide_name")} type="checkbox" className={styles.checkBox} />
                                        <label className={styles.checkboxLabel}>
                                            Hide My Name
                                        </label>
                                    </div>

                                </div>

                            }
                           
                            <div className={styles.buttonGroup}>
                                <Button onClick={messageHandler} text={'Message'}></Button>
                                {editMode && <Button className={styles.btn} onClick={() => setEditMode(false)} text={'Cancel'}></Button>}

                                {(isSponsored || editMode) && <input className={styles.btn} type={'submit'} text={'Sponsor'}></input>}


                            </div>
                        </form>
                    </div>
                ) :
                    <div>
                        

                        <div className={styles.singlebutton}>
                            <Button onClick={buttonHandler} text={button_value}></Button>


                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SponsBtmBar