import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        
        return <>
            <h1>Welcome!</h1>
            <div className="container">
                {/* The parameter from the URL will be read  */}
                <span>Welcome {this.props.match.params.name}. </span>
                <span>You can manage your todos <Link to="/todos">here</Link></span>
            </div>
        </>
    }
}

export default WelcomeComponent;