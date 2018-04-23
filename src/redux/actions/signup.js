import { URL } from '../constants/signup';
import { BASE_URL } from '../constants/main';
import { LOADING, SUCCESS, FAILURE, REINIT } from '../constants/signup';
import { LOGIN } from '../constants/user';
import { ROUTE } from '../constants/route';

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const signUp = (dispatch, payload) => {

    dispatch({ type: LOADING });

    fetch(BASE_URL + URL, { 
        method: 'POST', 
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
        .then(handleErrors)
        .then(data => {
            return data.json();
        })
        .then(data => {
            localStorage.setItem('username', payload.username);
            localStorage.setItem('email', payload.email);
            localStorage.setItem('token', data.token);
            dispatch({ type: SUCCESS });
            dispatch({
                type: LOGIN,
                data: {
                    email: payload.email,
                    username: payload.username,
                    ...data
                } })
            dispatch({
                type: ROUTE,
                payload: 'lobby'
            });
        })
        .catch(error => {
            dispatch({
                type: FAILURE,
                data: error
            }),
            setTimeout(() => dispatch({ type: REINIT }), 1500);
        });
}

export default signUp;