import { GET_ALL_MESSAGES_GENERAL, GET_ALL_MESSAGES_LOCAL, INSERT_MESSAGE_GENERAL, INSERT_MESSAGE_LOCAL } from '../constants/chat'

const defaultValues = [
    { username: 'Jerry', time: '16:50', message: 'How are you?' },
    { username: 'Tom', time: '16:50', message: "Hi, I'm fine." },
    { username: 'Jerry', time: '16:50', message: "Let's play chess." },
    { username: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
    { username: 'savtym1', time: '16:50', message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and " },
    { username: 'Jerry', time: '16:50', message: "when an unknown printer took a galley of type and scrambled it to make a type specimen book." }
]
export const chat = (state = { messages: defaultValues, message: '' }, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_GENERAL:
            return {
                ...state,
                messages: [].concat(state.messages, action.payload)
            }
        case GET_ALL_MESSAGES_LOCAL:
            return {
                ...state,
                allMessages: [].concat(state.messages, action.payload)
            }
        case INSERT_MESSAGE_GENERAL:
            return {
                ...state,
                playermessage: `${state.message}${action.payload}`
            }
        case INSERT_MESSAGE_LOCAL:
            return {
                ...state,
                playermessage: `${state.message}${action.payload}`
            }
        default:
            return state
    }
}