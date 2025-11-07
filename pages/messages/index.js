import React, { useContext, useEffect, useState } from 'react'
import ChatUI from '../../components/ChatUi/ChatUI'
import Bar from '../../components/commonBar'
import { fetcher } from '../../hooks/useDataQuery'
import { AuthContext } from '../../store/context'
import styles from './style.module.css'
import { useRouter } from 'next/router'

const Chat = () => {
	const { userData, setUserData } = useContext(AuthContext)
	const [contacts, setContacts] = useState([])
	const [filterChat,setFilterChat]=useState(null)
	const router = useRouter()
	const user = userData.userType
	const userUrl = ''
	switch (parseInt(user)) {
		case 1:
			userUrl = 'applicant'
			break;
		case 2:
			userUrl = 'organizer'
			break;
		case 3:
			userUrl = 'sponsor'
			break;
		default:
			break;

	}
	useEffect(() => {
		setContacts([])
		userData.userId && fetcher({
			key: `/${userUrl}/fetChatData`, header: {
				headers: { token: userData.token }
			}
		}).then(res => {
			console.log('chat data sent', { res });
			setContacts(res.data.data)

		})
	}, [userData,filterChat])
	// useEffect(() => {
	// 	if (router.query.id) {
	// 		console.log('chat id from project page', router.query.id);
	// 		setSelectedRoom(router.query.id);
	// 		console.log('chat row', contacts);
	// 		const userDatas = contacts.find(() => { _id == router.query.id })
	// 		console.log('selected router data ', { userData })
	// 		const filterData = userDatas.users.find((dat) => {

	// 			return dat.userId != userId
	// 		})
	// 		setSelectedUser(filterData)

	// 	}

	// }, [userData,contacts])
	return (
		<Bar active={3}>
			<div className={styles.container}>
				<ChatUI setFilterChat={setFilterChat} filterChat={filterChat} chatRow={contacts} />
			</div>
		</Bar>

	)
}
export default Chat