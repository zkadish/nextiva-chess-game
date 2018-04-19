import { LOGOUT } from '../constants/user';
import { ROUTE } from '../constants/route';

const logOut = (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch({ type: ROUTE, payload: 'signin' })
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
}

export default logOut;