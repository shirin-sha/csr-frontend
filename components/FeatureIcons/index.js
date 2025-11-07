import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FeatureIcons from './FeatureIcon.module.css'
import EventIcon from '../../images/featureventicon.png'
import educationIcon from '../../images/educationicon.png'
import medicalIcon from '../../images/medicals.png'
import techIcon from '../../images/tech.png'
import fashion from '../../images/fashion.jpeg'
import camera from '../../images/camera.jpeg'
import Container from '../commen/Container'

const settings = {
	dots: false,
	infinite: true,
	speed: 400,
      autoplaySpeed: 700,
	slidesToShow: 6,
	slidesToScroll: 1,
	initialSlide: 0,
	arrows: false,
	autoplay: true,
	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}
	]
}

const FeatureIcon = () => {
	return (
		<Container>
			<div className={FeatureIcons.headDiv}>
				<h2 className={FeatureIcons.blur}>Recent Segments We Supported</h2>
			</div>
			<div className={FeatureIcons.featureMain}>

				<Slider {...settings}>
					<div className={FeatureIcons.event}>

						<Image src={EventIcon} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Events</p>

					</div>
					<div className={FeatureIcons.event}>

						<Image src={educationIcon} width={45} height={35} />
						<p className={FeatureIcons.iconName}>Education</p>

					</div>

					<div className={FeatureIcons.event}>

						<Image src={medicalIcon} width={40} height={35} />
						<p className={FeatureIcons.iconName}>Medical</p>

					</div>
					<div className={FeatureIcons.event}>

						<Image src={techIcon} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Technology</p>

					</div>
					<div className={FeatureIcons.event} style={{ filter: 'grayscale(100%)' }}>

						<Image src={fashion} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Fashion</p>

					</div>
					<div className={FeatureIcons.event} style={{ filter: 'grayscale(100%)' }}>

						<Image src={camera} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Video and Films</p>

					</div>
					<div className={FeatureIcons.event} style={{ filter: 'grayscale(100%)' }}>

						<Image src={fashion} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Fashion</p>

					</div>
					<div className={FeatureIcons.event}>

						<Image src={medicalIcon} width={40} height={35} />
						<p className={FeatureIcons.iconName}>Medical</p>

					</div>
					<div className={FeatureIcons.event}>

						<Image src={educationIcon} width={45} height={35} />
						<p className={FeatureIcons.iconName}>Education</p>

					</div>
					<div className={FeatureIcons.event} style={{ filter: 'grayscale(100%)' }}>

						<Image src={fashion} width={35} height={35} />
						<p className={FeatureIcons.iconName}>Fashion</p>

					</div>
				</Slider>

			</div>
		</Container>
	)
}

export default FeatureIcon
