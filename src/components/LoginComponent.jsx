import React, { Component } from 'react';
import AuthenticationService from '../service/AuthenticationService.js';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    // The names within the state should match the names of the inputs
    this.state = {
      username: 'in28minutes',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  }

  loginClicked() {
    AuthenticationService
      .executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/* Cool trick as a replacement for ng-if*/}
          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
          {this.state.showSuccessMessage && <div>Login successful</div>}

            User:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

          <button className="btn btn-success" onClick={this.loginClicked}>Logging</button>
        </div>
      </div>
    )
  }
}
export default LoginComponent;