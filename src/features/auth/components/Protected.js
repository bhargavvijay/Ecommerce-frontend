import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAllUserInfo, selectEmailVerified, selectLoggedInUser } from "../authSlice";

function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    const emailVerified=useSelector(selectEmailVerified); 
    const allInfoUser=useSelector(selectAllUserInfo);
    console.log(allInfoUser);

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else{
        if(emailVerified || allInfoUser.verified){
            return children;
        }
        else{
            return <Navigate to='/payment-failed' replace={true}></Navigate>
        }
    }
}

export default Protected;