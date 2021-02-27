import axios from 'axios';

class AuthenticationService {
    // ! remove or fix
    // authUserKey = 'authenticatedUser';

    registerSuccessfulLogin(username, password) {
        console.log("User logged in successfully!")
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors();
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        return (user !== null);
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return '';
        return user;
    }

    //Installs an Interceptor, that adds a auth header to every outgoing requests
    setupAxiosInterceptors() {
        let username = 'user';
        let password = 'test';
        //windows btoa ecodes the credentials using base64 (base 64 encoding)
        let basicAuthHeader = 'Basic ' + window.btoa(`${username}:${password}`);

        console.log("Installing Axios Auth Interceptor..")

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader;
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();