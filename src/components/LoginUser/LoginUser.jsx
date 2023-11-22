"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, loginUser } from "../../redux/actions";
import { isValidEmail, isValidPassword } from "../../validations/loginValidation";
import Link from "next/link"
import styles from '../StylesFull/login.module.css';

const Login = () => {

    const dispatch = useDispatch();

    const dbUsers = useSelector(state => state.userAll);
    const UsersLoginFull = useSelector((state) => state.userLogin);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      dispatch(allUsers());
    }, [dispatch]);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleLogin = () => {

      const emailValidation = isValidEmail(email);
      const passwordValidation = isValidPassword(password);

      if (emailValidation !== true) {
        setErrorMessage(emailValidation);
        return; 
      }

        if (passwordValidation !== true) {
        setErrorMessage(passwordValidation);
        return;
      }

      const existingUser = dbUsers.find((user) => user.email === email);

      if (!existingUser) {
        setErrorMessage("Incorrect email and/or password");
        return;
      }

      if (existingUser.confirm_password !== password) {
        setErrorMessage("Incorrect email and/or password");
        return;
      }

      setErrorMessage(""); 
      const userData = { 
        emailLogin: email, 
        passwordLogin: password 
      };
      dispatch(loginUser(userData));

    }

    useEffect(() => {
        const token = UsersLoginFull.token;
        const tokenId = UsersLoginFull.userId;
    
        if (token && tokenId) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", tokenId);
          dispatch(allUsers());
        }
      }, [UsersLoginFull]);

    // if (typeof localStorage !== 'undefined') {
    //     const localToken = localStorage.getItem("token");
    //     const userIdToken = localStorage.getItem("userId");
      
    //     useEffect(() => {
    //       if (localToken && userIdToken) {
    //         window.location.href = "/homePage";
    //       }
    //     }, [localToken, userIdToken]);
    //   }

    const localToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const userIdToken = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

    useEffect(() => {
        if (localToken && userIdToken) {
            window.location.href = "/homePage";
            }
    }, [localToken, userIdToken]);

    
  return (

        <div className={styles.containerFull}>

          <h1 className={styles.titleLogin}>Login</h1>

            <div className={styles.containerEmail}>
                <p className={styles.titleEmail}>Email: </p>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={styles.inputEmail}/>
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Password: </p>
                <div className={styles.containerPassword}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className={styles.inputPassword} />
                <div>
                    <button type="button" onClick={togglePasswordVisibility} className={styles.containerButton}>
                    {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                </div>
            </div>

            <div className={styles.containerSubmit}>
                <button type="button" onClick={handleLogin} className={styles.submitButton}><span>Submit Now</span></button>
                {errorMessage && <p className={styles.titleEmail} >{errorMessage}</p>}
            </div>
                
            <div className={styles.parrafoContainer}>
                You do not have an account? 
                <Link href="/signUp">
                    Sign up
                </Link>
            </div>
    </div>

  );
}


export default Login