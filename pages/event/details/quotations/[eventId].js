
import React, { useContext, useEffect, useState } from 'react'
import Quotation from '../../../../components/quotationDetails'
import Bar from '../../../../components/commonBar'
import { useRouter } from 'next/router'


import styles from './quatation.module.css'
import { AuthContext } from '../../../../store/context'
import useDataQuery, { axiosDoc } from '../../../../hooks/useDataQuery'


const Eventquatation = () => {
	const router = useRouter()
	const { userData, setUserData } = useContext(AuthContext)
	const user = userData.userType
	const eventId = router.query.eventId
	console.log({ eventId });
	let userUrl = 'applicant'
	if (user == 1) {
		userUrl = 'applicant'

	} else if (user == 3) {
		userUrl = 'sponsor'
	}
	const [fData, error] = useDataQuery({ key: `/${userUrl}/list-quotation`, data: { eventId: eventId }, header: { headers: { token: userData.token } } })

	console.log('array', fData?.data?.data?.added_applicant);
	
	if (user == '3' || user == '1') {
		return (
			<Bar active={2}>
				<div className={styles.headingContainer}>
					<h3 className={styles.heading}>Quotations</h3>

				</div>
				{fData  && fData?.data?.data && fData?.data?.data?.organizers.length>0 ? (fData?.data?.data?.organizers).map((item, id) => {
					console.log("item in org",item.amount);
					return (
						
						<Quotation  key={id} added_applicant={fData?.data?.data?.added_applicant} userUrl={userUrl} details={item} ></Quotation>

					)
				} ):<div className={styles.textContainer}>
					<h5 className={styles.notFoundText}>Ooops ! , Quotations not found</h5>
					</div>

				}


			</Bar>
		)
	}

}
export default Eventquatation



