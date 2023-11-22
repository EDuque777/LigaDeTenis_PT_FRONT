"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, profile, allTournaments } from "../../redux/actions";
import styles from '../StylesFull/register.module.css';


const BuySupcription = ({ price, idTournaments }) => {

    const dispatch = useDispatch();

    const youPerfil = useSelector((state) => state.profileView);
    const dbTournaments = useSelector(state => state.tournamentsAll);
    const selectedTournament = dbTournaments.find(tournament => tournament.id === idTournaments);

    const [errorMessage, setErrorMessage] = useState(null);

    let hasTournamentParticipation = false;

    if (youPerfil && selectedTournament && youPerfil.tournament_participation) {
        const tournamentParticipationList = youPerfil.tournament_participation.split(',').map(item => item.trim());
        hasTournamentParticipation = tournamentParticipationList.includes(selectedTournament.name);
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
        dispatch(allTournaments())
      }, [dispatch]);

    const handleBuyPixels = async () => {
        try {
            await dispatch(createOrder(price, youPerfil, idTournaments));
        } catch (error) {
            setErrorMessage("The purchase could not be completed. Please try again later.");
        }
    }

    return (
        <div>
            <button onClick={handleBuyPixels} disabled={hasTournamentParticipation} className={`${hasTournamentParticipation ? styles.submitButtonDisable : styles.submitButton}`} >
                {hasTournamentParticipation ? 'Subscribed' : 'Buy subscription'}
            </button>
            {hasTournamentParticipation && (
                <p className={styles.containerTextProfile} >You are already subscribed to this tournament.</p>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default BuySupcription;