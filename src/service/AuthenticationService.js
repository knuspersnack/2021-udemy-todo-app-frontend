class AuthenticationService {
    // ! remove or fix
    // authUserKey = 'authenticatedUser';

    registerSuccessfulLogin(username, password) {
        console.log("User logged in successfully!")
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        return (user!==null);
    }
}

export default new AuthenticationService();