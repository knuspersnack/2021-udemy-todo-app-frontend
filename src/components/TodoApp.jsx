import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/welcome/:name" component={WelcomeComponent} />
              <Route path="/todos" component={ListTodosComponent} />
              <Route component={ErrorComponent} />
            </Switch>
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
      this.props.history.push(`/welcome/${this.state.username}`);
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
    // The parameter from the URL will be read 
    return <>
      <span> Welcome {this.props.match.params.name}. </span>
      <span>You can manage your todos <Link to="/todos">here</Link></span>
    </>
  }
}

function ErrorComponent() {
  return <div>An error occured!</div>
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
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>done</th>
              <th>is completed</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.todos.map(
                todo =>
                  <tr>
                    <td>{todo.id}</td>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{todo.targetDate.toString()}</td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}



export default TodoApp;