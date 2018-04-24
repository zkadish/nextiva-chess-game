import {
    GET_ALL_MESSAGES_GENERAL,
    GET_ALL_MESSAGES_LOCAL,
    INSERT_MESSAGE_GENERAL,
    INSERT_MESSAGE_LOCAL,
    ADDED_MESSAGE_GENERAL,
    ADDED_MESSAGE_LOCAL
} from '../constants/chat'

export const chat = (state = { messages: [], message: '' , localMessages:[], localMessage:''}, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_GENERAL:
            return {
                ...state,
                messages: [].concat(state.messages, action.payload)
            }
        case GET_ALL_MESSAGES_LOCAL:
            return {
                ...state,
                messages: [].concat(state.messages, action.payload)
            }
        case ADDED_MESSAGE_GENERAL:
            return {
                ...state,
                messages: [].concat(state.messages, action.payload)
            }
        case GET_ALL_MESSAGES_LOCAL: 
            return {
                ...state,
                localMessages:[].concat(state.localMessages, action.payload)
            }
        case ADDED_MESSAGE_LOCAL:
         return {
             ...state,
             localMessages:[].concat(state.localMessages, action.payload)
         }    
        case INSERT_MESSAGE_GENERAL:
            return {
                ...state,
                message: action.payload,
            }
        case INSERT_MESSAGE_LOCAL:
            return {
                ...state,
                localMessage: action.payload
            }
            default : return state
        }
    }
