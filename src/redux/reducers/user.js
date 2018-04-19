import { LOGIN, LOGOUT, USER } from '../constants/user';

const user = (state = { data: null }, action) => {
    switch (action.type) {
        
        case LOGIN: {
            return {
                data: action.data
            }
        }
    
        case LOGOUT: {
            return {
                data: null
            }
        }
    
        default:
            return state;
    }
}

export default user;