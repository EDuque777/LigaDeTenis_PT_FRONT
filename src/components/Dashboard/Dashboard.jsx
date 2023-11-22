"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions";
import styles from '../StylesFull/register.module.css';

const Dashboard = () => {

    const dispatch = useDispatch();

    const dbUserProfile = useSelector(state => state.profileView);

    const handleButtonUsers = () => {
        window.location.href = `/homePage/dashboard/dashboardUsers`;
    }

    const handleButtonTournaments = () => {
        window.location.href = `/homePage/dashboard/dashboardTournament`;
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

    useEffect(() => {
        if (dbUserProfile.role === "users") {
          window.location.href = "/homePage";
        }
    }, [dbUserProfile]);

    return (
        <div className={styles.containerButtonsTourUsers}>
            <div>
            <button type="button" onClick={handleButtonUsers} className={styles.buttonTourUsersUsers}>Manage Users</button>
            </div>
            <div>
            <button type="button" onClick={handleButtonTournaments} className={styles.buttonTourUsersTour} >Manage Tournaments</button>
            </div>
        </div>
    )
}

export default Dashboard;