import React, { Component } from 'react';

class TodoApp extends Component {
  render() {
    return (
      <div className="">
        <LoginComponent />
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
        <LoginMessage
          hasFailed={this.state.hasLoginFailed}
          isSuccessful={this.state.showSuccessMessage}
        />

        User:
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

        Password:
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

        <button onClick={this.loginClicked}>Logging</button>
      </div>
    )
  }
}

//Functional component
function LoginMessage(props) {
  if (props.hasFailed) {
    return <div>Invalid Credentials</div>
  }
  if (props.isSuccessful) {
    return <div>Login successful</div>
  }
  return null;
}


export default TodoApp;