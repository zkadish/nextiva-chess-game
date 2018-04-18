import { URL } from '../constants/signup';
import { BASE_URL } from '../constants/main';
import { LOADING, SUCCESS, FAILURE } from '../constants/signup';

const friendlyError = (error) => {
    return error;
}

const signUp = (dispatch, payload) => {

    dispatch({ type: LOADING });

    setTimeout(() => {
        dispatch({
            type: SUCCESS,
            data: { 
                email: payload.email, 
                username: payload.username, 
                ...{ token: 'abbqrb.qbqbab.bqbqe' } 
            }
        });

        // dispatch({
        //     type: FAILURE,
        //     data: 'my error name'
        // })
    }, 1000);

    // fetch(BASE_URL + URL, { method: 'POST', body: JSON.stringify(payload) })
    //     .then(data => {
    //         return data.json();
    //     })
    //     .then(data => {
    //         dispatch({
    //             type: SUCCESS,
    //             data: { 
    //                 email: payload.email, 
    //                 username: payload.username,  
    //                 ...data 
    //             }
    //         });
    //     })
    //     .catch(error => {
    //         dispatch({
    //             type: FAILURE,
    //             data: friendlyError(error)
    //         })
    //     });
}

export default signUp;