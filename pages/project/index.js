import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import SideSection from '../../components/commonBar'
import TopBar from '../../components/TopBar'
import Container from '../../components/CardContainer'
import CategoryFilter from '../../components/CategoryFilter'
import Addproject from '../../components/Addproject'
import SideBar from '../../components/SideBarResponsive'
//import { fetcher } from '../../hooks/useDataQuery';
import styles from "./style.module.css";
import { useRouter } from 'next/router'
import { AuthContext } from '../../store/context'
import useDataQuery, { fetcher } from '../../hooks/useDataQuery'
import Image from 'next/image'
import noImage from '../../images/noImage.svg'

import InfiniteScroll from 'react-infinite-scroll-component';

import { searchClient } from '../../helperFuctions/database'


const Project = () => {
	//hooks
	const router = useRouter()
	const [categoryIds, setCategoryIds] = useState([]);
	console.log('categoryIds', categoryIds)

	const { userData, setUserData } = useContext(AuthContext)
	//useStates

	const [filterValue, setFilterValue] = useState(null)
	const [categoryFilter, setCategoryFilter] = useState([])
	const [projects, setProjects] = useState([])
	const [openPopup, setOpenPopup] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [notifProjects, setNotifProjects] = useState([])
	const [pageNum, setPageNum] = useState(0);
	const [isLoading, setIsLoading] = useState(false)
	const [isMore, setIsMore] = useState(true)

	// callback 
	const changefilter = (filter) => {
		if (filter != categoryFilter) {
			setPageNum(0)
			setProjects([])
			setCategoryFilter(filter)
		}
	}
	const setStatusFilter = (filter) => {
		if (filter != filterValue) {
			setPageNum(0)
			setProjects([])
			setFilterValue(filter)
		}


	}
	const setSearch = (filter) => {
		console.log('search query ....');
		if (filter != searchQuery) {
			setPageNum(0)
			setProjects([])
			setSearchQuery(filter)
		}
	}

	const [active, setActive] = useState("");
	const ref = useRef();

	//variables
	const user = userData.userType

	let userUrl = 'applicant'
	let queryData = {}



	const index = searchClient.initIndex('projects')


	switch (parseInt(user)) {
		case 1:
			userUrl = 'applicant'
			queryData = { limit: 1, page: 1 }

			break;
		case 2:
			userUrl = 'organizer'
			queryData = { limit: 1, page: 1 }


			break;
		case 3:
			userUrl = 'sponsor'
			queryData = { limit: 1, page: 1 }

			break;
		default:
			break;

	}


	//functions
	console.log('userData :', userData);

	console.log('swr.....');

	const [data, error, mutate] = useDataQuery({

		key: `/${userUrl}/list-projects`,
		data: queryData

	})
	useEffect(() => {

		switch (parseInt(user)) {
			case 1:
				setFilterValue(`added_applicant:${userData.userId}`)
				break;
			case 2:
				setFilterValue(`added_organizer:${userData.userId}`)
				break;
			case 3:
				setFilterValue(`(status:ACTIVE OR status :QUEUE)`)

				break;
			default:
				break;

		}
	}, [userData])
	useEffect(() => {


		fetchData()

	}, [searchQuery, filterValue, categoryFilter])

	useEffect(() => {
		console.log('changes occure in page');
		searchClient.clearCache().then(async () => {
			setSearchQuery('')

		})

	}, [])

	useEffect(() => {
		if (parseInt(user) === 3 && filterValue == `(sponsorships.sponsor_id:${userData.userId} )`) {
			const projectIds = projects.map(project => {

				return project.objectID
			})
			console.log('my project ides', { projectIds });
			fetcher({ key: '/sponsor/notifIndication', data: { projectIds }, header: { headers: { token: userData.token } } }).then((resp) => {
				console.log('my project ides resp', resp.data.data);
				setNotifProjects(resp.data.data)

			})
		}
	}, [userData, user, filterValue, projects])

	console.log('now projets', projects);
	const findNotifiedProjects = (projectId) => {
		console.log('find notif', { notifProjects }, projectId);
		if (notifProjects && notifProjects.length > 0) {
			const updatedProjectId = notifProjects.find((id) => {
				console.log('find notif', id, projectId);
				return id == projectId
			})
			console.log('find notif', { updatedProjectId });
			if (updatedProjectId) {
			console.log('find notif is true');

				return true
			} else {
			console.log('find notif is false');

				return false
			}
		}

	}
	const fetchData = () => {
		console.log('infinite scrolling func');
		console.log('infinite', { searchQuery });
		console.log('infinite', { filterValue });
		console.log('infinite', { categoryFilter });
		setIsLoading(true)
		console.log('infinite page num', { pageNum });
		console.log('infinite my search query', searchQuery, 'userId', userData.userId);
		filterValue && userData.userId && index.search(searchQuery,
			{
				page: pageNum,
				hitsPerPage: 10,

				facetFilters: [[...categoryFilter]],
				filters: filterValue
			}
		).then(async ({ hits }) => {
			console.log('infinite my search', hits);
			if (hits.length === 0) {
				console.log('test hasmore', isMore);
				setIsMore(false)
			} else {
				console.log('dtest hasmore', isMore);
				setIsMore(true)

				console.log('test page', pageNum, ' dtest hits', hits);


				setProjects(prev => [...prev, ...hits])

				console.log('infinite my projects', projects);
				setPageNum(pageNum + 1)
			}

			setIsLoading(false)
		}).catch((e) => {
			console.error(e);
			setIsLoading(false)

		})
	}

	//console.log('dtest final projects', projects);

	useEffect(() => {
		switch (filterValue) {
			case 1:
				filterValue(`status:ACTIVE`)
				backgroundColor = "red";
				break;
			case 2:
				filterValue(`status :QUEUE`)
				backgroundColor = "red";
				break;

			default:
				break;

		}
	}, [userData])




	if (user == 1 || user == 2) {


		return (

			<SideSection active={1} >

				<div>

					{!openPopup ? <>

						<SideBar active={1} />

						<div className={styles.container}>



							{(data && data?.data?.data?.projects.length > 0) ?


								(<TopBar setSearch={setSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onClick={() => setOpenPopup(!openPopup)} title={'Projects'} button_value={'Create Project'} />)


								:
								(<div className={styles.emptyPage}><div className={styles.text}>
									<Image src={noImage} width={200} height={200} /><p >No Projects</p><p>
										Its time to create your first project now</p>
									<button className={styles.createBtn} onClick={() => setOpenPopup(!openPopup)} >Create Project</button></div>
								</div>)}



							{(data && data?.data?.data?.projects.length > 0) && projects && <div className={styles.cards} >
								<InfiniteScroll
									dataLength={projects.length} //This is important field to render the next data
									next={fetchData}
									hasMore={isMore}


								>
									<Container data={projects} user={user} isApplicant />
								</InfiniteScroll>
							</div>}

						</div> </> : <div>

						<SideBar top active={1} />
						<Addproject setProjects={setProjects} setSearchQuery={setSearchQuery} mutate={mutate} setOpenPopup={setOpenPopup} openPopup></Addproject>
					</div>}



				</div>





			</SideSection >
		)
	}
	else if (user == 3) {

		return (
			<SideSection active={1} >
				<div>
					<div className={styles.categoryBar}>
						<CategoryFilter changefilter={changefilter} setFilterValue={setCategoryFilter} categoryIds={categoryIds} setCategoryIds={setCategoryIds}></CategoryFilter>
					</div>
					<div className={styles.sponsor_container}>


						<TopBar changefilter={changefilter} setSearch={setSearch} active={active} filterValue={filterValue} setSearchQuery={setSearchQuery} searchQuery={searchQuery}
							onClick2={() => setStatusFilter(`(status:ACTIVE OR status :QUEUE)`)}
							onClickActiveBtn={() => {
								setStatusFilter('status:ACTIVE')
							}}
							onClick={() => setStatusFilter(`(sponsorships.sponsor_id:${userData.userId} )`)}
							onClickQueueBtn={() => (setStatusFilter('status:QUEUE'))} isSponsor
							title={filterValue == 'status:ACTIVE' ? 'Active Projects' :
								filterValue == 'status:QUEUE' ? 'Queue Projects' :
									filterValue == `(status:ACTIVE OR status :QUEUE)` ? 'All Projects' :
										filterValue == `(sponsorships.sponsor_id:${userData.userId} )` ? "My Projects" : <></>}
							button_value={'Create Project'} />


						{(data && projects.length > 0) && (data && data?.data?.data?.projects.length > 0) ?
							<div className={styles.cards} >
								<InfiniteScroll
									dataLength={projects.length} //This is important field to render the next data
									next={fetchData}
									hasMore={isMore}


								>	<Container findNotifiedProjects={filterValue == `(sponsorships.sponsor_id:${userData.userId} )` && findNotifiedProjects} data={projects} user={user} /></InfiniteScroll>
							</div>
							:
							(<div className={styles.emptyPage}><div className={styles.text}>
								<Image src={noImage} width={200} height={200} /><p >No Projects</p>
							</div>
							</div>)}


					</div>
				</div>

				<SideBar active={1} />
			</SideSection>)
	}
}
export default Project

