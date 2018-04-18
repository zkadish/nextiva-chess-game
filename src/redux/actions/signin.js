import { URL } from '../constants/signin';
import { BASE_URL } from '../constants/main';
import { LOADING, SUCCESS, FAILURE } from '../constants/signin';
import { ROUTE } from '../constants/route';

const friendlyError = (error) => {
    return error;
}

const signIn = (dispatch, payload) => {

    dispatch({ type: LOADING });

    setTimeout(() => {
        dispatch({
            type: SUCCESS,
            data: { email: payload.email, ...{ username: "Jerry", token: 'abbqrb.qbqbab.bqbqe' } }
        });

        dispatch({
            type: ROUTE,
            payload: 'lobby'
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
    //             data: { email: payload.email, ...data }
    //         });
                // dispatch({
                //     type: ROUTE,
                //     payload: 'lobby'
                // });
    //     })
    //     .catch(error => {
    //         dispatch({
    //             type: FAILURE,
    //             data: friendlyError(error)
    //         })
    //     });
}

export default signIn;