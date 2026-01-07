// Import React and Component for class-based components
import React, { Component } from 'react';

// Formik tools for form handling
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Firebase core + Realtime Database
import firebase from 'firebase/app';
import 'firebase/database';

// UI elements
import { Button } from 'react-bootstrap';

// React Router hooks for navigation and URL params
import { useNavigate, useParams } from 'react-router-dom';

/* 
  Higher-order component to inject navigate() and params 
  into a class component (since hooks cannot be used inside classes)
*/
function withRouter(Component) {
  return props => {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}

class UserForm extends Component {
  constructor(props){
    super(props);

    // Get user ID from URL params; if present, it's edit mode
    this.id = this.props.params.id;

    // Change title based on whether editing or creating new user
    this.title = this.id ? 'Edit User' : 'New User';

    // Component state
    this.state = {
      username: '',
      email: '',
      loading: true // Used to show loading screen before form loads
    };

    console.log("UserForm constructor - ID:", this.id);
    console.log("UserForm constructor - navigate function:", typeof this.props.navigate);
  }

  /* 
    Fetch existing user data from Firebase only if editing
  */
  componentDidMount(){
    if(this.id){
      console.log("Fetching user with ID:", this.id);

      firebase.database().ref('/' + this.id)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            console.log("User data:", snapshot.val());

            // Pre-fill form fields with fetched user data
            this.setState({
              username: snapshot.val().username || '',
              email: snapshot.val().email || '',
              loading: false
            });
          } else {
            // User does not exist — redirect to home
            console.log("User not found");
            alert("User not found");
            this.props.navigate("/");
          }
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          this.setState({ loading: false });
        });
    } else {
      // New user form: no need to fetch data
      this.setState({ loading: false });
    }
  }

  /*
    Handle form submission for both:
    - Creating new users
    - Updating existing users
  */
  handleSubmit = (values, { setSubmitting }) => {
    console.log("=== SUBMIT STARTED ===");
    console.log("Form values:", values);
    console.log("Is editing?", !!this.id);
    console.log("Firebase initialized?", firebase.apps.length > 0);
    
    if(this.id){
      // Editing an existing user
      console.log("Starting update for user:", this.id);
      
      firebase.database().ref('/' + this.id).update({
        username: values.username,
        email: values.email
      })
      .then(() => {
        console.log("✓ Firebase update successful!");
        setSubmitting(false);

        // Navigate back to home
        try {
          this.props.navigate("/");
          console.log("✓ Navigate called successfully");
        } catch (navError) {
          console.error("✗ Navigation error:", navError);
        }
      })
      .catch(error => {
        console.error("✗ Firebase update error:", error);
        alert("Error updating user: " + error.message);
        setSubmitting(false);
      });

    } else {
      // Creating a new user
      console.log("Starting add new user");

      const newUserData = {
        username: values.username,
        email: values.email
      };

      console.log("New user data:", newUserData);
      
      firebase.database().ref('/').push(newUserData)
      .then((ref) => {
        console.log("✓ Firebase push successful! New key:", ref.key);
        setSubmitting(false);

        // Navigate back to home
        try {
          this.props.navigate("/");
          console.log("✓ Navigate called successfully");
        } catch (navError) {
          console.error("✗ Navigation error:", navError);
        }
      })
      .catch(error => {
        console.error("✗ Firebase push error:", error);
        alert("Error adding user: " + error.message);
        setSubmitting(false);
      });
    }
  };

  render(){
    // Show temporary loading screen while fetching user data
    if (this.state.loading) {
      return <div className="text-center mt-5">Loading...</div>;
    }

    return(
      <div>
        {/* Title changes between "New User" and "Edit User" */}
        <h1>{this.title}</h1>

        {/* Formik handles form state, validation, and submission */}
        <Formik
          enableReinitialize={true}   // Updates form fields when state changes
          initialValues={{ 
            username: this.state.username, 
            email: this.state.email 
          }}

          /* Form validation rules */
          validate={values => {
            let errors = {};
            
            // Email validation
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short';
            }
            
            // Username validation
            if (!values.username) {
              errors.username = 'Required';
            } else if (values.username.length < 3) {
              errors.username = 'Username too short';
            }
            
            return errors;
          }}

          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>

              {/* Username input field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <Field 
                  type="text" 
                  name="username"
                  className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                  placeholder="Enter username (min 3 characters)"
                />
                <ErrorMessage name="username">
                  {msg => <div className="text-danger mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Email input field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <Field 
                  type="email" 
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  placeholder="Enter email (min 10 characters)"
                />
                <ErrorMessage name="email">
                  {msg => <div className="text-danger mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Submit button */}
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>

              {' '}

              {/* Cancel button: return to home */}
              <Button 
                variant="secondary" 
                onClick={() => this.props.navigate("/")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              {/* Show subtle info during processing */}
              {isSubmitting && (
                <div className="mt-2 text-muted">
                  <small>Processing... Check console for details</small>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(UserForm);
