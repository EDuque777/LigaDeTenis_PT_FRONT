"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions";
import styles from '../StylesFull/register.module.css';

const DashboardAdmin = () => {

    const dispatch = useDispatch();

    const dbUserProfile = useSelector(state => state.profileView);

    const handleDashboard = () => {
        window.location.href = `/homePage/dashboard`;
    }

    // if (typeof localStorage !== 'undefined') {
    //     const localToken = localStorage.getItem("token");
    //     const userIdToken = localStorage.getItem("userId");
      
    //     useEffect(() => {
    //       if (!localToken && !userIdToken) {
    //         window.location.href = "/";
    //       }
    //     }, [localToken, userIdToken]);
    // }


    const localToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const userIdToken = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

      useEffect(() => {
        if (!localToken && !userIdToken) {
          window.location.href = "/";
        }
      }, [localToken, userIdToken]);


    // if (typeof localStorage !== 'undefined') {
    //     const localTokenProfile = localStorage.getItem("token");
    //     const userIdTokenProfile = localStorage.getItem("userId");
      
        useEffect(() => {
            if (localToken && userIdToken) {
                dispatch(profile(userIdToken));
            }
        }, [localToken, userIdToken]);
    //}

    return (
        <div>
            <div>
                {dbUserProfile.role === 'admin' && (
                    <button type="button" onClick={handleDashboard} className={styles.buttonManage}>Manage</button>
                )}
            </div>
        </div>
    )
}

export default DashboardAdmin;