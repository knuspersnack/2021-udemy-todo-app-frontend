import axios from 'axios';

class AuthenticationService {

    //BASIC AUTH

    /*     executeBasicAuthenticationService(username, password) {
            return axios.get('http://localhost:8080/basicauth', {
                headers: {
                    'Authorization': this.createBasicAuthToken(username, password)
                }
            })
        } */


    /*     createBasicAuthToken(username, password) {
            //windows btoa ecodes the credentials using base64 (base 64 encoding)
            return 'Basic ' + window.btoa(username + '+' + password);
        } */

    /*     registerSuccessfulLogin(username, password) {
 
    sessionStorage.setItem('authenticatedUser', username);
 
    console.log("Installing Axios Basic Auth Interceptor..")
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
 
    console.log("User logged in successfully!")
} */

    //JWT AUTH ------------------------------------------

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        });
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    registerSuccessfulLoginForJwt(username, token) {

        sessionStorage.setItem('authenticatedUser', username);

        console.log("Installing Axios JWT Auth Interceptor..")
        this.setupAxiosInterceptors(this.createJwtToken(token));

        console.log("User logged in successfully!")
    }

    //------------------------------------------

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
    setupAxiosInterceptors(basicAuthHeader) {

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