import { useResetRecoilState } from "recoil";
import {
    popupOpenOrClose,
    popupHeading,
    popupContent,
    popupTransparent,
    popupContentCloseMark,
    popupCustomContent,
    popupPointFinger,
    popupSuccessTick,
    popupThumbDown,
    popupContentMessage,
    popupGotoEmail,
    popupResendEmail,
    popupOkButton,
    popupCancelButton,
    popupYesButton,
} from '../../recoil/popup'

const useResetPopupState = () => {
    // reset state references
    const resetOpenOrClosePopup = useResetRecoilState(popupOpenOrClose);
    const resetPopupHeading = useResetRecoilState(popupHeading);
    const resetContent = useResetRecoilState(popupContent);
    const resetContentMessage = useResetRecoilState(popupContentMessage);
    const resetContentCloseMarkPopup = useResetRecoilState(popupContentCloseMark);
    const resetContentPopup = useResetRecoilState(popupCustomContent);
    const resetPointFingerPopup = useResetRecoilState(popupPointFinger);
    const resetSuccessTickPopup = useResetRecoilState(popupSuccessTick);
    const resetThumbDownPopup = useResetRecoilState(popupThumbDown);
    const resetTransparentPopup = useResetRecoilState(popupTransparent);
    const resetGotoEmailPopup = useResetRecoilState(popupGotoEmail);
    const resetResendEmailPopup = useResetRecoilState(popupResendEmail);
    const resetOkButtonPopup = useResetRecoilState(popupOkButton);
    const resetCancelButtonPopup = useResetRecoilState(popupCancelButton);
    const resetYesButtonPopup = useResetRecoilState(popupYesButton);

    const resetState=()=>{
        //reset to default
      resetOpenOrClosePopup()
      resetPopupHeading()
      resetContent()
      resetContentCloseMarkPopup()
      resetContentPopup()
      resetPointFingerPopup()
      resetSuccessTickPopup()
      resetThumbDownPopup()
      resetTransparentPopup()
      resetContentMessage()
      resetGotoEmailPopup()
      resetResendEmailPopup()
      resetOkButtonPopup()
      resetCancelButtonPopup()
      resetYesButtonPopup()
    }
    return [resetState]

}
export default useResetPopupState