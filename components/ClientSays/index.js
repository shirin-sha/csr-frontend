import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import StarIcon from '@mui/icons-material/Star'
import { FaQuoteLeft } from 'react-icons/fa'
import styles from './ClientSays.module.css'
import Container from '../commen/Container'
import profile1 from '../../images/pic1.png'
import profile2 from '../../images/pic2.png'
import profile3 from '../../images/pic3.png'
import goldline from '../../images/goldline.png'
import bottomline from '../../images/bottomline.png'

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
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true

			}
		},
		{
			breakpoint: 820,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				// initialSlide: 2

			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				// initialSlide: 2

			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1

			}
		}
	]
}

function ClientSays() {
	return (

		<div className={styles.bgContainer} id="client-says">
			<Container>
				<div style={{ display: 'flex' }}>
					<h1 className={styles.blur}>
						What our
						<span style={{ color: '#9e8959' }}>&nbsp;client says</span>
					</h1>
				</div>

				<div className={styles.reviewBox}>
					<Slider {...settings}>
						<div className={styles.reviewSingle}>
							<div className={styles.userReview}>
								<div className={styles.goldLine}><Image src={goldline} /></div>
								<p className={styles.innerContent} >
									Lorem ipsum dolor sit amet, consectetur adipiscing elit Leo libero orci ullamcoper in pharetra.
									Ante ullamcorper odio netus velit felis sit.Donec ullamcorper imperdiet.
								</p>
								<div>
									<StarIcon className={styles.star} />
									<StarIcon className={styles.star} />
									<StarIcon className={styles.star} />
									<StarIcon className={styles.star} />
									<StarIcon className={styles.star} />
								</div>

								<div>
									<FaQuoteLeft className={styles.quotes} />
									<p><b>David Martin</b></p>
									<p className={styles.ceo}>CEO FOUNDER</p>
									{/* <ImQuotesLeft/> */}
									{/* <div><AiTwotoneStar /></div> */}
								</div>
								<div className={styles.bottomline}><Image src={bottomline} /></div>
							</div>
							<div className={styles.profileBorder}>
								<div className={styles.profile}><Image src={profile1} layout="fill" /></div>
							</div>
						</div>
						<div className={styles.reviewSingle}>
							<div className={styles.userReview}>
								<div className={styles.goldLine}>
									<Image src={goldline} />
								</div>
								<p className={styles.innerContent}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit Leo libero orci ullamcoper in pharetra.
									Ante ullamcorper odio netus velit felis sit.Donec ullamcorper imperdiet.
								</p>
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<div>
									<FaQuoteLeft className={styles.quotes} />
									<p><b>David Martin</b></p>
									<p className={styles.ceo}>CEO FOUNDER</p>
								</div>
								<div className={styles.bottomline}><Image src={bottomline} /></div>
							</div>
							<div className={styles.profileBorder}>
								<div className={styles.profile}><Image src={profile2} layout="fill" /></div>
							</div>
						</div>

						<div className={styles.reviewSingle}>
							<div className={styles.userReview}>
								<div className={styles.goldLine}>
									<Image src={goldline} />
								</div>
								<p className={styles.innerContent}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit Leo libero orci ullamcoper in pharetra.
									Ante ullamcorper odio netus velit felis sit.Donec ullamcorper imperdiet.
								</p>
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<div>
									<FaQuoteLeft className={styles.quotes} />
									<p><b>David Martin</b></p>
									<p className={styles.ceo}>CEO FOUNDER</p>
								</div>
								<div className={styles.bottomline}><Image src={bottomline} /></div>
							</div>
							<div className={styles.profileBorder}>
								<div className={styles.profile}>
									<Image src={profile3} layout="fill" />
								</div>
							</div>
						</div>
						{/* sl */}
						<div className={styles.reviewSingle}>
							<div className={styles.userReview}>
								<p className={styles.innerContent}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit Leo libero orci ullamcoper in pharetra.
									Ante ullamcorper odio netus velit felis sit.Donec ullamcorper imperdiet.
								</p>
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<StarIcon className={styles.star} />
								<p><b>David Martin</b></p>
								<p className={styles.ceo}>CEO FOUNDER</p>
							</div>
							<div className={styles.profileBorder}>
								<div className={styles.profile}><Image src={profile3} layout="fill" /></div>
							</div>
						</div>
					</Slider>

				</div>

			</Container>
		</div>
	)
}

export default ClientSays
