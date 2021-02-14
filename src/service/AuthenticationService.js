class AuthenticationService {
    authUserKey = 'authenticatedUser';

    registerSuccessfulLogin(username, password) {
        console.log("User logged in successfully!")
        sessionStorage.setItem(this.authUserKey, username);
    }

    logout() {
        sessionStorage.removeItem(this.authUserKey);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(this.authUserKey)
        return (user===null);
    }
}

export default new AuthenticationService();