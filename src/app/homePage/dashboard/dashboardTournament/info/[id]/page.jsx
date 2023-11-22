"use client"
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from '../../../../../../components/StylesPreloader/stylePreloader.module.css';
import Logout from "../../../../../../components/Logout/Logout"
import ButtonProfile from "../../../../../../components/ViewProfile/ButtonProfile"
import ButtonHome from "../../../../../../components/ButtonHome/ButtonHome"
import ButtonTournament from "../../../../../../components/ViewTournaments/ButtonTournaments"
import DashboardAdmin from "../../../../../../components/ButonAdmin/ButtonAdmin"
import Dashboard from "../../../../../../components/Dashboard/Dashboard"
import InfoTournamentsFull from "../../../../../../components/Dashboard/InfoTournamentFull"

const InfoTournamentDashboardFull = ({ params }) => {

    const id = params.id

    const simulateLoading = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      };
    
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        simulateLoading().then(() => {
          setLoading(false);
        });
      }, []);

  return (

    <div className={styles.containerFullFull} >
    {loading && (
      <div className={styles.preloaderOverlay}>
        <FaSpinner className={styles.spinnerIcon}/>
      </div>
    )}
      <div>
      <div className={styles.containerButtons}>
        <div className={styles.containerTitleText}>
          <h1>TENNIS LEAGUE</h1>
        </div>
        <div className={styles.containerButtonsExt}>
        <ButtonHome /> 
        <ButtonTournament />
        <DashboardAdmin />
        </div>
        <div className={styles.containerViewLog}>
        <ButtonProfile />
        <Logout />
        </div>
      </div>
      <div className={styles.centerViewProfiel}>
      <Dashboard />
      </div>
      <div className={styles.centerViewProfiel}>
      <InfoTournamentsFull id={id} />
      </div>
      </div>
    
  </div>
  );

};

export default InfoTournamentDashboardFull;