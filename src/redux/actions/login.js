import { LOGIN } from '../constants/user';

const login = (dispatch, payload) => {
    dispatch({
        type: LOGIN,
        data: payload
    })
}

export default login;