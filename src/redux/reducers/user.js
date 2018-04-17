import { LOADING, SUCCESS, FAILURE } from '../constants/signin';

const signIn = (state = { loaded: false, loading: false, error: false, data: null }, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: false
            }
            
        case SUCCESS: {
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
    
        default:
            return state;
    }
}

export default signIn;