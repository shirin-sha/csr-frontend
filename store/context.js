import React,{createContext,useEffect,useLayoutEffect,useState} from 'react';
export const AuthContext=createContext()
export default function Context({ children }) {
    const [userData, setUserData] = useState({
      token:'',
      userId:'',
      userType:-1,
      userName:'',
      appType:'',
      isAuthorized:false
    });
    useEffect(()=>{
      setUserData({
        token:localStorage.getItem('Token'),
        userId:localStorage.getItem('UserId'),
        userType:localStorage.getItem('User'),
        userName:localStorage.getItem('userName'),
        appType:localStorage.getItem("AppType"),
        isAuthorized:true
     })
    },[])
  
    return <AuthContext.Provider value={{userData,setUserData}}>{children}</AuthContext.Provider>;
  }