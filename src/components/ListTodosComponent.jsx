import React, { Component } from 'react';
import TodoDataService from '../api/todo/TodoDataService'
import AuthenticationService from '../service/AuthenticationService'

class ListTodosComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        todos:
          []
      }
    }
  
    componentDidMount() {
        TodoDataService.retrieveAllTodos(AuthenticationService.getLoggedInUserName())
        .then(
          response => {
            console.log(response.data);
          }
        );
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

  export default ListTodosComponent;