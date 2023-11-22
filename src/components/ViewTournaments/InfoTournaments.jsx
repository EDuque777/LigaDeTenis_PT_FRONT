"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, viewTournament } from "../../redux/actions";
import BuySupcription from "../BuySupcription/BuySupcription"
import styles from '../StylesFull/register.module.css';

const InfoTournaments = ({ id }) => {

    const dispatch = useDispatch();

    const dbTournaments = useSelector(state => state.tournamentView);
    
    const [totalParticipants, setTotalParticipants] = useState(0);

    useEffect(() => {
      dispatch(allUsers());
      dispatch(viewTournament(id))
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

    useEffect(() => {
        if (dbTournaments.all_participants) {
            const participantsArray = dbTournaments.all_participants.split(",");
            setTotalParticipants(participantsArray.length);
        }
    }, [dbTournaments.all_participants]);
    
  return (

    <div>
        <div>
            <h1 className={styles.containerTitleProfileFull} >{dbTournaments.name}</h1>
        </div>

        <div className={styles.containerImageTournamentTotal} >
            <img src={dbTournaments.cover_image} alt="Picture" className={styles.imagenTournamentFullTotal} />
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Start Date: </p>
            <p className={styles.containerTextProfile} >{dbTournaments.start_date}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Maximum number of participants</p>
            <p className={styles.containerTextProfile} >{dbTournaments.total_participants}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Winner Prize:</p>
            <p className={styles.containerTextProfile} >{dbTournaments.winner_prize} USD</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Location country:</p>
            <p className={styles.containerTextProfile} >{dbTournaments.country_of_location}</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Subscription price</p>
            <p className={styles.containerTextProfile} >{dbTournaments.subscription_price} USD</p>
        </div>

        <div>
            <p className={styles.containerTitleProfile} >Tamount of participants:</p>
            <p className={styles.containerTextProfile} >{totalParticipants}</p>
        </div>

        <BuySupcription price={dbTournaments.subscription_price} idTournaments={id} />

    </div>

  );
}


export default InfoTournaments