// Import React and required hooks
import React, { useEffect, useState } from 'react';

// Axios is used to make HTTP requests
import axios from 'axios';

// Loading spinner component
import ReactLoading from 'react-loading';

// Bootstrap components for layout and styling
import { Card, ListGroup } from 'react-bootstrap'; // Card is imported but not used

function GitHub() {
  // State to store fetched GitHub users
  const [data, setData] = useState([]);

  // State to store search input value
  const [searchTerm, setSearchTerm] = useState("");

  // State to control loading spinner
  const [isLoading, setIsLoading] = useState(false);

  // useEffect runs once when the component mounts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array means it runs only once

  // Fetch GitHub users from the API
  const getData = async () => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchTerm || 'greg'}`
    );

    // Update state with API response
    setData(res.data.items);

    // Stop loading animation
    setIsLoading(false);
  };

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true);     // Show loading spinner
    getData();              // Fetch new data
  };

  // Map over users data and render a list item for each user
  const listUsers = data.map((user) => (
    <ListGroup.Item key={user.id} className="d-flex align-items-center">
      {/* Link to GitHub profile */}
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <img
          width={64}
          height={64}
          className="me-3 rounded"
          src={user.avatar_url}
          alt={user.login}
        />
      </a>

      {/* User information */}
      <div>
        <h5 className="mb-1">Login: {user.login}</h5>
        <p className="mb-0">Id: {user.id}</p>
      </div>
    </ListGroup.Item>
  ));

  return (
    <div className="container mt-4">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search GitHub users..."
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Results heading */}
      <h3>GitHub Users Results</h3>

      {/* Show loading spinner while fetching data */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <ReactLoading type="spinningBubbles" color="#444" />
        </div>
      )}

      {/* Display list of users */}
      <ListGroup>
        {listUsers}
      </ListGroup>
    </div>
  );
}

// Export GitHub component
export default GitHub;
