// Import React and Component for class-based components
import React, { Component } from 'react';

// Firebase core and Realtime Database
import firebase from 'firebase/app';
import 'firebase/database';

// UI components from React-Bootstrap
import { Table, Button, Modal } from 'react-bootstrap';

// Routing utilities
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/* 
  Higher-order component to inject the navigate() hook 
  into a class component (since hooks cannot be used directly in classes)
*/
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class User extends Component {
  constructor(props){
    super(props);

    // Component state
    this.state = {
      users: [],               // Stores all users fetched from Firebase
      showDeleteDialog: false, // Controls delete confirmation modal
      selectedUser: {},        // Stores user selected for deletion
      loading: true,           // Used to display loading UI
      error: null              // Stores error message if Firebase fails
    };

    // Bind functions to this context
    this.add = this.add.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    console.log("=== Firebase Debug Info ===");
    console.log("Firebase app initialized:", firebase.apps.length > 0);

    // Verify Firebase is initialized
    if (firebase.apps.length > 0) {
      console.log("Database URL:", firebase.app().options.databaseURL);
    }

    /* 
      Set a 5-second timeout to prevent the UI from staying stuck 
      in loading state in case Firebase doesn't respond.
    */
    const connectionTimeout = setTimeout(() => {
      console.error("Firebase connection timeout - forcing loading to stop");
      this.setState({
        loading: false,
        error: null,
        users: []
      });
    }, 5000);

    try {
      const dbRef = firebase.database().ref('/');

      // Fetch data once from root of database
      dbRef.once('value')
        .then((snapshot) => {
          clearTimeout(connectionTimeout);
          console.log("Firebase snapshot received!");
          console.log("Snapshot exists:", snapshot.exists());
          console.log("Snapshot value:", snapshot.val());

          let returnArr = [];

          /* 
            Convert Firebase snapshot into an array of users,
            attaching each user's unique key
          */
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              var user = data.val();
              user['key'] = data.key;
              returnArr.push(user);
            });
          }

          console.log("Users array length:", returnArr.length);

          // Update UI with fetched users
          this.setState({
            users: returnArr,
            loading: false,
            error: null
          });
        })
        .catch((error) => {
          clearTimeout(connectionTimeout);
          console.error("Firebase error:", error);

          // Display error message in UI
          this.setState({ 
            loading: false,
            error: `Firebase Error: ${error.message}`,
            users: []
          });
        });

    } catch (error) {
      clearTimeout(connectionTimeout);
      console.error("Error setting up Firebase:", error);

      // Setup failure (e.g., Firebase not initialized)
      this.setState({ 
        loading: false,
        error: `Setup Error: ${error.message}`,
        users: []
      });
    }
  }

  // Clean up Firebase listeners when component unmounts
  componentWillUnmount() {
    try {
      firebase.database().ref('/').off();
    } catch (error) {
      console.error("Error cleaning up Firebase listener:", error);
    }
  }

  // Navigate to add-user page
  add(e) {
    this.props.navigate("/add");
  }

  // Open delete confirmation modal
  openDeleteDialog(user){
    this.setState({
      showDeleteDialog: true,
      selectedUser: user
    });
  }

  // Close delete confirmation modal
  closeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      selectedUser: {}
    });
  }

  /* 
    Delete user from Firebase by key,
    then reload user list by calling componentDidMount()
  */
  delete(e) {
    firebase.database().ref('/' + this.state.selectedUser.key).remove()
      .then(() => {
        console.log("User deleted successfully");
        this.closeDeleteDialog();
        this.componentDidMount(); // refresh list
      })
      .catch(error => {
        alert("Could not delete the user.");
        console.error("Delete error:", error);
      });
  }

  render() {
    // Show loading spinner UI
    if (this.state.loading) {
      return (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading users...</p>
          <p className="text-muted small">If this takes too long, check your Firebase configuration</p>
        </div>
      );
    }

    // Show error UI if Firebase fails
    if (this.state.error) {
      return (
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{this.state.error}</p>
          <hr />
          <p className="mb-0">Please check your Firebase configuration and database rules.</p>
          <Button variant="primary" onClick={() => window.location.reload()} className="mt-3">
            Retry
          </Button>
        </div>
      );
    }

    // Generate table rows for each user
    const listUsers = this.state.users.map((user) =>
      <tr key={user.key}>
        <td>{user.username}</td>
        <td>{user.email}</td>

        {/* Edit button redirects to /edit/:id */}
        <td>
          <Link to={`/edit/${user.key}`} className="btn btn-sm btn-info">
            Edit
          </Link>
        </td>

        {/* Delete button opens confirmation modal */}
        <td>
          <Button variant="danger" size="sm" onClick={() => this.openDeleteDialog(user)}>
            Remove
          </Button>
        </td>
      </tr>
    );

    return (
      <div>
        <h1>User Management</h1>

        {/* Add new user button */}
        <Button variant="primary" onClick={this.add} className="mb-3">Add User</Button>

        {/* Display message if no users exist */}
        {this.state.users.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <p className="mb-0">No users found. Click "Add User" to create your first user.</p>
          </div>
        ) : (
          // Users table
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {listUsers}
            </tbody>
          </Table>
        )}

        {/* Delete confirmation modal */}
        <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete <strong>{this.state.selectedUser.username}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeDeleteDialog}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.delete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Export wrapped component to allow navigation in class-based component
export default withNavigate(User);
