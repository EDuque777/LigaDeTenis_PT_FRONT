"use client"
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from '../../../components/StylesPreloader/stylePreloader.module.css';
import Logout from "../../../components/Logout/Logout"
import ViewProfile from "../../../components/ViewProfile/ViewProfile"
import ButtonHome from "../../../components/ButtonHome/ButtonHome"
import ButtonProfile from "../../../components/ViewProfile/ButtonProfile"
import ButtonTournament from "../../../components/ViewTournaments/ButtonTournaments"
import DashboardAdmin from "../../../components/ButonAdmin/ButtonAdmin"

const Profile = () => {

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
        <ViewProfile />
        </div>
        </div>
      
    </div>
  );

};

export default Profile;