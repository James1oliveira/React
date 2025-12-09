import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class GitHub extends Component {
  constructor() {
    super();

    // Component state: data from API, search term, and loading indicator
    this.state = {
      data: [],
      searchTerm: '',
      isLoading: false
    };

    // Bind event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Triggered when form is submitted
  handleSubmit(e) {
    e.preventDefault();

    // Show loading spinner while fetching
    this.setState({
      isLoading: true
    });

    // Fetch GitHub user data using search keyword
    this.getGitHubData(this.state.searchTerm);
  }

  // Updates searchTerm state as the user types
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  // Fetch GitHub users via GitHub's public API
  getGitHubData(_searchTerm) {
    axios.get("https://api.github.com/search/users?q=" + _searchTerm)
      .then(res => {
        // Update state with returned users and turn off loading spinner
        this.setState({
          isLoading: false,
          data: res.data.items
        });

        console.log(res.data.items);
      });
  }

  render() {
    // Map API results into ListGroup items
    const listUsers = this.state.data.map((user) =>
      <ListGroup.Item key={user.id} className="d-flex align-items-center">

        {/* Link to user detail page */}
        <Link to={`/github/user/${user.login}/${user.id}`}>
          <img
            width={64}
            height={64}
            className="me-3 rounded"
            src={user.avatar_url}
            alt={user.login}
          />
        </Link>

        {/* Display user login and ID */}
        <div>
          <h5>Login: {user.login}</h5>
          <p className="mb-0">Id: {user.id}</p>
        </div>
      </ListGroup.Item>
    );

    return (
      <div className="container mt-4">

        {/* Search Form */}
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={this.state.searchTerm}
              placeholder="Enter Search Term"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>

        <h3>GitHub Users Results</h3>

        {/* Show spinner if isLoading is true */}
        {this.state.isLoading &&
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }

        {/* List of GitHub users */}
        <ListGroup>
          {listUsers}
        </ListGroup>
      </div>
    );
  }
}

export default GitHub;
