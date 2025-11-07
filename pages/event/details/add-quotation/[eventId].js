
import React, { useContext, useEffect, useState } from 'react'
import Bar from '../../../../components/commonBar'
import Button from '../../../../components/Button'

import styles from './quotation.module.css'
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { useRouter } from 'next/router'
import { AuthContext } from '../../../../store/context';
import FileUpload from '../../../../components/FileExport/FileUpload/FileUpload';
import FileList from '../../../../components/FileExport/FileList/FileList';
import { useForm, useWatch } from 'react-hook-form'
import useDataQuery, { fetcher } from '../../../../hooks/useDataQuery';

function Quotation() {
    const [files, setFiles] = useState([])

    const router = useRouter()
    const { userData, setUserData } = useContext(AuthContext)
    const user = userData.userType
    const eventId = router.query.eventId
const eventD=router.query
console.log("eventD",eventD)
    console.log("eventid query",{eventId});
    const [fileAlreadyExist, setFileAlreadyExist] = useState(false)
    const [fileNameAlreadyExist, setFileNameAlradyExist] = useState([])
    const [submitError, setSubmitErr] = useState(null)
    // react hook form
    //react form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        getValues,
        trigger, watch, resetField, reset, setValue
    } = useForm();
    // const amount=useWatch({name:'amount'})
    const addQuotation = async (values) => {
       const aaaa= getValues("amount")
       console.log("aaaa",aaaa);
        try {

            console.log('submitted');
            console.log("values", values);
            const addQuotationData = new FormData();
            console.log("added files :", { files });

            addQuotationData.append('amount', values.amount)
            addQuotationData.append('note', values.note)
            addQuotationData.append('event_id', eventId)


            files.map((docs) => {
                console.log({ docs });
                addQuotationData.append("documents", docs);
            });
            console.log("form data :", { ...addQuotationData })



            const data = await fetcher({
                key: `/organizer/add-quotation`,
                data: addQuotationData,
                header: { headers: { token: userData.token } }
            });
            console.log("fetchdata", data);
            if (data.data && data.data.success === true) {
                console.log(data);

                reset()
                setFiles([])
                router.back()

            } else {
                setSubmitErr(data.data.message)
                console.log('s-error', data.data.message);
            }
        } catch (e) {
            alert(e);

        }
    };

    //file configurations
    const removeFile = (filename) => {
        setFiles((prev) => {
            return prev.filter(
                (fl) => {
                    return (fl.name !== filename)
                }
            )
        })
    }
    // 
    useEffect(() => {
		switch (parseInt(user)) {
			case 1:
				console.log('iam applicant');
				setUrl('applicant')

				break;
			case 2:
				console.log('iam orgaizer');

				setUrl('organizer')

				break;
			case 3:
				console.log('iam sponosor');

				setUrl('sponsor')


				break;
			default:
				break;

		}
	}, [userData])
    const [url, setUrl] = useState('')
    const [fData,error,mutate] = useDataQuery({ key: `/${url}/event-details`, data: { id: `${eventId}` }, header: { headers: { token: userData.token } } })
    useEffect(()=>{
        if(fData?.data)
        {
            setValue("amount",fData?.data?.data?.budget)
        }
    },[fData])
	console.log("dddddddddd",{ fData });
    // const budget=fData?.data.data.budget
    // console.log("budget",budget);
    // console.log("ssssssssssss",fData?.data.data.budget)
    // 
    const uploadHandler = (event) => {
        setFileNameAlradyExist([])
        const file = Array.from(event.target.files)

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

    // const defaultValues = {
    //     amount: {budget}
    //   };

//     useEffect(() => {
// let defaultValues={};
// defaultValues.amount={budget}
// console.log("def",defaultValues.amount);
// reset({...defaultValues})
//     }, [])

    if (user == 2) {
        return (
            <Bar active={2}>
                <div style={{ display: 'flex' }}>
                    <div className={styles.sidebarCover}></div>
                    <div className={styles.quoteBox}>
                        <form onSubmit={handleSubmit(addQuotation)}>
                            {/* style={{ padding: '10px' }} */}
                            <div className={styles.quoteInnerBox}>

                                <div className={styles.bidInput}>
                                    <p className={styles.bidInputText}>Quotation Bid</p>
                                    <input {...register('amount', { required: true, min: 1 })}  type="number" className={styles.bidInputBox}></input>
                                {!getValues("amount") && errors.amount?.type==='required' && (<small className={styles.errorMessage}>This field is required</small>)}

                                </div>
                                                    <div className={styles.bidInput}>
                                    <p className={styles.bidInputText}>Documents</p>
                                    <div className={styles.bidInputBox}>
                                        <FileUpload
                                            files={files}
                                            setFiles={setFiles}
                                            removeFile={removeFile}
                                            uploadHandler={uploadHandler}
                                        />
                                        <FileList files={files} removeFile={removeFile} />
                                    </div>
                                </div>

                                <div className={styles.bidInputWrap}>

<p className={styles.bidInputText}>Add Notes</p>

<textarea rows="4"{...register('note', { required:true,minLength: 3 })} className={styles.bidInputTextBox} ></textarea>
{errors?.note?.type==='minLength' && (<small className={styles.errorMessage}>Minimum three characters required</small>)}
{errors?.note?.type==='required' && (<small className={styles.errorMessage}>This field is required</small>)}


</div>


                            </div>
                            <div className={styles.quoteInnerBoxButton}>
                                <Button type={'submit'} className={styles.okayBtn} text={'Submit'}></Button>
                                {submitError && (<small className={styles.errorMessage}>{submitError}</small>)}

                            </div>


                        </form>
                    </div>
                </div>
            </Bar>
        )
    }
    else {
        return (<>Loading...</>)
    }

}

export default Quotation