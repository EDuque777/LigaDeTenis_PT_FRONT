"use client"
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from '../components/StylesPreloader/stylePreloader.module.css';
import Login from "../components/LoginUser/LoginUser"

const CentralAcces = () => {

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
          <h1 className={styles.containerText}>Welcome to the tennis league!!!</h1>
        </div>
      )}
      <div>
        <Login />
      </div>
    </div>
  );

};

export default CentralAcces;






// "use client"
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { allUsers, loginUser } from "../redux/actions";
// import { isValidEmail, isValidPassword } from "../validations/loginValidation";

// const Login = () => {

//     const dispatch = useDispatch();

//     const dbUsers = useSelector(state => state.userAll);
//     const UsersLoginFull = useSelector((state) => state.userLogin);

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//       dispatch(allUsers());
//     }, [dispatch]);

//     const togglePasswordVisibility = () => {
//       setShowPassword(!showPassword);
//     };

//     const handleLogin = () => {

//       const emailValidation = isValidEmail(email);
//       const passwordValidation = isValidPassword(password);

//       if (emailValidation !== true) {
//         setErrorMessage(emailValidation);
//         return; 
//       }

//         if (passwordValidation !== true) {
//         setErrorMessage(passwordValidation);
//         return;
//       }

//       const existingUser = dbUsers.find((user) => user.email === email);

//       if (!existingUser) {
//         setErrorMessage("Incorrect email and/or password");
//         return;
//       }

//       if (existingUser.confirm_password !== password) {
//         setErrorMessage("Incorrect email and/or password");
//         return;
//       }

//       setErrorMessage(""); 
//       const userData = { 
//         emailLogin: email, 
//         passwordLogin: password 
//       };
//       dispatch(loginUser(userData));

//     }

//     const token = UsersLoginFull.token;
//     const tokenId = UsersLoginFull.userId;

//     if (token && tokenId) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", tokenId);
//     }

//     const localToken = localStorage.getItem("token");
//     const userIdToken = localStorage.getItem("userId");

//     useEffect(() => {
//       if (localToken && userIdToken) {
//         window.location.href = "/home";
//       }
//     }, [localToken, userIdToken]);
    
//   return (

//         <div>
//             <div>
//             <label>Email:</label>
//             <input type="email" value={email} placeholder="esteban@gmail.com" onChange={(event) => setEmail(event.target.value)} />
//             </div>
//         </div>
//   );
// }


// export default Login