import { ROUTE } from '../constants/route';
import { USER } from '../constants/user';

const route = (state = { component: 'signin' }, action) => {
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