import React from 'react'
import styles from './commonpopup.module.css'

function CommonPopup(props) {
    return (
        <div className={styles.mailPopup}>
            <p className={styles.activationLink}>Hi, {props.userName}. {props.content} <strong>{props.projectName}</strong> {props.content2}</p>
            <button className={styles.okayBtn}>OK</button>
        </div>
    )
}

export default CommonPopup;