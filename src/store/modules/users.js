import getMethod from "../../utils/api";
import createUser from '../../utils/createUser';

//Actions
const GET_USERS = 'users/GET_USERS';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_FAILURE';
const SET_CURRENT_USER = 'users/SET_CURRENT_USER'

//Action creators
export function getUsers() {
    return {type: GET_USERS};
}

export function setUsers(payload) {
    return {
        type: GET_USERS_SUCCESS,
        payload
    }
}

export function setUsersFailure(error) {
    return {
        type: GET_USERS_FAILURE,
        error
    }
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

//Reducer
const initialState = {
    loading: false,
    count: 0,
    step: 60,
    users: [],
    currentUser: null,
    error: null,
}

export default function gitHubUsers(state = initialState, action) {
    const {type, payload, error, user} = action;
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                loading: true
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: state.users.concat(payload),
                loading: false,
                count: state.count + state.step,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                error: error
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: user
            }
        default:
            return state
    }
}

//Async actions
export function getData(count) {
    return (dispatch) => {
        dispatch(getUsers());
        return getMethod(`users?since=${count}`)
            .then((res) => dispatch(setUsers(res.data)))
            .catch((err) => dispatch(setUsersFailure(err)));
    }
}

export function getUser(login) {
    return (dispatch) => {
        return getMethod(`users/${login}`)
            .then((res) => dispatch(setCurrentUser(createUser(res.data))))
            .catch(console.log)
    }
}





