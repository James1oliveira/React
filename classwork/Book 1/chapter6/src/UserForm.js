import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UserForm extends Component {
  constructor(props){
    super(props);
    // Constructor included for clarity; no local state is used.
  }

  render(){
    return(
      <div>
        <h1>Any place in your app!</h1>

        {/* 
          Formik wrapper handles form state, validation, and submission.
          initialValues = default values for form fields.
          validate = function that returns an object of errors.
          onSubmit = function called when form is submitted.
        */}
        <Formik
          initialValues={{ email: '', password: '' }} // Starting values for the form
          
          validate={values => {
            let errors = {};

            // Email validation rules
            if (!values.email) {
              errors.email = 'Required'; // User must provide an email
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              // Regex validation for valid email format
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short'; // Extra custom rule
            }

            // Password validation rules
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 8) {
              errors.password = 'Password too short'; // Minimum length requirement
            }

            return errors; // Formik expects returned errors object
          }}

          onSubmit={(values, { setSubmitting }) => {
            // Simulate async submit (e.g., server request)
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2)); // Display form values
              setSubmitting(false); // Re-enable submit button
            }, 400);
          }}
        >

          {/* 
            Formik uses a render prop pattern here.
            isSubmitting = Formik internal value tracking submission state.
          */}
          {({ isSubmitting }) => (
            <Form>
              {/* Field automatically hooks into Formik’s state */}
              <Field type="email" name="email" />

              {/* Error display styled in red + bold */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                {/* ErrorMessage knows how to pull the correct error text */}
                <ErrorMessage name="email" component="div" />
              </span>

              <Field type="password" name="password" />
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              {/* Submit button disabled while submitting */}
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
