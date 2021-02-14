import React, {Component} from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService.js';

class AuthenticatedRoute extends Component {
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            // ? ... = JS Spread Operator -> It means all the parameter of props will be passed to the Route 
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute;