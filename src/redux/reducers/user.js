import { LOADING, SUCCESS, FAILURE } from '../constants/user';
import { LOGOUT } from '../constants/logout';
import USER from '../constants/localstorage';

const signIn = (state = { loaded: false, loading: false, error: false, data: USER }, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: false
            }
            
        case SUCCESS: {
            localStorage.setItem('username', action.data.username);
            localStorage.setItem('email', action.data.email);
            localStorage.setItem('token', action.data.token);
            console.log(`UserReducer: ${JSON.stringify(action.data)}`);
            return {
                ...state,
                loading: false,
                loaded: true,
                error: false,
                data: action.data
            }
        }
        case FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: action.data
            }
        }

        case LOGOUT: {
            return {
                loaded: false,
                loading: false,
                error: false,
                data: null
            }
        }
    
        default:
            return state;
    }
}

export default signIn;