import React, { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { BsArrowLeft } from 'react-icons/bs'
import styles from './ChatUi.module.css'
import sortByArrow from '../../images/sortByDownArrow.png'
import categoryArrow from '../../images/categoryArrow.png'
import replyArrow from '../../images/replyArrow.png'
import { initializeApp } from "firebase/app";
import { Firestore, getDoc, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../store/context";
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import debounce from '../../helperFuctions/debounce'
const sortByFields = [
	{ label: 'Latest', value: 0 },
	{ label: 'A - Z', value: 1 },
	{ label: 'Z - A', value: 2 }

]
const CategoryFields = [
	{ label: 'Participated sponsor', value: 1 },
	{ label: 'unparticipated sponsor', value: 2 },
	{ label: 'Event organizer', value: 3 }
]


const ChatRow = (props) => {
	const {
		data, index, onClick
	} = props
	const { userData, setUserData } = useContext(AuthContext)
	const [contact, setContact] = useState({})
	const userId = userData.userId

	useEffect(() => {
		const filterData = data.users.find((dat) => {
			return dat.userId != userId
		})
		setContact(filterData)
		console.log({ filterData });
	}, [data])
	console.log('chat rows', { data }, { contact });
	return (
		<div className={styles.chatRowWrap} onClick={onClick} >
			<div className={styles.chatProfileIcon}>
				<span className={styles.chatProfileIconLetter}>
					{contact && contact?.name?.charAt(0).toUpperCase()}
				</span>
			</div>
			<div className={index === 0 ? styles.chatInfofirstChild : styles.chatInfo}>
				<div className={styles.chatInfoRow1}>
					<span className={styles.chatInfoRow1Username}>
						{contact && contact.name}
					</span>
					<span className={styles.chatInfoRow1Date}>
						{data && dayjs(data?.date?.toDate()).format('h:mm A')}
					</span>
				</div>
				<div className={styles.chatInfoRow2}>
					<span className={styles.lastMessage}>
						{/* {lastMessage} */} {data && data.message}
					</span>
				</div>
			</div>
		</div>
	)
}
ChatRow.propTypes = {
	// eslint-disable-next-line react/require-default-props
	data: PropTypes.shape({
		pfLetter: PropTypes.string,
		userName: PropTypes.string,
		lastMessage: PropTypes.string,
		lastDate: PropTypes.string,
		sent: PropTypes.number
	}),
	// eslint-disable-next-line react/require-default-props
	index: PropTypes.number,
	// eslint-disable-next-line react/require-default-props
	onClick: PropTypes.func,
}
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const missingFirebaseConfigKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingFirebaseConfigKeys.length > 0) {
  throw new Error(`Missing Firebase environment variables: ${missingFirebaseConfigKeys.join(', ')}`);
}

const app = initializeApp(firebaseConfig, 'loop');
const db = getFirestore(app);

const ChatUI = ({ chatRow, setFilterChat, filterChat }) => {
	// sortby states
	const [sortByClicked, setSortByClicked] = useState(false)
	const [sortBySelected, setSortBySelected] = useState()
	// category states
	const [categoryClicked, setCategoryClicked] = useState(false)
	const [categorySelected, setCategorySelected] = useState()
	// chat data state
	const [chatData, setChatData] = useState()
	// reply to current message state
	const [replytoMessage, setReplytoMessage] = useState()
	// screen width state
	const [screenWidth, setScreenWidth] = useState()
	// sortby ref
	const sortByRef = useRef()
	// sortby ref
	const categoryRef = useRef()
	// all messages as ref variable
	const leftPanel = useRef()
	const rightPanel = useRef()
	const allMessages = useRef()
	const [msg, setMsg] = useState()
	const [msgContainer, setMsgContainer] = useState()
	const { userData, setUserData } = useContext(AuthContext)
	const [selectedUser, setSelectedUser] = useState({})
	const [isMychat, setIsMyChat] = useState(false)
	const [selectedRoom, setSelectedRoom] = useState('')
	const [contacts, setContacts] = useState([])
	const [search, setSearch] = useState('')
	const messageEnd = useRef()
	const userId = userData.userId
	const router = useRouter()
	//useefects

	useEffect(() => {

		console.log('searching started', { search },{contacts});
		setContacts([])
		if (search === '') {
			setContacts(chatRow)
		} else {
		console.log('searching started', { search },{contacts});

			console.log('searching content');
			setContacts(contacts?.filter((data, idx) => {
				const filterData = data.users?.find((dat) => {
					return dat.userId != userId
				})
				console.log('search query', { filterData });
				const name = filterData?.name.toLowerCase()
				if (name.includes(search.toLowerCase())) {
					console.log('search included', name);
					console.log('search data', { data });
					return data
				}
			}))
		}




	}, [search]);
	console.log({ contacts });
	// const searchContacts=(search)=>{
	// 	console.log('searching started', { search });

	// 	if (search == '') {
	// 		setContacts(chatRow)
	// 	} else {

	// 		setContacts(contacts.filter((data, idx) => {
	// 			const filterData = data.users?.find((dat) => {
	// 				return dat.userId != userId
	// 			})
	// 			console.log('search query', { filterData });
	// 			const name = filterData?.name.toLowerCase()
	// 			if (name.includes(search.toLowerCase())) {
	// 				console.log('search included', name);
	// 				console.log('search', { data });
	// 				return data
	// 			}
	// 		}))
	// 	}

	// }
	useEffect(() => {

		if (router.query.id) {
			console.log('chat id from project page', router.query.id);
			setSelectedRoom(router.query.id);
			console.log('chat row', chatRow);
			const userData = chatRow && chatRow?.find((x) => {
				return x._id == router.query.id
			})
			console.log('selected router data ', { userData })
			const filterData = userData && userData.users?.find((dat) => {

				return dat.userId != userId
			})
			filterData && setSelectedUser(filterData)
			userData && showChat(userData)
		} else {
			const userData = chatRow && chatRow[0]
			if (userData) {
				console.log({ userData });
				setSelectedRoom(userData._id)

				console.log('selected router data ', { userData })
				const filterData = userData && userData.users?.find((dat) => {

					return dat.userId != userId
				})
				filterData && setSelectedUser(filterData)
			}

		}

	}, [router, userData, chatRow])
	console.log({ contacts });
	useEffect(() => {

		console.log('individaul atas');
		if (contacts.length == 0) {
			chatRow.map(async (item, idx) => {
				console.log({ item });
				await onSnapshot(query(collection(db, 'chat', `${item._id}`, 'messages'), orderBy('createdAt', 'desc'), limit(1))
					, (querySnapshot) => {
						const messages = querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}));
						console.log('individal', messages);
						if (messages.length > 0) {
							item.message = messages[0].message
							item.date = messages[0].createdAt



						}

					}
				)

				setContacts(prev => [...prev, item])

				return item
			})
		}
		//setContacts(cont)
	}, [router, userData, chatRow])
	useEffect(() => {
		console.log('selected user', selectedUser, { selectedRoom });

		selectedRoom && onSnapshot(query(collection(db, 'chat', `${selectedRoom}`, 'messages'), orderBy('createdAt', 'asc'))

			, (querySnapshot) => {
				const messages = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				console.log(messages);
				setMsgContainer(messages)
			}
		)


	}, [msg, selectedUser, selectedRoom])
	useEffect(() => {
		document.body.addEventListener('click', unWrapOption)
		return () => {
			document.body.removeEventListener('click', unWrapOption)
		}
	}, [])
	// default display all messages
	console.log({ msgContainer });
	// useEffect to show rightPanel on resize
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 671) {
				setScreenWidth(true)
			} else if (window.innerWidth > 671) {
				setScreenWidth(false)
			}
		}
	}, [])
	useEffect(() => {
		if (screenWidth === false) {
			rightPanel.current.style.display = 'flex'
			leftPanel.current.style.display = 'block'
		} else if (screenWidth === true) {
			rightPanel.current.style.display = 'none'
			leftPanel.current.style.display = 'block'
		}
	}, [screenWidth])



	const replySubmit = async (e) => {
		e && e.preventDefault();
		console.log('send', selectedUser, { selectedRoom });
		selectedUser._id && addDoc(collection(db, "chat", selectedRoom, 'messages'), {

			createdAt: serverTimestamp(),
			uid: userId,
			message: msg,
			chatId: selectedRoom,
			name: userData.userName




		}).then(res => {
			setMsg('')
			console.log({ res });
		})

	}

	// sortby methods
	const sortByButtonClicked = () => {
		setSortByClicked((prev) => { return !prev })
	}
	const sortByItemSelected = (item) => {
		setSortBySelected(item)
		setSortByClicked((prev) => { return !prev })
	}
	// category methods
	const categoryButtonClicked = () => {
		setCategoryClicked((prev) => { return !prev })
	}

	const categoryItemSelected = (item) => {
		setCategorySelected(item)
		setCategoryClicked((prev) => { return !prev })
	}
	// listener to unwrap dropdowns
	const unWrapOption = (e) => {
		try {
			if (e?.target?.className?.includes('dropdown') === false) {
				setSortByClicked(false)
				setCategoryClicked(false)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const detectWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 671 && screenWidth === false) {
				setScreenWidth(true)
			} else if (window.innerWidth > 671 && screenWidth === true) {
				setScreenWidth(false)
			}
		}
	}
	useEffect(() => {
		window.addEventListener('resize', detectWidth)
		return () => {
			window.removeEventListener('resize', detectWidth)
		}
	}, [screenWidth])

	const mutateMessage = (category = 0, sortby = 0) => {
		const newSet = allMessages.current
		// filtering based on category
		if (category !== 0) {

		}
		// filtering based on sortby
		if (sortby != 0) {
			for (let i = 0; i < newSet.length; i += 1) {

			}
		}
	}
	useEffect(() => {
		console.log('scroll');
		messageEnd.current?.scrollIntoView({ behavior: 'smooth' })
	}, [msg])
	const autoGrow = (e) => {
		console.log('here')
		console.log(e.target.scrollHeight)
		e.target.style.height = '34px'
		const scHeight = e.target.scrollHeight
		e.target.style.height = `${scHeight}px`
	}
	const showChat = (user) => {
		console.log('selected room', user._id);
		const filterData = user.users.find((dat) => {

			return dat.userId != userId
		})
		setSelectedUser(filterData)
		setSelectedRoom(user._id)
		console.log('selected user', { filterData });
		console.log('showChat is working')
		rightPanel.current.style.display = 'flex'
		if (screenWidth === true) { leftPanel.current.style.display = 'none' }
	}
	const hideChat = () => {
		console.log('hideChat is working')
		rightPanel.current.style.display = 'none'
		leftPanel.current.style.display = 'block'
	}

	useEffect(() => {
		const keyDownHandler = e => {
			console.log('User pressed: ', e.key);

			if (e.key == 'Enter' && msg) {
				e.preventDefault();


				// 👇️ call submit function here
				replySubmit();
			}
		};

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	});

	const refreshPage = () => {
		router.reload()
	}
	return (
		<div className={styles.wrapContainer}>
			<div className={styles.leftPanel} ref={leftPanel}>
				<div className={styles.leftPanelFixedContent}>
					<div className={styles.leftPanelRow1}>
						<h3 className={styles.leftPanelRow1Heading}>Messages</h3>
						{/* <div className={`${styles.leftPanelRow1SortBy} dropdown`} ref={sortByRef}>
							<div
								className={`${styles.leftPanelRow1SortByButton} dropdown`}
								onClick={sortByButtonClicked}
								onKeyDown={sortByButtonClicked}
								role="button"
								tabIndex={-1}
							>
								<span className="dropdown">
									Sort By
								</span>
								<div className={`${styles.sortByArrowWrap} dropdown`}>
									<Image src={sortByArrow} layout="fill" className="dropdown" />
								</div>
							</div>
							<div className={`${styles.sortByListWrap} dropdown`}>
								<div className={`${styles.leftPanelRow1SortByList} dropdown`}>
									{
										sortByClicked && sortByFields.map(
											(item, index) => {
												return (
													<div
														className={`${styles.leftPanelRow1SortByListItem} dropdown`}
														onClick={() => { sortByItemSelected(item) }}
														onKeyDown={() => { sortByItemSelected(item) }}
														role="button"
														tabIndex={1}
														key={`sort${index.toString()}`}

													>
														{item.label}
													</div>
												)
											}
										)
									}
								</div>
							</div>
						</div> */}
					</div>
					<div className={styles.leftPanelRow2}>
						<form className={styles.searchForm}>
							<input value={search} onChange={(e) => setSearch(e.currentTarget.value)} type="text" placeholder="Search" />
						</form>
					</div>

					<form>
						<div className={styles.leftPanelRow3}>

							<div onClick={refreshPage} className={styles.leftPanelRow3AllButton}>All</div>

							<div className={`${styles.leftPanelRow3CategoryWrap} dropdown`} ref={categoryRef}>
								<div
									className={`${styles.leftPanelRow3CategoryButton} dropdown`}
									onClick={categoryButtonClicked}
									onKeyDown={categoryButtonClicked}
									role="button"
									tabIndex={1}
								>
									<span className={`${styles.leftPanelRow3CategoryTxt} dropdown`}>Category</span>
									<div className={`${styles.categoryArrowWrap} dropdown`}>
										<Image src={categoryArrow} layout="fill" className="dropdown" />
									</div>
								</div>
								<div className={`${styles.leftPanelRow3CategoryListOuterWrap} dropdown`}>
									{categoryClicked && (
										<div className={`${styles.leftPanelRow1CategoryList} dropdown`}>
											{
												CategoryFields.map(
													(item, index) => {
														return (
															<div
																className={`${styles.leftPanelRow1CategoryListItem} dropdown`}
																// onClick={() => { categoryItemSelected(item) }}
																// onKeyDown={() => { categoryItemSelected(item) }}
																onClick={refreshPage}

																role="button"
																tabIndex={1}
																key={`category${index.toString()}`}
															>
																<span>{item.label}</span>
															</div>
														)
													}
												)
											}
										</div>
									)}
								</div>
							</div>

							{/* <div className={styles.leftPanelRow3SendButton}>Send</div> */}

						</div>
					</form>
				</div>
				<div className={styles.leftPanelRow4}>
					{contacts.length > 0 && contacts?.map((item, index) => {
						return (<ChatRow key={index} data={item} index={index} onClick={() => showChat(item)} />
						)
					})}
				</div>
			</div>
			<div className={styles.rightPanel} ref={rightPanel}>
				{/* {selectedUser.userId ? <div> */}
				{/* <p className={styles.backButton} onClick={hideChat}><IoIosArrowBack size={25} /></p> */}
				{selectedUser.userId && <div className={styles.topBar}>
					<div className={styles.backButton}><BsArrowLeft size={25} onClick={hideChat} /></div>
					<span className={styles.chatProfileIconLetter}>
						{selectedUser && selectedUser?.name?.charAt(0).toUpperCase()}

					</span>

					<span className={styles.topBarUsrName}>
						{selectedUser.name}

					</span>
				</div>}
				{selectedUser.userId && <div className={styles.chatsWrap}  >
					{msgContainer && msgContainer.map((item, index) => {
						return (
							<div className={`${item.uid == userId ? styles.viewMessageSelf : styles.viewMessage} ${item.uid == userId ? styles.myMessage : ' '} `} key={index}>
								{/* <div className={}></div> */}
								<div key={item.createdAt} className={`${styles.viewMessageBox1} ${item.uid == userId ? styles.myMessage : ' '}`}>



									<p className={item.uid == userId ? styles.viewMessageBox1Row2Self : styles.viewMessageBox1Row2}>
										{item.message}
									</p>
									<p className={styles.time}> {dayjs(item?.createdAt?.toDate()).format('h:mm A')}</p>
									{/* <div className={styles.viewMessageBox1Row3}>
										<div
											className={styles.replyButton}
											onClick={() => { setReplytoMessage(item) }}
											onKeyDown={() => { setReplytoMessage(item) }}
											role="button"
											tabIndex={1}
										>
											<div className={styles.replyArrow}>
												<Image src={replyArrow} layout="fill" />
											</div>
											<span>Reply</span>

										</div>
										<div className={styles.dateAndTime}>
											<span>{item?.dateOfMessage}</span>
											<span>{item?.timeOfMessage}</span>
										</div>
									</div> */}
								</div>
							</div>
						)
					})}
					<div ref={messageEnd} />
				</div   >}
				{selectedUser.userId && <div className={styles.viewMessageBox2}>
					{/* {replytoMessage && (
						<div className={styles.viewMessage}>
							<div className={styles.viewMessageBox1}>
								<p className={styles.replyOnOptions}>
									<span className={styles.replyCancel} onClick={() => { setReplytoMessage(false) }}><IoCloseCircle size={30} /></span>

								</p>
								<div className={styles.viewMessageBox1Row1}>
									<div className={styles.viewMessageBox1Row1PfLetterWrap}>
										<span className={styles.viewMessageBox1Row1PfLetter}>{replytoMessage?.pfLetter}</span>
									</div>

									{!(replytoMessage.type === 2 || replytoMessage.type === 3) && <span className={styles.viewMessageBox1Row1PfUsername}>{replytoMessage?.userName}</span>}
								</div>
								<div className={replytoMessage.type === 1 ? styles.viewMessageBox1Row2 : styles.viewMessageBox1Row2Self}>
								
								</div>
							</div>
						</div>
					)} */}
					<form onSubmit={replySubmit} className={styles.viewMessageBox2Form}>
						<textarea className={styles.typeReplymessage} value={msg} placeholder="Type a message..." onInput={autoGrow} onChange={(e) => setMsg(e.target.value)} />
						<input type="submit" value="Send" />
					</form>
				</div>}
				{/* </div> : <div> <p className={styles.noDataFound}>No messages found</p></div>} */}


			</div>
		</div>
	)
}

export default ChatUI
