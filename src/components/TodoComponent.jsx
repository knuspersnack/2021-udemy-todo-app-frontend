import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { Form, Formik, Field, ErrorMessage } from 'formik';

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: 'Learn...',
            isDone: false,
            targetDate: DateTime.now().toISODate()
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {
        console.log(values);
    }

    validate(values) {
        let errors = {};
        if(!values.description) {
            errors.description = 'Enter a Description';
        } else if(values.description.length<5) {
            errors.description = 'Enter at least 5 Charcters in Description';
        }

        if(!DateTime.fromISO(values.targetDate).isValid) {
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
                        validate={this.validate}>
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