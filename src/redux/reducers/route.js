import { ROUTE } from '../constants/route';
import USER from '../constants/localstorage';

const route = (state = { component: USER ? 'lobby' : 'signin' }, action) => {
    switch (action.type) {
        case ROUTE:
            return { 
                component: action.payload
            }
        default:
            return state;
    }
}

export default route;