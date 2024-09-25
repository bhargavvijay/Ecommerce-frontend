import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAllUserInfo, selectLoggedInUser } from "../authSlice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser)
    const allUserInfo=useSelector(selectAllUserInfo)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && allUserInfo.role!='admin'){
        return <Navigate to='/login' replace={true}></Navigate>

    }
    return children;
}

export default ProtectedAdmin;