"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import Link from "next/link"
import styles from '../StylesFull/register.module.css';

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(logoutUser());
        localStorage.clear();
        window.location.reload();

    }

    // if (typeof localStorage !== 'undefined') {
    //     const localToken = localStorage.getItem("token");
    //     const userIdToken = localStorage.getItem("userId");
      
    //     useEffect(() => {
    //       if (!localToken && !userIdToken) {
    //         window.location.href = "/";
    //       }
    //     }, [localToken, userIdToken]);
    //   }

    const localToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const userIdToken = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

      useEffect(() => {
        if (!localToken && !userIdToken) {
          window.location.href = "/";
        }
      }, [localToken, userIdToken]);
    
  return (

        <div>
            <button type="button" onClick={handleLogout} className={styles.buttonLogut}><span>Log Out</span></button>
        </div>

  );
}


export default Logout