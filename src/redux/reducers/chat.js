import {
    GET_ALL_MESSAGES_GENERAL,
    GET_ALL_MESSAGES_LOCAL,
    INSERT_MESSAGE_GENERAL,
    INSERT_MESSAGE_LOCAL,
    ADDED_MESSAGE_GENERAL,
    ADDED_MESSAGE_LOCAL
} from '../constants/chat'

export const chat = (state = { messages: [], message: '' }, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_GENERAL:
        case GET_ALL_MESSAGES_LOCAL:
        case ADDED_MESSAGE_GENERAL:
        case ADDED_MESSAGE_LOCAL:
            return {
                ...state,
                messages: [].concat(state.messages, action.payload)
            }

        case INSERT_MESSAGE_GENERAL:
        case INSERT_MESSAGE_LOCAL:
            return {
                ...state,
                message: action.payload,
            }
        default:
            return state
    }
}