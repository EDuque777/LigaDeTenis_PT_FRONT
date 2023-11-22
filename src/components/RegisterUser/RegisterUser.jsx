"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, registerUser } from "../../redux/actions";
import Link from "next/link"
import UploadImage from "./UploadImage";
import styles from '../StylesFull/register.module.css';
import { 
    isValidName,
    isValidLastName,
    isValidMobilePhone,
    isValidBirthdate,
    isValidEmail,
    isValidPassword,
    isValidConfirmPassword,
    isValidUsername,
    isValidNationality,
    isValidGender 
} from "../../validations/registerValidations";


const Register = () => {

    const dispatch = useDispatch();

    const dbUsers = useSelector(state => state.userAll);
    const UsersRegisterFull = useSelector((state) => state.userRegister);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    useEffect(() => {
      dispatch(allUsers());
    }, [dispatch]);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleImageUpload = (imageUrl) => {
        console.log(imageUrl)
        setProfilePictureUrl(imageUrl);
    };

    useEffect(() => {
        if (day && month && year) {
            setBirthdate(`${day}/${month}/${year}`);
        }
    }, [day, month, year]);

    const handleRegister = () => {

        const nameValidation = isValidName(name);
        const lastNameValidation = isValidLastName(lastName);
        const mobilePhoneValidation = isValidMobilePhone(mobilePhone);
        const birthdateValidation = isValidBirthdate(birthdate);
        const emailValidation = isValidEmail(email);
        const passwordValidation = isValidPassword(password);
        const confirmPasswordValidation = isValidConfirmPassword(password, confirmPassword);
        const usernameValidation = isValidUsername(username);
        const nationalityValidation = isValidNationality(nationality);
        const genderValidation = isValidGender(gender);

        if (nameValidation !== true) {
            setErrorMessage(nameValidation);
            return;
        }
      
        if (lastNameValidation !== true) {
            setErrorMessage(lastNameValidation);
            return;
        }
      
        if (mobilePhoneValidation !== true) {
            setErrorMessage(mobilePhoneValidation);
            return;
        }
      
        if (birthdateValidation !== true) {
            setErrorMessage(birthdateValidation);
            return;
        }
      
        if (emailValidation !== true) {
            setErrorMessage(emailValidation);
            return;
        }
      
        if (passwordValidation !== true) {
            setErrorMessage(passwordValidation);
            return;
        }
      
        if (confirmPasswordValidation !== true) {
            setErrorMessage(confirmPasswordValidation);
            return;
        }
      
        if (usernameValidation !== true) {
            setErrorMessage(usernameValidation);
            return;
        }
      
        if (nationalityValidation !== true) {
            setErrorMessage(nationalityValidation);
            return;
        }
      
        if (genderValidation !== true) {
            setErrorMessage(genderValidation);
            return;
        }

        const userEmail = dbUsers.some((user) => user.email === email);
        if (userEmail) {
            setErrorMessage("This email is already registered");
            return;
        }

        const userName = dbUsers.some((user) => user.username === username);
        if (userName) {
            setErrorMessage("This username is already registered");
            return;
        }


      const userData = { 
        name: name,
        last_name: lastName,
        mobile_phone: mobilePhone,
        birthdate: birthdate,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        username: username,
        nationality: nationality,
        gender: gender,
        imageprofile_picture: profilePictureUrl,
      };

      setIsAuthenticated(true);
      setErrorMessage(""); 
      dispatch(registerUser(userData));

    }

    useEffect(() => {
        const token = UsersRegisterFull.token;
        const tokenId = UsersRegisterFull.userId;
    
        if (token && tokenId) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", tokenId);
          dispatch(allUsers());
        }
      }, [UsersRegisterFull]);

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

            <h1 className={styles.titleLogin}>Register</h1>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Name: *</p>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} className={styles.inputEmail} />
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Last Name: *</p>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className={styles.inputEmail} />
            </div>

            <div className={styles.containerEmail}>
                <p className={styles.titleEmail} >Mobile Phone: *</p>
                <input type="text" value={mobilePhone} onChange={(event) => setMobilePhone(event.target.value)} className={styles.inputEmail} />
            </div>

            <div className={styles.containerEmail}>
                <p className={styles.titleEmail} >Date Of Birth: *</p>
                <div className={styles.containerSelect}>
                <select defaultValue={day} onChange={(event) => setDay(event.target.value)} className={styles.dayContainer}>
					<option>Days</option>
					<option value="01">01</option>
					<option value="02">02</option>
					<option value="03">03</option>
					<option value="04">04</option>
					<option value="05">05</option>
					<option value="06">06</option>
					<option value="07">07</option>
					<option value="08">08</option>
					<option value="09">09</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
					<option value="13">13</option>
					<option value="14">14</option>
					<option value="15">15</option>
					<option value="16">16</option>
					<option value="17">17</option>
					<option value="18">18</option>
					<option value="19">19</option>
					<option value="20">20</option>
					<option value="21">21</option>
					<option value="22">22</option>
					<option value="23">23</option>
					<option value="24">24</option>
					<option value="25">25</option>
					<option value="25">26</option>
					<option value="27">27</option>
					<option value="28">28</option>
					<option value="29">29</option>
					<option value="30">30</option>
					<option value="31">31</option>
				</select>

				<select defaultValue={month} onChange={(event) => setMonth(event.target.value)} className={styles.mounthContainer}>
					<option>Month</option>
					<option value="01">January</option>
					<option value="02">February</option>
					<option value="03">March</option>
					<option value="04">April</option>
					<option value="05">May</option>
					<option value="06">June</option>
					<option value="07">July</option>
					<option value="08">August</option>
					<option value="09">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
						
                <select defaultValue={year} onChange={(event) => setYear(event.target.value)} className={styles.yearContainer}>
					<option>Year</option>
					<option value="2022">2022</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
					<option value="2016">2016</option>
					<option value="2015">2015</option>
					<option value="2014">2014</option>
					<option value="2013">2013</option>
					<option value="2012">2012</option>
					<option value="2011">2011</option>
					<option value="2010">2010</option>
					<option value="2009">2009</option>
					<option value="2008">2008</option>
					<option value="2007">2007</option>
					<option value="2006">2006</option>
					<option value="2005">2005</option>
					<option value="2004">2004</option>
					<option value="2003">2003</option>
					<option value="2002">2002</option>
					<option value="2001">2001</option>
					<option value="2000">2000</option>
					<option value="1999">1999</option>
					<option value="1998">1998</option>
					<option value="1997">1997</option>
					<option value="1996">1996</option>
					<option value="1995">1995</option>
					<option value="1994">1994</option>
					<option value="1993">1993</option>
					<option value="1992">1992</option>
					<option value="1991">1991</option>
					<option value="1990">1990</option>
					<option value="1989">1989</option>
					<option value="1988">1988</option>
					<option value="1987">1987</option>
					<option value="1986">1986</option>
					<option value="1985">1985</option>
					<option value="1984">1984</option>
					<option value="1983">1983</option>
					<option value="1982">1982</option>
					<option value="1981">1981</option>
					<option value="1980">1980</option>
					<option value="1979">1979</option>
					<option value="1978">1978</option>
					<option value="1977">1977</option>
					<option value="1976">1976</option>
					<option value="1975">1975</option>
					<option value="1974">1974</option>
					<option value="1973">1973</option>
					<option value="1972">1972</option>
					<option value="1971">1971</option>
				</select>
                </div>
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Email: *</p>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={styles.inputEmail} />
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Password: *</p>
                <div className={styles.containerPassword} >
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className={styles.inputEmail} />
                <div>
                    <button type="button" onClick={togglePasswordVisibility} className={styles.containerButton} >
                    {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                </div>
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >Confirm Password: *</p>
                <div className={styles.containerPassword}>
                <input type={showPasswordConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={styles.inputEmail} />
                <div>
                    <button type="button" onClick={togglePasswordVisibilityConfirm} className={styles.containerButton} >
                    {showPasswordConfirm ? 'Hide' : 'Show'}
                    </button>
                </div>
                </div>
            </div>

            <div className={styles.containerEmail} >
                <p className={styles.titleEmail} >UserName: *</p>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} className={styles.inputEmail} />
            </div>

            <div className={styles.containerEmail} >
				<p className={styles.titleEmail} >Country Of Location: *</p>
				<select value={nationality} onChange={(event) => setNationality(event.target.value)} className={styles.inputEmail} >
					<option value="">Open this select menu</option>
                    <option value="Afganistán">Afganistán</option>
                    <option value="Albania">Albania</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Arabia Saudita">Arabia Saudita</option>
                    <option value="Argelia">Argelia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaiyán">Azerbaiyán</option>
                    <option value="Bahréin">Bahréin</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Bélgica">Bélgica</option>
                    <option value="Belice">Belice</option>
                    <option value="Benín">Benín</option>
                    <option value="Bielorrusia">Bielorrusia</option>
                    <option value="Birmania (Myanmar)">Birmania (Myanmar)</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
                    <option value="Botsuana">Botsuana</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Brunéi">Brunéi</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Bután">Bután</option>
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Camboya">Camboya</option>
                    <option value="Canadá">Canadá</option>
                    <option value="Camerún">Camerún</option>
                    <option value="Catar">Catar</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Chipre">Chipre</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoras">Comoras</option>
                    <option value="Corea del Norte">Corea del Norte</option>
                    <option value="Corea del Sur">Corea del Sur</option>
                    <option value="Costa de Marfil">Costa de Marfil</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croacia">Croacia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Dinamarca">Dinamarca</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egipto">Egipto</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Eslovaquia">Eslovaquia</option>
                    <option value="Eslovenia">Eslovenia</option>
                    <option value="España">España</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Etiopía">Etiopía</option>
                    <option value="Filipinas">Filipinas</option>
                    <option value="Finlandia">Finlandia</option>
                    <option value="Fiyi">Fiyi</option>
                    <option value="Francia">Francia</option>
                    <option value="Gabón">Gabón</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Granada">Granada</option>
                    <option value="Grecia">Grecia</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
                    <option value="Guinea-Bisáu">Guinea-Bisáu</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haití">Haití</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungría">Hungría</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Irak">Irak</option>
                    <option value="Irán">Irán</option>
                    <option value="Irlanda">Irlanda</option>
                    <option value="Islandia">Islandia</option>
                    <option value="Islas Marshall">Islas Marshall</option>
                    <option value="Islas Salomón">Islas Salomón</option>
                    <option value="Israel">Israel</option>
                    <option value="Italia">Italia</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japón">Japón</option>
                    <option value="Jordania">Jordania</option>
                    <option value="Kazajistán">Kazajistán</option>
                    <option value="Kenia">Kenia</option>
                    <option value="Kirguistán">Kirguistán</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Laos">Laos</option>
                    <option value="Lesoto">Lesoto</option>
                    <option value="Letonia">Letonia</option>
                    <option value="Líbano">Líbano</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libia">Libia</option>
                    <option value="Liechtenstein">Liechtenstein</option>
			    </select>
			</div>

            <div className={styles.containerEmail} >
				<p className={styles.titleEmail} >Gender: *</p>

                <div className={styles.containerSelect}>
                <div className={styles.containerSelectRadio}>
				<input type="radio" value="Male" checked={gender === "Male"} onChange={(event) => setGender(event.target.value)} className={styles.selectRadio} />
                <p className={styles.valueRadio}>Male</p>
                </div>

                <div className={styles.containerSelectRadio}>
				<input type="radio" value="Female" checked={gender === "Female"} onChange={(event) => setGender(event.target.value)} className={styles.selectRadio} />
				<p className={styles.valueRadio} >Female</p>
                </div>

                <div className={styles.containerSelectRadio}>
				<input type="radio" value="Other" checked={gender === "Other"} onChange={(event) => setGender(event.target.value)} className={styles.selectRadio} />
				<p className={styles.valueRadio} >Other</p>
                </div>
                </div>
            </div>

            <div className={styles.containerEmail} >
              <p className={styles.titleEmail} >Profile Picture:</p>
            </div>

            <div>
              <UploadImage onImageUpload={handleImageUpload}/>
            </div>

            <div className={styles.containerSubmit}>
                <button type="button" onClick={handleRegister} className={styles.submitButton} ><span>Register</span></button>
                {errorMessage && <p className={styles.titleEmail} >{errorMessage}</p>}
            </div>

            <div className={styles.parrafoContainer}>
                Do you already have an account?
                <Link href="/">
                    log in
                </Link>
            </div>

        </div>

  );
}


export default Register