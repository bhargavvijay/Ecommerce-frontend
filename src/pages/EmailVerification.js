import React,{useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { EmailVerificationAsync, selectEmailVerified } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
export default function EmailVerification() {
    const dispatch = useDispatch();

    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')
    const email = query.get('email')
    const emailVerified=useSelector(selectEmailVerified);
    console.log(emailVerified)
    useEffect(()=>{
        dispatch(EmailVerificationAsync({token:token,email:email}))
      },[dispatch])  
  return (
  <>
  {emailVerified && <Navigate to='/' replace={true}></Navigate>}
  <div>
      
  </div>
  </>
    
  )
}
