import React, { useEffect ,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Slider from 'react-slick'
import dayjs from 'dayjs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './LatestNews.module.css'
import blog1 from '../../images/blog1new.png'
import blog2 from '../../images/blog2.png'
import blog3 from '../../images/blog3.png'
import Container from '../commen/Container'
import exploreevent from '../../images/exploreevent.jpg'
import useDataQuery, { baseUrl, fetcher } from '../../hooks/useDataQuery'

const settings = {
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	initialSlide: 0,
	dots: false,
	arrows: false,
	autoplay: true,
	responsive: [
		{
			breakpoint: 820,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2

			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 360,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
}
function LatestNews({blogs}) {
	
	const [blogid,setBlogId]=useState(0)
	const [imgSrc, setImgSrc] = useState("/assets/default.jpg")
	console.log("setBlogId",blogid)
	const changeDate=(date)=>{
		console.log('date :',dayjs(date).format('DD MMM'))
		const changedDate=dayjs(date).format('DD MMM')
		return (<div>{changedDate}</div>)

	}
	console.log("blogs",blogs);

// 	const keyStr =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

// const triplet = (e1, e2, e3) =>
//   keyStr.charAt(e1 >> 2) +
//   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//   keyStr.charAt(e3 & 63)
	
// 	const rgbDataURL = (r, g, b) =>
//   `data:image/gif;base64,R0lGODlhAQABAPAA${
//     triplet(0, r, g) + triplet(b, 255, 255)
//   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
	
	return (
		<Container>
			<div style={{ marginTop: '35px', marginBottom: '80px' }}>
				<div style={{ paddingTop: '64px' }}>
					<h4 className={styles.smallhead}>FROM OUR BLOG</h4>
					<h2 className={styles.latestTitle}> Latest News and Updates</h2>
					<div className={styles.flexContainer}>

						<Slider {...settings}>
							{blogs?.map((newsdata, key) => {
								console.log('project', newsdata._id)
								
								 return (

									<Link href={'/viewnews/' + newsdata._id}>
										<div key={newsdata._id} className={styles.single} onClick={()=> setBlogId(newsdata._id)}>

									<Image width={'500px'} height={'330px'}  src={(`${baseUrl}/public/get-blogs/${newsdata.img}`)}
									 />
									<div className={styles.dateWrap}>
										<p >{dayjs(newsdata.submission_date).format('DD MMM')}</p>
										
									 </div>
									<div className={styles.whiteBox}>
										<p className={styles.headLine}>
											{newsdata.heading}
										</p>
									</div>
									</div>

									</Link>
								) 
							 })}  

							
						</Slider>

					</div>
				</div>
			</div>
		</Container>

	)
}

export default LatestNews
