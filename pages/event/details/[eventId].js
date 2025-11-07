
import React, { useContext, useEffect, useState } from 'react'
import Bar from '../../../components/commonBar'
import Details from '../../../components/Details'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../store/context'
import useDataQuery, { fetcher } from '../../../hooks/useDataQuery'
function QuatationDetails({ data }, props) {
	const router = useRouter()
	const { userData, setUserData } = useContext(AuthContext)
	const user = userData.userType
	const [eventDetail, setEventDetail] = useState({})
	const [url, setUrl] = useState('')
	const id = router.query.eventId

	console.log({ id });
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
	console.log('user :', userData);
	useEffect(() => {
		console.log('user:', user);
	}, [])
	const [fData,error,mutate] = useDataQuery({ key: `/${url}/event-details`, data: { id: `${id}` }, header: { headers: { token: userData.token } } })
	console.log({ fData });

	console.log('details :', eventDetail);

	// close event function
	
	return (
		user == 2 ?
			<div>
				<Bar active={2}>
					<Details mutate={mutate} details={fData?.data?.data} isEvent button_link="add-quotation" pageTitle="Event Details" button_value='Add Quotation' user={user}></Details>
				</Bar>
			</div> :
			<div>
				<Bar active={2}>
					<Details mutate={mutate} details={fData?.data?.data} isApplicant isEvent button_link="quotations" pageTitle="Event Details" button_value='View Quotations' user={user}></Details>
				</Bar>
			</div>

	)
}

export default QuatationDetails


