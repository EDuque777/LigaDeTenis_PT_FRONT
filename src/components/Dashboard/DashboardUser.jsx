"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, blockUser, profile } from "../../redux/actions";
import Swal from 'sweetalert2';
import styles from '../StylesFull/register.module.css';


const DashboardUser = () => {

    const dispatch = useDispatch();

    const dbUsers = useSelector(state => state.userAll);
    const deleteUserAdmin = useSelector(state => state.userDelete);
    const blockUserAdmin = useSelector(state => state.userBlock);
    const dbUserProfile = useSelector(state => state.profileView);
    const dbUsersExceptMe = dbUsers.filter(user => user.id !== dbUserProfile.id);

    useEffect(() => {
        dispatch(allUsers());
      }, [dispatch, blockUserAdmin, deleteUserAdmin]);

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
    
    const handleCreateUser = () => {
        window.location.href = `dashboardUsers/dashboardCreateUser`;
    }

    const handleEditUser = (userId) => {
        window.location.href = `dashboardUsers/${userId}`;
    }

    const handleInfoUser = (userId) => {
        window.location.href = `dashboardUsers/info/${userId}`;
    }

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: "You're sure?",
            text: 'This action can not be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete user',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId));
                Swal.fire(
                    'Removed',
                    'The user has been deleted',
                    'success'
                );
            }
        });
    }

    const handleBlockUser = (userId) => {
        const userToUpdate = dbUsers.find(user => user.id === userId);

        const updatedUserData = {
            ...userToUpdate,
            locked: !userToUpdate.locked
        };

        Swal.fire({
            title: "You're sure?",
            text: "You are going to change the user's status",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, change status',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(blockUser(userId, updatedUserData));
                Swal.fire(
                    'Status changed',
                    "The user's status has been changed",
                    'success'
                );
            }
        });
    }

    return (
        <div>
            {dbUsersExceptMe.length === 0 ? (
                <p>There are no users at the moment</p>
            ) : (
                <div className={styles.containerAllUsersAdmin}>
                    <div>
                        <p className={styles.containerTextProfile} >Full Name:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.full_name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Email:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.email}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Nationality:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.nationality}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Gender:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.gender}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Role:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.role}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >State:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullText}>
                                <p>{user.locked ? 'locked' : 'Active'}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Actions:</p>
                        {dbUsersExceptMe.map(user => (
                            <div key={user.id} className={styles.userDbAllFullActiond}>
                                <button type="button" onClick={() => handleInfoUser(user.id)} className={styles.buttonAllUsers} >Info</button>
                                <button type="button" onClick={() => handleEditUser(user.id)} className={styles.buttonAllUsers} >Edit</button>
                                <button type="button" onClick={() => handleDeleteUser(user.id)} className={styles.buttonAllUsers} >Delete</button>
                                <button type="button" onClick={() => handleBlockUser(user.id)} className={styles.buttonAllUsers} >{user.locked ? 'Unlock' : 'Block'}</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>
            <button type="button" onClick={handleCreateUser} className={styles.buttonCreatedUserFull}>Create</button>
            </div>
        </div>
    )
}

export default DashboardUser;