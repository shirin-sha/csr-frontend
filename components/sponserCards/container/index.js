import React from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import styles from './container.module.css'


const Container = (props) => {
	const { type, data } = props
	return (
		<div className={styles.container}>
			{data?.map((item) => {
				return (
					<div key={item._id} className={styles.cardWrap1}>
						<Card {...props}  type={type} data={item}  />
					</div>
				)
			})}
		</div>
	)


	
}
Container.propTypes = {
	// eslint-disable-next-line react/require-default-props
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			amount: PropTypes.string,
			sponsor_status: PropTypes.bool,
			applicant_status: PropTypes.bool,
			sponsor_id:PropTypes.object
		})
	),
	// eslint-disable-next-line react/require-default-props
	type: PropTypes.string,
	// eslint-disable-next-line react/require-default-props
	noButtonClicked: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	acceptButton: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	removeButton: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	messageButton: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	confirmHandler: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	editHandler: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	messageHandler: PropTypes.func,
	// eslint-disable-next-line react/require-default-props
	deleteHandler: PropTypes.func,
	mutate:PropTypes.func
	
}
export default Container
