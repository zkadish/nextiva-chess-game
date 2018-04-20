const getLocalStorage = () => ({
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token')
});

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
// export const SEND_MESSAGE = 'SEND_MESSAGE';
export const USER = localStorage.getItem('token') ? getLocalStorage() : null;