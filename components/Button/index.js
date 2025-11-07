import React from 'react'
import styles from './style.module.css'

const Button = ({ sm, text,onClick,type,filterValue}) => {
	return (
		<div>

			{ !sm ? (
				<button type={type}  onClick={onClick} className={styles.btn} >
					{text}
				</button>
			) : (
				<button onClick={onClick} className={styles.btn_sm}>
					{text}
				</button>
			)}
		</div>
	)
}
export default Button
