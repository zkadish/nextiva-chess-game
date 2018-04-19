import { LOGIN, LOGOUT, USER } from '../constants/user';

const user = (state = { data: USER }, action) => {
    switch (action.type) {
        
        case LOGIN: {
            localStorage.setItem('username', action.data.username);
            localStorage.setItem('email', action.data.email);
            localStorage.setItem('token', action.data.token);
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