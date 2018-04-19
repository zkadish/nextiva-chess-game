import { ROOMS_LIST } from "../constants/ActionTypes";

export default function playstate(state = [], action) {
    switch (action.type) {

        case ROOMS_LIST:
            return action.payload;

        default:
            return state;
    }
}
