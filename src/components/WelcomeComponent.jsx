import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomeMessageService from '../api/todo/WelcomeMessageService'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage: '',
            errorMessage: null
        }
    }

    render() {

        return <>
            {this.state.errorMessage
                && <div className="alert alert-danger">
                    <span>{this.state.errorMessage}</span>
                </div>
            }
            <h1>Welcome!</h1>
            <div className="container">
                {/* The parameter from the URL will be read  */}
                <span>Welcome {this.props.match.params.name}. </span>
                <span>You can manage your todos <Link to="/todos">here</Link></span>
            </div>
            <br/>
            <div className="container">
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
            </div>
            <div className="container">
                <span>{this.state.welcomeMessage}</span>
            </div>
        </>
    }

    retrieveWelcomeMessage() {
        WelcomeMessageService.getWelcomeMessage(this.props.match.params.name)
            .then(response => this.handleSuccesfulResponse(response))
            .catch(error => this.handleError(error));
    }

    handleSuccesfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message });
    }

    handleError(error) {
        let errorMessage = 'ERROR: ';
        if (error.message) {
            errorMessage += error.message;
        }

        if (error.response && error.response.data) {
            errorMessage += error.message.data.message;
        }
        this.setState({ errorMessage: errorMessage });
    }
}




export default WelcomeComponent;