import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService.js';
import HeaderComponent from './HeaderComponent';
import AuthenticatedRoute from './AuthenticatedRoute';

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
              <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </>
        </Router>
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
      AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
      this.props.history.push(`/welcome/${this.state.username}`);
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFailed: true });
    }
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

class WelcomeComponent extends Component {
  render() {
    // The parameter from the URL will be read 
    return <>
      <h1>Welcome!</h1>
      <div className="container">
        <span>Welcome {this.props.match.params.name}. </span>
        <span>You can manage your todos <Link to="/todos">here</Link></span>
      </div>
    </>
  }
}

function ErrorComponent() {
  return <div>An error occured!</div>
}



class FooterComponent extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-muted">
            All rights reserved @knuspersnack
          </span>
        </footer>
      </div>
    )
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1>Your are logged out</h1>
        <div className="container">
          Thank you for using our Application!
        </div>
      </div>
    )
  }
}



class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:
        [
          {
            id: 1,
            description: 'Learn React',
            done: false,
            targetDate: new Date()
          },
          {
            id: 2,
            description: 'Visit React',
            done: true,
            targetDate: new Date()
          },
          {
            id: 3,
            description: 'Become React',
            done: false,
            targetDate: new Date()
          }
        ]
    }
  }


  render() {
    // The parameter from the URL will be read 
    return (
      <div>
        <h1>List Todos</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done?</th>
                <th>Is Completed?</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.todos.map(
                  todo =>
                    <tr key={todo.id}>
                      <td>{todo.description}</td>
                      <td>{todo.done.toString()}</td>
                      <td>{todo.targetDate.toString()}</td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}



export default TodoApp;