"use client"
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from '../../components/StylesPreloader/stylePreloader.module.css';
import Register from "../../components/RegisterUser/RegisterUser"

const UserRegister = () => {

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

    <div className={styles.foundBack}>
      {loading && (
        <div className={styles.preloaderOverlay}>
          <FaSpinner className={styles.spinnerIcon}/>
        </div>
      )}
      <div>
        <Register />
      </div>
    </div>

  );

};

export default UserRegister;