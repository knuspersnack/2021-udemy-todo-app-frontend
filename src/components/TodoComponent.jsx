import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from '../service/AuthenticationService';

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            isDone: false,
            targetDate: DateTime.now().toISODate()
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if(this.state.id === -1) {
            return;
        }
        TodoDataService.retrieveTodo(AuthenticationService.getLoggedInUserName(), this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                isDone: response.data.done,
                targetDate: (response.data.targetDate)
                    ? DateTime.fromFormat(response.data.targetDate, "yyyy-MM-dd").toISODate()
                    : null
            }));
    }

    onSubmit(values) {
        let userName = AuthenticationService.getLoggedInUserName();
        const todo = {
            id: this.state.id,
            description: values.description,
            isDone: values.isDone,
            targetDate: values.targetDate
        }

        if(this.state.id === -1) {
            TodoDataService.createTodo(userName, todo)
            .then(() => this.props.history.push('/todos'));
        }

        TodoDataService.updateTodo(userName, this.state.id, todo)
        .then(() => this.props.history.push('/todos'));

    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter a Description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Charcters in Description';
        }

        if (!DateTime.fromISO(values.targetDate).isValid) {
            errors.targetDate = 'Enter a valid date';
        }

        return errors;
    }

    render() {
        //This feature is called destructuring
        let { description, isDone, targetDate } = this.state;

        return (
            <>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description, isDone, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        //otherwise the change of state does not have an effect
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name='description' component='div' className='alert alert-warning'></ErrorMessage>
                                    <ErrorMessage name='targetDate' component='div' className='alert alert-warning'></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description">

                                        </Field>
                                        <label>Is Completed?</label>
                                        <Field className="form-control" type="text" name="isDone">

                                        </Field>
                                        <label>Target date</label>
                                        <Field className="form-control" type="date" name="targetDate">

                                        </Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </>
        )
    }
}

export default TodoComponent;