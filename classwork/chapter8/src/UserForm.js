import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UserForm extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Any place in your app!</h1>

        {/* Formik handles form state, validation, and submission */}
        <Formik
          initialValues={{ email: '', password: '' }}

          // validate() runs on each change/blur and returns an errors object
          validate={values => {
            let errors = {};

            // --- Email Validation ---
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short';
            }

            // --- Password Validation ---
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 8) {
              errors.password = 'Password too short';
            }

            return errors;
          }}

          // Runs when form is submitted
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >

          {/* isSubmitting prevents multiple submissions */}
          {({ isSubmitting }) => (
            <Form>

              {/* Email Field */}
              <Field type="email" name="email" />
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="email" component="div" />
              </span>

              {/* Password Field */}
              <Field type="password" name="password" />
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>

            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default UserForm;
