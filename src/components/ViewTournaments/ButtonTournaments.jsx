"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/actions";
import Link from "next/link"
import styles from '../StylesFull/register.module.css';

const ButtonTournament = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(allUsers());
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
    
  return (

    <div>
        
        <button className={styles.buttonTournament}>
            <Link href="/homePage/tournaments" >
              Tournaments
            </Link>
        </button>

    </div>

  );
}


export default ButtonTournament