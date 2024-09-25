import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
export default function Logout() {
    const user=useSelector(selectLoggedInUser)
    console.log(user)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(signOutAsync())
    })
  return (
    <div>
{        !user && <Navigate to='/login' replace={true}></Navigate>
}
    </div>
  )
}
