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


const initialState = {
    userRegister: {},
    userLogin: {},
    userLogout: {},
    userAll: [],
    userParticipationAll: [],
    userCreate: {},
    userEdit: {},
    userDelete: {},
    userBlock: {},
    tournamentsAll: [],
    tournamentsCreate: {},
    tournamentsEdit: {},
    tournamentsDelete: {},
    tournamentsParticipationAll: [],
    orderCreated: false,
    orderCreated02: [],
    error: null,
    profileView: {},
    tournamentView: {}
}


const reducer = (state = initialState, {type, payload}) => {

    switch(type){

        case REGISTER_USER:
            return{
                ...state,
                userRegister: payload
        }

        case LOGIN_USER:
            return{
                ...state,
                userLogin: payload
        }

        case LOGOUT_USER:
            return{
                ...state,
                userLogout: payload
        }

        case ALL_USERS:
            return{
                ...state,
                userAll: payload
        }

        case ALL_USER_PARTICIPATION:
            return{
                ...state,
                userParticipationAll: payload
        }

        case CREATE_USER:
            return{
                ...state,
                userCreate: payload
        }

        case EDIT_USER:
            return{
                ...state,
                userEdit: payload
        }

        case DELETE_USER:
            return{
                ...state,
                userDelete: payload
        }

        case BLOCK_USER:
            return{
                ...state,
                userBlock: payload
        }

        case ALL_TOURNAMENTS:
            return{
                ...state,
                tournamentsAll: payload
        }

        case CREATE_TOURNAMENTS:
            return{
                ...state,
                tournamentsCreate: payload
        }

        case EDIT_TOURNAMENTS:
            return{
                ...state,
                tournamentsEdit: payload
        }

        case DELETE_TOURNAMENTS:
            return{
                ...state,
                tournamentsDelete: payload
        }

        case ALL_TOURNAMENTS_PARTICIPATION:
            return{
                ...state,
                tournamentsParticipationAll: payload
        }

        case VIEW_PROFILE:
            return{
                ...state,
                profileView: payload
        }

        case VIEW_TOURNAMENT:
            return{
                ...state,
                tournamentView: payload
        }

        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
                orderCreated: true,
                orderCreated02: payload,
                error: null
        }


        case CREATE_ORDER_FAILURE:
            return{
                ...state,
                orderCreated: false,
                error: payload
        }

        default:
            return{
                ...state
        }
    
    }

}

export default reducer;