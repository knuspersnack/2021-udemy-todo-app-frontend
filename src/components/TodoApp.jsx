import React, { Component } from 'react';

class TodoApp extends Component {
  render() {
    return (
      <div className="">
        <LoginComponent />
        <WelcomeComponent />
      </div>
    )
  }
}

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
    if (this.state.username === 'in28minutes' && this.state.password === 'test') {
      console.log('Successful');
      this.setState({ showSuccessMessage: true });
      this.setState({ hasLoginFailed: false });
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFailed: true });
    }
  }

  render() {
    return (
      <div>
        {/*Cool trick as a replacement for ng-if*/}
        {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
        {this.state.showSuccessMessage && <div>Login successful</div>}

        User:
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

        Password:
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

        <button onClick={this.loginClicked}>Logging</button>
      </div>
    )
  }
}

class WelcomeComponent extends Component {
  render() {
    return <div>Welcome to in28Minutes</div>
  }
}


export default TodoApp;