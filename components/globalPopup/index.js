import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil";
import {
    popupOpenOrClose,
    popupHeading,
    popupContent,
    popupContentCloseMark,
    popupCustomContent,
    popupPointFinger,
    popupSuccessTick,
    popupThumbDown,
    popupTransparent,
    popupContentMessage,
    popupGotoEmail,
    popupResendEmail,
    popupOkButton,
    popupCancelButton,
    popupYesButton,
    useResetPopupState
} from '../../recoil/popup'
import closeButton from '../../images/closeButton.png'
import successTick from '../../images/successTick.png'
import innerClose from '../../images/innerClose.png'
import thumbsDownImg from '../../images/thumbsDownImg.png'
import handSignal from '../../images/handSignal.png'
import Button from '../Button'
import Image from 'next/image'
import styles from './globalPopup.module.css'

const GlobalPopup = () => {
    // states
    const [openOrClosePopup, setOpenOrClosePopup] = useRecoilState(popupOpenOrClose);
    // hook
    const [resetPopUp] = useResetPopupState()
    // values
    const headingPopup = useRecoilValue(popupHeading);
    const contentPopup = useRecoilValue(popupContent);
    const contentMessagePopup = useRecoilValue(popupContentMessage);
    const contentCloseMarkPopup = useRecoilValue(popupContentCloseMark);
    const customContent = useRecoilValue(popupCustomContent);
    const pointFingerPopup = useRecoilValue(popupPointFinger);
    const successTickPopup = useRecoilValue(popupSuccessTick);
    const thumbDownPopup = useRecoilValue(popupThumbDown);
    const transparentPopup = useRecoilValue(popupTransparent);
    const gotoEmailPopup = useRecoilValue(popupGotoEmail);
    const resendEmailPopup = useRecoilValue(popupResendEmail);
    const okButtonPopup = useRecoilValue(popupOkButton);
    const cancelButtonPopup = useRecoilValue(popupCancelButton);
    const yesButtonPopup = useRecoilValue(popupYesButton);

    // handling background scroll of body
    useEffect(() => {

        if (openOrClosePopup) { document.body.style.overflow = 'hidden' }
        return () => {
            document.querySelector('body').style.overflow = 'visible'
            //reset to default values
            resetPopUp()
        }
    }, [])
    useEffect(() => {
        if (openOrClosePopup) {
            setTimeout(() => {
                console.log('hh');
                setOpenOrClosePopup(false)
            }, 1000000);


        }
    })
    //event handlers
    const toggleOpenOrClosePopup = () => {
        setOpenOrClosePopup((prev) => { return !prev })
    }

    return (
        openOrClosePopup && <div className={`${styles.popupWrap} ${transparentPopup ? '' : styles.bgImgadd}`}>

            <div className={styles.closeButtonWrap}>


                {contentCloseMarkPopup && <div className={styles.closeButton} onClick={toggleOpenOrClosePopup}>
                    <Image src={closeButton} layout="fill" />
                </div>}

            </div>

            <div className={styles.boxBig}>
                <div className={styles.boxSmall}>
                    {contentCloseMarkPopup && <div className={styles.innerCloseWrap} onClick={toggleOpenOrClosePopup}>
                        <Image src={innerClose} width="20" height="20" /></div>}
                    {successTickPopup && <div className={styles.popUpMainImage}>
                        <Image src={successTick} layout="fill" />

                    </div>}
                    {thumbDownPopup && <div className={styles.popUpMainImage}>

                        <Image src={thumbsDownImg} layout="fill" />
                    </div>}
                    <div className={styles.newHeading}>
                        <div className={styles.newHeadingInner}>
                            <h1> {headingPopup}
                            </h1>

                        </div>
                    </div>
                    <p className={styles.prompt}>
                        {contentPopup}
                        {customContent}
                    </p>
                    {(okButtonPopup || yesButtonPopup || cancelButtonPopup) && <div className={styles.actionButtions}>
                        {okButtonPopup && <div className={styles.actionButtionWrap} onClick={okButtonPopup.onClick}>
                            <Button text="Ok" sm />
                        </div>}
                        {yesButtonPopup && <div className={styles.actionButtionWrap} onClick={yesButtonPopup.onClick}>
                            <Button text="Yes" sm />
                        </div>}
                        {cancelButtonPopup && <div className={styles.actionButtionWrap} onClick={cancelButtonPopup.onClick}>
                            <Button text="Cancel" sm />
                        </div>}
                    </div>}

                    <p className={styles.message}>

                        {contentMessagePopup}
                    </p>
                    {pointFingerPopup && <div className={styles.handSignalWrap}>
                        <Image src={handSignal} layout="fill" />
                    </div>}

                    {gotoEmailPopup && <p className={styles.gotoEmail} onClick={gotoEmailPopup.onClick}>
                        Go to email ?
                    </p>}

                    {resendEmailPopup && <p className={styles.resendEmail} onClick={resendEmailPopup.onClick}>
                        Resend email
                    </p>}

                </div>
            </div>
        </div >
    )
}
export default GlobalPopup