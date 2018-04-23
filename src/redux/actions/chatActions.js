import {
    GET_ALL_MESSAGES_GENERAL,
    GET_ALL_MESSAGES_LOCAL,
    INSERT_MESSAGE_GENERAL,
    INSERT_MESSAGE_LOCAL
} from '../constants/chat';

export const getMessagesGeneralChat = (token, messages) => {
    return {
        type: GET_ALL_MESSAGES_GENERAL,
        payload: messages
    }
}

export const getMessagesLocalChat = (gameId, token, messages) => {
    return {
        type: GET_ALL_MESSAGES_LOCAL,
        payload: messages
    }
}

export const insertMessageGeneralChat = (token, message) => {
    return {
        type: INSERT_MESSAGE_LOCAL,
        payload: message
    }
}

export const insertMessageLocalChat = (token, message, gameId) => {
    return {
        type: insertMessageGeneralChat,
        payload: message
    }
}

