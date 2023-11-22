"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, allTournaments, deleteTournament, profile } from "../../redux/actions";
import Swal from 'sweetalert2';
import styles from '../StylesFull/register.module.css';


const DashboardTournament = () => {

    const dispatch = useDispatch();

    const dbTournaments = useSelector(state => state.tournamentsAll);
    const deleteTournamentAdmin = useSelector(state => state.tournamentsDelete);
    const dbUserProfile = useSelector(state => state.profileView);

    useEffect(() => {
        dispatch(allUsers());
        dispatch(allTournaments())
      }, [dispatch, deleteTournamentAdmin]);

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

    const handleCreateTournament = () => {
        window.location.href = `dashboardTournament/dashboardCreatedTournament`;
    }

    const handleEditTournament = (tournamentId) => {
        window.location.href = `dashboardTournament/${tournamentId}`;
    }

    const handleInfoTournament = (tournamentId) => {
        window.location.href = `dashboardTournament/info/${tournamentId}`;
    }

    const handleDeleteTournament = (tournamentId) => {
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
                dispatch(deleteTournament(tournamentId));
                Swal.fire(
                    'Removed',
                    'The tournament has been eliminated',
                    'success'
                );
            }
        });
    }

    return (
        <div>
            {dbTournaments.length === 0 ? (
                <p>There are no tournaments at the moment</p>
            ) : (
                <div className={styles.containerAllUsersAdmin} >
                    <div>
                        <p className={styles.containerTextProfile} >Title:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Amount of participants:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.total_participants}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Start date:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.start_date}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Prize:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.winner_prize} USD</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Location country:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.country_of_location}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Subscription price:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullText} >
                                <p>{tournament.subscription_price} USD</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={styles.containerTextProfile} >Actions:</p>
                        {dbTournaments.map(tournament => (
                            <div key={tournament.id} className={styles.userDbAllFullActiond} >
                                <button type="button" onClick={() => handleEditTournament(tournament.id)} className={styles.buttonAllUsers} >Edit</button>
                                <button type="button" onClick={() => handleDeleteTournament(tournament.id)} className={styles.buttonAllUsers} >Delete</button>
                                <button type="button" onClick={() => handleInfoTournament(tournament.id)} className={styles.buttonAllUsers} >Info</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>
            <button type="button" onClick={handleCreateTournament} className={styles.buttonCreatedUserFull} >Create</button>
            </div>
        </div>
    )
}

export default DashboardTournament;