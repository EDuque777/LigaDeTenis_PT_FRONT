"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, profile, allTournaments } from "../../redux/actions";
import Link from "next/link"
import styles from '../StylesFull/register.module.css';

const ViewProfile = () => {

    const dispatch = useDispatch();

    const dbUserProfile = useSelector(state => state.profileView);
    const dbTournaments = useSelector(state => state.tournamentsAll);

    useEffect(() => {
      dispatch(allUsers());
      dispatch(allTournaments())
    }, [dispatch]);


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
            <h1 className={styles.containerTitleProfileFull}>{dbUserProfile.full_name}</h1>
        </div>

        <div className={styles.containerImageProfileFull}>
            <img src={dbUserProfile.imageprofile_picture} alt="Profile Picture" className={styles.imagenProfileFullFull} />
        </div>

        <div>
            <p className={styles.containerTitleProfile}>Name:</p>
            <p className={styles.containerTextProfile}>{dbUserProfile.name}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Last Name:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.last_name}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Mobil Phone:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.mobile_phone}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Birthdate:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.birthdate}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Email:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.email}</p> 
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Username:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.username}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Nationality:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.nationality}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Gender:</p>
            <p className={styles.containerTextProfile} >{dbUserProfile.gender}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile}>Tournaments you are participating in</p>
            {dbUserProfile.tournament_participation && dbUserProfile.tournament_participation.length > 0 ? (
                <ul>
                    {dbUserProfile.tournament_participation.split(", ").map((tournament, index) => (
                        <li key={index} className={styles.containerTextProfile}>{tournament}</li>
                    ))}
                </ul>
            ) : (
                <p className={styles.containerTextProfile} >You have not subscribed to any tournament</p>
            )}
        </div>

    </div>

  );
}


export default ViewProfile