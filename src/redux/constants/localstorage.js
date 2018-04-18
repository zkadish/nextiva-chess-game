function getLocalStorage(){
    return {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token')
    }
}

const USER = localStorage.getItem('token') ? getLocalStorage() : null;
export default USER;