import { LOGIN, LOGOUT } from '../constants/user';
import USER from '../constants/localstorage';

const user = (state = { data: USER }, action) => {
    switch (action.type) {
        
        case LOGIN: {
            localStorage.setItem('username', action.data.username);
            localStorage.setItem('email', action.data.email);
            localStorage.setItem('token', action.data.token);
            console.log(`UserReducer: ${JSON.stringify(action.data)}`);
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