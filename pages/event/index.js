import React, { useContext, useEffect, useState } from "react";
import SideSection from "../../components/commonBar";
import TopBar from "../../components/TopBar";
import AddEvent from "../../components/addnewevent";
import { useRouter } from 'next/router'
import Container from "../../components/CardContainer";
import Image from 'next/image'
import SideBar from '../../components/SideBarResponsive'
import algoliasearch from 'algoliasearch'
import styles from "./style.module.css";
import { AuthContext } from "../../store/context";
import CategoryFilter from "../../components/CategoryFilter";
import useDataQuery from "../../hooks/useDataQuery";
import noImage from '../../images/noImage.svg'
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchClient } from "../../helperFuctions/database";


const Event = () => {

  const [openPopup, setOpenPopup] = useState(false);
  const [filterValue, setFilterValue] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState([])
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isMore, setIsMore] = useState(true)


  const router = useRouter()
  const { userData, setUserData } = useContext(AuthContext)

  const user = userData.userType
  console.log({ user });
  console.log('swr.....');
  let user_url = 'applicant'
  let queryData = { limit: 100 }


  // callback 
  const changefilter = (filter) => {

    setPageNum(0)
    setEvents([])
    setCategoryFilter(filter)

  }
  switch (parseInt(user)) {
    case 1:
      user_url = 'applicant'
      queryData = { limit: 2 }
      break;
    case 2:
      user_url = 'organizer'
      queryData = { limit: 2, condition: filterValue }
      break;
    case 3:
      user_url = 'sponsor'
      queryData = { limit: 2 }
      break;
    default:
      break;

  }


  const index = searchClient.initIndex('events');

  console.log({ user });
  console.log({ user_url });
  const [data, error, mutate] = useDataQuery({
    key: `/${user_url}/list-events`,
    data: queryData,
    header: {
      headers: { token: userData.token }
    }
  });
  console.log({ data });
  console.log('fetch type:', filterValue);
  useEffect(() => {
    switch (parseInt(user)) {
      case 1:
        console.log('iam applicant');

        setFilterValue(`added_applicant:${userData.userId}`)
        break;
      case 2:
        console.log('iam orgaizer');
        setFilterValue('status:ACTIVE')

        break;
      case 3:
        console.log('iam sponosor');

        setFilterValue(`added_sponsor:${userData.userId}`)

        break;
      default:
        break;

    }
  }, [userData])
  useEffect(() => {


    fetchData()

  }, [searchQuery, filterValue, categoryFilter])


  const setFilters = (filter) => {
    console.log('search filter ....', filter);
    if (filter != filterValue) {
      setPageNum(0)
      setEvents([])
      setFilterValue(filter)
    }
  }
  const setSearch = (filter) => {
    console.log('search query ....', filter);
    setPageNum(0)
    setEvents([])
    setSearchQuery(filter)
  }
  useEffect(() => {
		console.log('changes occure in page');
		searchClient.clearCache().then(async () => {
			setSearchQuery('')

		})

	}, [])
  const fetchData = () => {
    console.log({ searchQuery });
    console.log({ filterValue });
    setIsLoading(true)
    console.log({ categoryFilter });
    console.log('my search query', searchQuery, 'userId', userData.userId);
    filterValue && userData.userId && index.search(searchQuery,
      user == 2 && filterValue == 'all' ? {
        page: pageNum,
        hitsPerPage: 10,
        facetFilters: [[...categoryFilter]]
      } : {
        page: pageNum,
        hitsPerPage: 10,
        facetFilters: [[...categoryFilter]]
        ,
        filters: filterValue
      }
    ).then(async ({ hits }) => {
      console.log('my search', hits);
      if (hits.length === 0) {
        console.log('test hasmore', isMore);
        setIsMore(false)
      } else {
        console.log('dtest hasmore', isMore);
        setIsMore(true)

        console.log('test page', pageNum, ' dtest hits', hits);


        setEvents(prev => [...prev, ...hits])

        console.log('my events', events);
        setPageNum(pageNum + 1)
      }

      setIsLoading(false)
    }).catch((e) => {
      console.error(e);
      setIsLoading(false)

    })
  }
  if (user == 1 || user == 3) {
    return (

      // event owner view :-applicant or sponsor

      <SideSection active={2}>
        {!openPopup ? (

          <>
            <SideBar active={2} />

            <div className={styles.container}>
              {(data && data?.data?.data?.events.length > 0) ?
                (<TopBar
                  setSearch={setSearch}
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                  title={"Events"}
                  onClick={() => setOpenPopup(!openPopup)}
                  button_value={"Create Event"} isEvent
                />)
                : (<div className={styles.emptyPage}><div className={styles.text}>
                  <Image src={noImage} width={200} height={200} /><p >No Events</p><p>
                    Its time to create your first event now</p>
                  <button className={styles.createBtn} onClick={() => setOpenPopup(!openPopup)} >Create Event</button></div>
                </div>)}
              <div className={styles.cards}>
                {(data && data?.data?.data?.events.length > 0) && events &&
                  <InfiniteScroll
                    dataLength={events.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={isMore}>
                    <Container data={events} user={user} isApplicant isEvent />
                  </InfiniteScroll>}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.addEvent}>
            <SideBar top active={2} />
            <AddEvent setEvents={setEvents} setSearchQuery={setSearchQuery} mutate={mutate} setOpenPopup={setOpenPopup} openPopup></AddEvent>
          </div>
        )}


      </SideSection>
    )
  } else if (user == 2) {

    return (
      // organizer view
      <SideSection active={2}>
        <div className={styles.categoryBar}>
          <CategoryFilter changefilter={changefilter} setFilterValue={setCategoryFilter}></CategoryFilter>
        </div>
        <div className={styles.sponsor_container}>
          {(data && data?.data?.data?.events.length > 0) ?

            (<TopBar changefilter={changefilter} setSearch={setSearch} filterValue={filterValue} setSearchQuery={setSearchQuery} searchQuery={searchQuery} isOrganizer onClick2={() => setFilters('status:ACTIVE')} onClick={() => setFilters(`organizers.organizer_id : ${userData.userId}`)}
              title={filterValue == `organizers.organizer_id : ${userData.userId}` ? "My Events" :
                filterValue == 'status:ACTIVE' ? 'All Events' : <></>}
              button_value={"My Event"} />)

            : (<div className={styles.emptyPage}><div className={styles.text}>
              <Image src={noImage} width={200} height={200} /><p >No Events</p>
            </div>
            </div>)}

          {events  && (data && data?.data?.data?.events.length > 0) ? <div className={styles.cards}>
            {events &&
              <InfiniteScroll
                dataLength={events.length} //This is important field to render the next data
                next={fetchData}
                hasMore={isMore}>
                <Container data={events} user={user} isEvent />
              </InfiniteScroll>}
          </div> : <></>}
        </div>

        <SideBar active={2} />
      </SideSection>
    )
  }

};
export default Event;
