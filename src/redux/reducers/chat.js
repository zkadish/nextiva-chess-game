import { GET_ALL_MESSAGES_GENERAL, GET_ALL_MESSAGES_LOCAL, INSERT_MESSAGE_GENERAL, INSERT_MESSAGE_LOCAL } from '../constants/chat'

export const chat = (state = { messages: [] , message: ''}, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_GENERAL:
            return {
                ...state,
                messages: [state.messages.push(action.payload)]
            }
        case GET_ALL_MESSAGES_LOCAL : 
        return {
            ...state,
            allMessages: [].concat(state.messages, action.payload)
        }
        case INSERT_MESSAGE_GENERAL : 
            return {
                ...state,
                playermessage: `${state.message}${action.payload}`
            }
        case INSERT_MESSAGE_LOCAL : 
            return {
                ...state,
                playermessage: `${state.message}${action.payload}`
            }
        default:
            return state
    }
}