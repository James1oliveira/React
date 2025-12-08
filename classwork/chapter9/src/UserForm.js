import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useParams, useNavigate } from 'react-router-dom';

class UserForm extends Component {
  constructor(props) {
    super(props);

    // Get the user ID from URL parameters
    this.id = this.props.params.id;

    // Set default title for form
    this.title = 'New User';
    
    // Component state to hold form values
    this.state = {
      username: '',
      email: ''
    };

    // If editing an existing user, update title
    if (this.id) {
      this.title = 'Edit User';
    }
  }

  // --------------------------------------------------------
  // Load existing user data if editing
  // --------------------------------------------------------
  componentDidMount() {
    if (this.id) {
      firebase.database().ref('/' + this.id)
        .on('value', snapshot => {
          // Populate state with values from Firebase
          this.setState({
            username: snapshot.val().username,
            email: snapshot.val().email
          });
        });
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <h1>{this.title}</h1>

        {/* Formik manages form state, validation, and submission */}
        <Formik
          enableReinitialize={true} // Reinitialize form when state changes
          initialValues={{
            username: this.state.username,
            email: this.state.email
          }}

          // ----------------------------------------------------
          // Validation function for form fields
          // ----------------------------------------------------
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

            // --- Username Validation ---
            if (!values.username) {
              errors.username = 'Required';
            } else if (values.username.length < 3) {
              errors.username = 'Username too short';
            }

            return errors;
          }}

          // ----------------------------------------------------
          // onSubmit handles creating or updating user in Firebase
          // ----------------------------------------------------
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (this.id) {
                // Update existing user
                firebase.database().ref('/' + this.id).update({
                  username: values.username,
                  email: values.email
                }).then(() => this.props.navigate("/"));
              } else {
                // Add new user
                firebase.database().ref('/').push({
                  username: values.username,
                  email: values.email
                }).then(() => this.props.navigate("/"));
              }

              setSubmitting(false); // Stop submission state
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* Username Field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  <ErrorMessage name="username" component="div" />
                </span>
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  <ErrorMessage name="email" component="div" />
                </span>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Submit
              </button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// ------------------------------------------------------------------
// Wrapper component to allow useParams() and useNavigate() in class
// ------------------------------------------------------------------
function UserFormWithRouter(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <UserForm {...props} params={params} navigate={navigate} />;
}

export default UserFormWithRouter;
