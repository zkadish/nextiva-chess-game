import { LOADING, SUCCESS, FAILURE, REINIT } from '../constants/signup';

const signup = (state = {
    loaded: false,
    loading: false,
    error: false
}, action) => {
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
                error: false
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

        case REINIT: {
            return {
                loaded: false,
                loading: false,
                error: false
            }
        }

        default:
            return state;
    }
}

export default signup;