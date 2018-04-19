import { ROUTE } from '../constants/route';
//playload - name of component
const route = (dispatch, payload) => {
    dispatch({type: ROUTE, payload})
}

export default route;