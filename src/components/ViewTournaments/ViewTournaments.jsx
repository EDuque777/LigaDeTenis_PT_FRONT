"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, allTournaments, viewTournament } from "../../redux/actions";
import styles from '../StylesFull/register.module.css';

const ViewTournaments = () => {

    const dispatch = useDispatch();

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



    const handleRedirectInfo = (tournamentId) => {
        dispatch(viewTournament(tournamentId));
        window.location.href = `/homePage/tournaments/${tournamentId}`;
    }
    
  return (

    <div>
        <h1 className={styles.containerTitleProfileFull} >Tournaments</h1>
        <div>
            {dbTournaments.length > 0 ? (
                dbTournaments.map((tournament) => (
                    <button key={tournament.id} onClick={() => handleRedirectInfo(tournament.id)} className={styles.containerButonTournamentFull}>
                        <div>
                            <p className={styles.containerTextProfile} >{tournament.name}</p>
                            <div className={styles.containerImageTournamentFull}>
                            <img src={tournament.cover_image} alt="Image Tournament" className={styles.imagenTournamentFullFull}/>
                            </div>
                            <p className={styles.containerTextProfile} >Start Date:</p>
                            <p className={styles.containerTextProfile}>{tournament.start_date}</p>
                        </div>
                    </button>
                ))
            ) : (
                <p>There are no tournaments at the moment</p>
            )}
        </div>
    </div>

  );
}


export default ViewTournaments