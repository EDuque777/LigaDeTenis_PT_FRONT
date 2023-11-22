import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    ALL_USERS,
    ALL_USER_PARTICIPATION,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    BLOCK_USER,
    ALL_TOURNAMENTS,
    CREATE_TOURNAMENTS,
    EDIT_TOURNAMENTS,
    DELETE_TOURNAMENTS,
    ALL_TOURNAMENTS_PARTICIPATION,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    VIEW_PROFILE,
    VIEW_TOURNAMENT
} from "./action-types"
import axios from "axios";


export const registerUser = (create) => {
    const endpoint = `auth/register`;
    return async (dispatch) => {
        const {data} = await axios.post(endpoint, create);
        return dispatch({
            type: REGISTER_USER,
            payload: data
        })
    }
}


export const loginUser = (create) => {
    const endpoint = `auth/login`;
    return async (dispatch) => {
        const {data} = await axios.post(endpoint, create);
        return dispatch({
            type: LOGIN_USER,
            payload: data
        })
    }
}


export const logoutUser = () => {
    const endpoint = 'auth/logout';
    return async (dispatch) => {
        const {data} = await axios.post(endpoint);
        return dispatch({
            type: LOGOUT_USER,
            payload: data
        })
    }
}


export const allUsers = () => {
    const endpoint = `allUsers`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: ALL_USERS,
            payload: data
        })
    }
}


export const allUsersParticipations = () => {
    const endpoint = `allUsersParticipation`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: ALL_USER_PARTICIPATION,
            payload: data
        })
    }
}


export const createUser = (create) => {
    const endpoint = `createUser`;
    return async (dispatch) => {
        const {data} = await axios.post(endpoint, create);
        return dispatch({
            type: CREATE_USER,
            payload: data
        })
    }
}


export const editUser = (userData, id) => {
    const endpoint = `editUser/${id}`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint, userData);
        return dispatch({
            type: EDIT_USER,
            payload: data
        })
    }
}


export const deleteUser = (id) => {
    const endpoint = `deleteUser/${id}`;
    return async (dispatch) => {
        const {data} = await axios.delete(endpoint);
        return dispatch({
            type: DELETE_USER,
            payload: data
        })
    }
}


export const blockUser = (id, userData) => {
    const endpoint = `blockUser/${id}`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint, userData);
        return dispatch({
            type: BLOCK_USER,
            payload: data
        })
    }
}


export const allTournaments = () => {
    const endpoint = `allTournaments`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: ALL_TOURNAMENTS,
            payload: data
        })
    }
}


export const createTournament = (create) => {
    const endpoint = `createTournament`;
    return async (dispatch) => {
        const {data} = await axios.post(endpoint, create);
        return dispatch({
            type: CREATE_TOURNAMENTS,
            payload: data
        })
    }
}


export const editTournament = (tournamentData, id) => {
    const endpoint = `editTournament/${id}`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint, tournamentData);
        return dispatch({
            type: EDIT_TOURNAMENTS,
            payload: data
        })
    }
}


export const deleteTournament = (id) => {
    const endpoint = `deleteTournament/${id}`;
    return async (dispatch) => {
        const {data} = await axios.delete(endpoint);
        return dispatch({
            type: DELETE_TOURNAMENTS,
            payload: data
        })
    }
}


export const allTournamentParticipations = () => {
    const endpoint = `allTournamentParticipants`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: ALL_TOURNAMENTS_PARTICIPATION,
            payload: data
        })
    }
}


export const profile = (id) => {
    const endpoint = `profile/${id}`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: VIEW_PROFILE,
            payload: data
        })
    }
}


export const viewTournament = (id) => {
    const endpoint = `viewTournament/${id}`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: VIEW_TOURNAMENT,
            payload: data
        })
    }
}


export const createOrder = (price, youPerfil, idTournaments) => {
    return async function (dispatch) {
        const {data} = await axios.post("/createOrder", 
        {   
            price: price,
            dataUser: youPerfil,
            idTournament: idTournaments
        })
        const paymentLink = data.links[1].href
        window.location.href = paymentLink
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: paymentLink
            })
    }
}


export const createOrderFailure = (errorMessage) => {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: errorMessage
    }
}