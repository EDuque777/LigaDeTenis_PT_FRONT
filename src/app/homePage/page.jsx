// import Logout from "../../components/Logout/Logout"
// import ButtonProfile from "../../components/ViewProfile/ButtonProfile"
// import ButtonHome from "../../components/ButtonHome/ButtonHome"
// import ButtonTournament from "../../components/ViewTournaments/ButtonTournaments"
// import DashboardAdmin from "../../components/ButonAdmin/ButtonAdmin"

// const HomePage = () => {

//   return (
//     <div>
//       <Logout />
//       <ButtonHome /> 
//       <ButtonTournament />
//       <DashboardAdmin />
//       <ButtonProfile />
//     </div>
//   );

// };

// export default HomePage;






"use client"
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Logout from "../../components/Logout/Logout"
import ButtonProfile from "../../components/ViewProfile/ButtonProfile"
import ButtonHome from "../../components/ButtonHome/ButtonHome"
import ButtonTournament from "../../components/ViewTournaments/ButtonTournaments"
import DashboardAdmin from "../../components/ButonAdmin/ButtonAdmin"
import styles from '../../components/StylesPreloader/stylePreloader.module.css';

const HomePage = () => {

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
    <div className={styles.containerFullFull}>
      {loading && (
        <div className={styles.preloaderOverlay}>
          <FaSpinner className={styles.spinnerIcon}/>
        </div>
      )}
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
        <div className={styles.textContainerInfo}>
          <p>This is my tennis page I hope you enjoy and have a very good experience and remember I am:</p>
        </div>
        <div className={styles.titleContainerInfo}>
          <p>ESTEBAN DUQUE</p>
        </div>

        <div className={styles.textContainerInfo}>
          <p>Page creator!!!</p>
        </div>
    </div>
  );
};

export default HomePage;