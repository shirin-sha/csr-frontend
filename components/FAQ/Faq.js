import { React, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './faq.module.css'
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'

function FaqQuestionInstance(props) {
	const { instanceData } = props
	const [expanded, setExpanded] = useState(false)
	const toggleContent = () => {
		setExpanded((prev) => { return !prev })
	}
	return (
		<div className={styles.faqInstance}>
			<div className={styles.Question}>
				{!expanded && (
					<div
						role="button"
						className={styles.addIcon}
						onClick={() => { toggleContent() }}
						onKeyDown={() => { toggleContent() }}
						tabIndex={0}
					>
						<div className={styles.iconPlusOrMinus}>
							<Image src={plus} />
						</div>
					</div>
				)}

				{expanded && (
					<div
						role="button"
						className={styles.minusIcon}
						onClick={() => { toggleContent() }}
						onKeyDown={() => { toggleContent() }}
						tabIndex={-1}
					>
						<div className={styles.iconPlusOrMinus}>
							<Image src={minus} />
						</div>
					</div>
				)}
				<p>{instanceData.qstn}</p>

			</div>
			{expanded && (
				<div
					className={styles.plusDiv}
				>
					{/* <div style={{width:'25%'}}>
						<Image src={instanceData.img} width={400} height={250} /></div> */}
					<div style={{width:'75%'}}>
						<p className={styles.plusContent}>
							{instanceData.ans}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

FaqQuestionInstance.propTypes = {
	// eslint-disable-next-line react/require-default-props
	instanceData: PropTypes.shape({
		qstn: PropTypes.string,
		ans: PropTypes.string,
		img: PropTypes.node
	})
}

export default FaqQuestionInstance
