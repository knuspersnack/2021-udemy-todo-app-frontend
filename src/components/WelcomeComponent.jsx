import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../src/api/todo/HelloWorldService'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    }
    
    render() {

        return <>
            <h1>Welcome!</h1>
            <div className="container">
                {/* The parameter from the URL will be read  */}
                <span>Welcome {this.props.match.params.name}. </span>
                <span>You can manage your todos <Link to="/todos">here</Link></span>
            </div>
            <div className="container">
                {/* The parameter from the URL will be read  */}
                <span>Click here </span>
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
            </div>
        </>
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => console.log(response));
    }
}




export default WelcomeComponent;