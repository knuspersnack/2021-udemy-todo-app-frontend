import React, { Component } from 'react';
import TodoDataService from '../api/todo/TodoDataService'
import AuthenticationService from '../service/AuthenticationService'

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      todos: []
    }
 
    this.refreshTodoList = this.refreshTodoList.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);

    console.log('Constructor executed');
  }

  //Called a lifecycle method
  componentDidMount() {
    this.refreshTodoList();
    console.log('Lifecycle method [ComponendDidMount] executed');
  }

  refreshTodoList() {
    TodoDataService.retrieveAllTodos(AuthenticationService.getLoggedInUserName())
      .then(
        response => {
          this.setState({
            todos: response.data
          })
        }
      );
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.deleteTodo(username, id).then(
      response => {
        this.setState({ message: response.data });
        this.refreshTodoList();
      }
    )
  }

  updateTodoClicked(id) {
    console.log("update: " + id);
    this.props.history.push(`/todos/${id}`);
  }

  render() {
    // The parameter from the URL will be read 
    console.log('Render executed - ToDos available: ' + this.state.todos.length);
    return (
      <div>
        <h1>List Todos</h1>
        <div className="container">
          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Is Completed?</th>
                <th>Target date</th>
                <th>Update</th>
                <th>Delete</th>
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
                      <td><button onClick={() => this.updateTodoClicked(todo.id)} className="btn btn-success">Update</button></td>
                      <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Delete</button></td>
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

export default ListTodosComponent;