"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, allTournaments, createTournament, profile } from "../../redux/actions";
import UploadImage from "../RegisterUser/UploadImage";
import { 
    isValidName,
    isValidParticipants,
    isValidStartDate,
    isValidPrize,
    isValidCountry,
    isValidPrice,
} from "../../validations/tournamentValidations";
import styles from '../StylesFull/register.module.css';


const CreateTournamentDashboard = () => {

    const dispatch = useDispatch();

    const dbTournament = useSelector(state => state.tournamentsAll);
    const tournamentCreatedFull = useSelector((state) => state.tournamentsCreate);
    const dbUserProfile = useSelector(state => state.profileView);

    const [name, setName] = useState("");
    const [participants, setParticipants] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [prize, setPrize] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
      dispatch(allUsers());
      dispatch(allTournaments())
    }, [dispatch]);

    const handleImageUpload = (imageUrl) => {
        console.log(imageUrl)
        setProfilePictureUrl(imageUrl);
    };

    useEffect(() => {
        if (day && month && year) {
            setStartDate(`${day}/${month}/${year}`);
        }
    }, [day, month, year]);

    const handlecreateTournament = () => {

        const nameValidate = isValidName(name)
        const participantsValidate = isValidParticipants(participants)
        const startDateValidate = isValidStartDate(startDate)
        const prizeValidate = isValidPrize(prize)
        const countryValidate = isValidCountry(country)
        const priceValidate = isValidPrice(price)

        if (nameValidate !== true) {
            setErrorMessage(nameValidate);
            return;
        }
      
        if (participantsValidate !== true) {
            setErrorMessage(participantsValidate);
            return;
        }
      
        if (startDateValidate !== true) {
            setErrorMessage(startDateValidate);
            return;
        }
      
        if (prizeValidate !== true) {
            setErrorMessage(prizeValidate);
            return;
        }
      
        if (countryValidate !== true) {
            setErrorMessage(countryValidate);
            return;
        }
      
        if (priceValidate !== true) {
            setErrorMessage(priceValidate);
            return;
        }

        const tournamentTitle = dbTournament.some((tournament) => tournament.name.toLowerCase() === name.toLowerCase());
        if (tournamentTitle) {
            setErrorMessage("There is already a tournament with this title");
            return;
        }


      const tournamentData = { 
        name: name,
        total_participants: participants,
        start_date: startDate,
        winner_prize: prize,
        country_of_location: country,
        cover_image: profilePictureUrl,
        subscription_price: price
      };

      setIsAuthenticated(true);
      setErrorMessage(""); 
      setSuccessMessage("Successfully created tournament");
      dispatch(createTournament(tournamentData));
      setName("");
      setParticipants(0);
      setStartDate("");
      setPrize("");
      setCountry("");
      setPrice("");
      setProfilePictureUrl("");
    }

    useEffect(() => {
        const token = tournamentCreatedFull.token;
        const tokenId = tournamentCreatedFull.userId;
    
        if (token && tokenId) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", tokenId);
          dispatch(allUsers());
          dispatch(allTournaments())
        }
      }, [tournamentCreatedFull]);
      

    //   if (typeof localStorage !== 'undefined') {
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
        if (dbUserProfile.role === "users") {
          window.location.href = "/homePage";
        }
    }, [dbUserProfile]);
    
  return (

        <div className={styles.containerFullFullEdit} >

        <h1 className={styles.titleEditUserFull}>Create Tournt</h1>

            <div className={styles.containerEmailEditUser}>
                <div className={styles.titleEmailEditUser} >Title: *</div>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} className={styles.inputEmailEditUser} />
            </div>

            <div className={styles.containerEmailEditUser} >
                <div className={styles.titleEmailEditUser} >Total participants: *</div>
                <input type="number" value={participants} onChange={(event) => setParticipants(event.target.value)} className={styles.inputEmailEditUser} />
            </div>

            <div className={styles.containerEmailEditUser} >
                <div className={styles.titleEmailEditUser} >start date: *</div>
                <div className={styles.containerSelect}>
                <select defaultValue={day} onChange={(event) => setDay(event.target.value)} className={styles.dayContainerEditUser} >
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

				<select defaultValue={month} onChange={(event) => setMonth(event.target.value)} className={styles.mounthContainerEditUser} >
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
						
                <select defaultValue={year} onChange={(event) => setYear(event.target.value)} className={styles.yearContainerEditUser} >
					<option>Year</option>
					<option value="2040">2040</option>
                    <option value="2039">2039</option>
                    <option value="2038">2038</option>
                    <option value="2037">2037</option>
                    <option value="2036">2036</option>
                    <option value="2035">2035</option>
                    <option value="2034">2034</option>
                    <option value="2033">2033</option>
                    <option value="2032">2032</option>
                    <option value="2031">2031</option>
                    <option value="2030">2030</option>
                    <option value="2029">2029</option>
                    <option value="2028">2028</option>
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
				</select>
                </div>
            </div>

            <div className={styles.containerEmailEditUser} >
                <div className={styles.titleEmailEditUser} >Prize: *</div>
                <input type="text" value={prize} onChange={(event) => setPrize(event.target.value)} className={styles.inputEmailEditUser} />
            </div>

            <div className={styles.containerEmailEditUser} >
                <div className={styles.titleEmailEditUser} >Subscription price: *</div>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} className={styles.inputEmailEditUser} />
            </div>

            <div className={styles.containerEmailEditUser} >
				<div className={styles.titleEmailEditUser} >Location country: *</div>
				<select value={country} onChange={(event) => setCountry(event.target.value)} className={styles.inputEmailEditUser} >
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

            <div className={styles.containerEmailEditUser} >
              <div className={styles.titleEmailEditUser} >Cover image:</div>
            </div>

            <div className={styles.containerImageProfileTwo} >
              <UploadImage onImageUpload={handleImageUpload}/>
            </div>

            <div>
                <button type="button" onClick={handlecreateTournament} className={styles.buttonEditUserContainerTwo} ><span>Create Tournament</span></button>
                {successMessage && <p className={styles.titleEmailEditUser} >{successMessage}</p>}
                {errorMessage && <p className={styles.titleEmailEditUser} >{errorMessage}</p>}
            </div>

        </div>

  );
}


export default CreateTournamentDashboard