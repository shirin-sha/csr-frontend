import React, { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import FeatureIcn from '../components/FeatureIcons'
import HowitWork from '../components/HowitWork'
import Footer from '../components/footer'
import Headersection from '../components/Headersection'
import JoinUs from '../components/joinus'
import Secondsection from '../components/Secondsection'
import Aboutsection from '../components/Aboutsection'
import Navbar from '../components/navbar'
import ExploreProject from '../components/ExploreProject'
import LatestNews from '../components/LatestNews'
import ClientSays from '../components/ClientSays'
import { fetcher } from '../hooks/useDataQuery'
import { AuthContext } from '../store/context'
import { useRouter } from 'next/router'
//import { usePopUp } from '../hooks/usePopUp';

export default function Home({ projects, blogs }) {

	useEffect(()=>{
	window.history.scrollRestoration = 'manual'

		window.scrollTo(0,0)
	},[])

	useEffect(() => {
		console.log({ projects });
		console.log({ blogs });
	}, [])
	useEffect(() => {

		router.prefetch('/project')
	}, [])
	const { userData, setUserData } = useContext(AuthContext);
	const userId = userData.userId;
	const router = useRouter()

// 


	if (userId) {
		router.push('/project')
	} else {
		
			return (

				<div>

					<div className={styles.navoverlay}>
					
						<Navbar />
					</div>
					<div className={styles.bannerSection}>
						<Headersection />
					</div>
					<Secondsection />
					<Aboutsection />
					<HowitWork />
					<ExploreProject projects={projects} />
					<FeatureIcn />
					<ClientSays />
					{/* <Feedback/> */}
					<LatestNews blogs={blogs} />
					 <JoinUs />
					<Footer />

				</div>

			)
		

	}


}
export async function getServerSideProps() {
	// Fetch data from external API
	const projectResp = await fetcher({ key: "/public/get-ourProject" });
	const newsResp = await fetcher({ key: "/public/get-blogs" });

	console.log("projectdata ", projectResp.data);
	const projects = await projectResp.data.data.information
	console.log("newsdata ", projectResp.data);
	const blogs = await newsResp.data.blogs
	// Pass data to the page via props
	return { props: { projects, blogs } }
}