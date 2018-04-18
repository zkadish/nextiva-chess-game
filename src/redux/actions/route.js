import { ROUTE } from '../constants/route';

const route = (dispatch, payload) => {
    dispatch({type: ROUTE, payload})
}

export default route;