import { useSetRecoilState } from "recoil";
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

} from '../recoil/popup'
export const usePopUp = () => {
    //states
    const setOpenOrClosePopup = useSetRecoilState(popupOpenOrClose);
    const setPopupHeading = useSetRecoilState(popupHeading);
    const setContent = useSetRecoilState(popupContent);
    const setContentMessage = useSetRecoilState(popupContentMessage);
    const setContentCloseMarkPopup = useSetRecoilState(popupContentCloseMark);
    const setcustomContentPopup = useSetRecoilState(popupCustomContent);
    const setPointFingerPopup = useSetRecoilState(popupPointFinger);
    const setSuccessTickPopup = useSetRecoilState(popupSuccessTick);
    const setThumbDownPopup = useSetRecoilState(popupThumbDown);
    const setTransparentPopup = useSetRecoilState(popupTransparent);
    const setgotoEmailPopup = useSetRecoilState(popupGotoEmail);
    const setResendEmailPopup = useSetRecoilState(popupResendEmail);
    const setOkButtonPopup = useSetRecoilState(popupOkButton);
    const setCancelButtonPopup = useSetRecoilState(popupCancelButton);
    const setYesButtonPopup = useSetRecoilState(popupYesButton);
    // hook
    const [resetPopUp] = useResetPopupState()
    const showPopup = (
        {
            heading,
            showClose,
            content,
            customContent,
            pointFinger,
            successTick,
            ThumbDown,
            transparent,
            message,
            onOkPressed,
            onCancelpressed,
            onYesPressed,
            gotoEmailAction,
            resendEmailAction
        }) => {
        resetPopUp()
        setOpenOrClosePopup(true)
        setPopupHeading(heading)
        setContent(content)
        setContentMessage(message)
        setContentCloseMarkPopup(showClose)
        setcustomContentPopup(customContent)
        setPointFingerPopup(pointFinger)
        setSuccessTickPopup(successTick)
        setThumbDownPopup(ThumbDown)
        setTransparentPopup(transparent)
        if (gotoEmailAction) {
            setgotoEmailPopup({ onClick: gotoEmailAction })
        }
        if (resendEmailAction) {
            setResendEmailPopup({ onClick: resendEmailAction })
        }
        if (onOkPressed) {
            setOkButtonPopup({ onClick: onOkPressed })
        }

        if (onCancelpressed) {
            setCancelButtonPopup({ onClick: onCancelpressed })
        }
        if (onYesPressed) {
            setYesButtonPopup({ onClick: onYesPressed })
        }

    }
    const hidePopup = () => {
        resetPopUp()
    }
    return [showPopup, hidePopup]

}