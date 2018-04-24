import {
    GET_ALL_MESSAGES_GENERAL,
    GET_ALL_MESSAGES_LOCAL,
    INSERT_MESSAGE_GENERAL,
    INSERT_MESSAGE_LOCAL,
    ADDED_MESSAGE_GENERAL,
    ADDED_MESSAGE_LOCAL
} from '../constants/chat';

export const getMessagesGeneralChat = (payload) => {
    return {
        type: GET_ALL_MESSAGES_GENERAL,
        payload,
    }
}

export const getMessagesLocalChat = (payload) => {
    return {
        type: GET_ALL_MESSAGES_LOCAL,
        payload 
    }
}

export const insertMessageGeneralChat = (payload) => {
    return {
        type: INSERT_MESSAGE_GENERAL,
        payload,
    }
}

export const addedMessageToGeneralChat = (payload) => {
    return {
        type: ADDED_MESSAGE_GENERAL,
        payload
    }
}

export const insertMessageLocalChat = (payload) => {
    return {
        type: INSERT_MESSAGE_LOCAL,
        payload
    }
}

export const addedMessageToLocalChat = (payload) => {
    return {
        type: ADDED_MESSAGE_LOCAL,
        payload 
    }
}
