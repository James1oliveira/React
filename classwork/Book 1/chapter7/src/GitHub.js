import React, { Component } from 'react';
import axios from 'axios';                       // For making API requests
import ReactLoading from 'react-loading';        // Loading spinner component
import { Form, Button, Card, Row, Col } from 'react-bootstrap'; // UI components

class GitHub extends Component {
  constructor() {
    super();
    // Component state to store results, input value, and loading status
    this.state = {
      data: [],          // GitHub API user results
      searchTerm: '',    // User input (search term)
      isLoading: false   // Controls loading spinner
    };

    // Bind event handlers to 'this'
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // When the form is submitted
  handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    this.setState({ isLoading: true }); // Show loading spinner
    this.getGitHubData(this.state.searchTerm); // Fetch GitHub users
  }

  // Update searchTerm state when user types
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  // Fetch GitHub users based on search term
  getGitHubData(_searchTerm) {
    axios.get("https://api.github.com/search/users?q=" + _searchTerm)
      .then(res => {
        this.setState({
          isLoading: false,     // Stop loading spinner
          data: res.data.items  // Store returned user list
        });
        console.log(res.data.items); // Debugging output
      });
  }

  render() {
    // Map GitHub results into a list of Bootstrap cards
    const listUsers = this.state.data.map((user) =>
      <Card key={user.id} className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={2}>
              {/* Clicking avatar opens GitHub profile */}
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img
                  width={64}
                  height={64}
                  src={user.avatar_url}
                  alt={user.login}
                  className="rounded"
                />
              </a>
            </Col>

            {/* Display username and ID */}
            <Col xs={10}>
              <Card.Title>Login: {user.login}</Card.Title>
              <Card.Text>Id: {user.id}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );

    return (
      <div className="container mt-4">
        
        {/* Search form */}
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Row>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={this.state.searchTerm}
                placeholder="Enter Search Term"
                onChange={this.handleChange} // Updates state on typing
              />
            </Col>

            <Col xs={4}>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <h3>GitHub Users Results</h3>

        {/* Show loading spinner when data is being fetched */}
        {this.state.isLoading &&
          <div className="d-flex justify-content-center">
            <ReactLoading type="spinningBubbles" color="#444" />
          </div>
        }

        {/* Render GitHub user cards */}
        {listUsers}
      </div>
    );
  }
}

export default GitHub;
