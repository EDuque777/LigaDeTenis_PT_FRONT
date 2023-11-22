"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, profile, allTournaments } from "../../redux/actions";
import styles from '../StylesFull/register.module.css';

const ViewInfoUser = ({ id }) => {

    const dispatch = useDispatch();

    const dbUsers = useSelector(state => state.userAll);
    const dbUserProfile = useSelector(state => state.profileView);

    const selectedUser = dbUsers.find(user => user.id === id);

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


    useEffect(() => {
        if (dbUserProfile.role === "users") {
          window.location.href = "/homePage";
        }
    }, [dbUserProfile]);

    if (!selectedUser) {
        return <p>Loading...</p>;
    }
    
  return (

    <div>

        <div>
            <h1 className={styles.containerTitleProfileFull} >{selectedUser.full_name}</h1>
        </div>

        <div className={styles.containerImageProfileFull} >
            <img src={selectedUser.imageprofile_picture} alt="Profile Picture"  className={styles.imagenProfileFullFull} />
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Name:</p>
            <p className={styles.containerTextProfile} >{selectedUser.name}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Last Name:</p>
            <p className={styles.containerTextProfile} >{selectedUser.last_name}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Mobil Phone:</p>
            <p className={styles.containerTextProfile} >{selectedUser.mobile_phone}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Birthdate:</p>
            <p className={styles.containerTextProfile} >{selectedUser.birthdate}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Email:</p>
            <p className={styles.containerTextProfile} >{selectedUser.email}</p> 
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Username:</p>
            <p className={styles.containerTextProfile} >{selectedUser.username}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Nationality:</p>
            <p className={styles.containerTextProfile} >{selectedUser.nationality}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Gender:</p>
            <p className={styles.containerTextProfile} >{selectedUser.gender}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile}>Tournaments you are participating in</p>
            {selectedUser.tournament_participation && selectedUser.tournament_participation.length > 0 ? (
                <ul>
                    {selectedUser.tournament_participation.split(", ").map((tournament, index) => (
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


export default ViewInfoUser