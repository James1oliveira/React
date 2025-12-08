import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props);

    // Component state for storing user list and delete confirmation modal
    this.state = {
      users: [],
      showDeleteDialog: false,
      selectedUser: {}
    };

    // Bind functions used as callbacks
    this.add = this.add.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.delete = this.delete.bind(this);
  }

  // -------------------------------------------------------
  // Fetch users from Firebase Realtime Database on mount.
  // Listens in real-time using .on('value').
  // -------------------------------------------------------
  componentDidMount() {
    firebase.database().ref('/')
      .on('value', snapshot => {

        let returnArr = [];

        // Loop through each child node in Firebase
        snapshot.forEach(data => {
          var user = data.val();
          user['key'] = data.key;   // Attach Firebase key to each user
          returnArr.push(user);
        });

        // Update state with users retrieved from database
        this.setState({
          users: returnArr
        });
      });
  }

  // Navigate to add-user form
  add(e) {
    this.props.navigate('/add');
  }

  // Open delete confirmation dialog and store selected user
  openDeleteDialog(user) {
    this.setState({
      showDeleteDialog: true,
      selectedUser: user
    });
  }

  // Close delete dialog and clear selected user
  closeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      selectedUser: {}
    });
  }

  // -------------------------------------------------------
  // Delete user from Firebase using stored key.
  // -------------------------------------------------------
  delete(e) {
    firebase.database().ref('/' + this.state.selectedUser.key).remove()
      .then(x => {
        console.log("SUCCESS");
        this.closeDeleteDialog(); // close the modal after deletion
      })
      .catch(error => {
        alert("Could not delete the user.");
        console.log("ERROR", error);
      });
  }

  render() {
    // Render table rows for each user from state
    const listUsers = this.state.users.map((user) =>
      <tr key={user.key}>
        <td>{user.username}</td>
        <td>{user.email}</td>

        {/* Link to edit form for selected user */}
        <td>
          <Link to={`/edit/${user.key}`}>
            Edit
          </Link>
        </td>

        {/* Opens delete confirmation modal */}
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={this.openDeleteDialog.bind(this, user)}>
            Remove
          </Button>
        </td>
      </tr>
    );

    return (
      <div className="container mt-4">
        <h2>User Management</h2>

        {/* Navigate to add-user page */}
        <Button variant="primary" onClick={this.add}>Add User</Button>

        {/* User list table */}
        <Table striped bordered hover className="mt-3">
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

        {/* Delete confirmation modal */}
        <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {this.state.selectedUser.username}?</p>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.delete}>Delete</Button>
            <Button variant="secondary" onClick={this.closeDeleteDialog}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// ------------------------------------------------------------------
// Wrapper component to allow useNavigate() in a class component.
// This injects "navigate" as a prop into the User component.
// ------------------------------------------------------------------
function UserWithRouter(props) {
  const navigate = useNavigate();
  return <User {...props} navigate={navigate} />;
}

export default UserWithRouter;
