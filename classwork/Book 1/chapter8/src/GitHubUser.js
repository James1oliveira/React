import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// ---------------------------------------------------------
// HOC (Higher-Order Component) to inject router hooks
// into a class component.
//
// Class components cannot use React Router hooks directly,
// so we wrap the class component inside a functional component
// that *can* use the hooks, then pass them as props.
// ---------------------------------------------------------
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();      // Extract URL parameters (e.g., login, id)
    let navigate = useNavigate();  // Navigation function to change routes

    // Pass hook results into the class component as props
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class GitHubUser extends Component {
  constructor(props) {
    super(props);

    // Bind event handler
    this.handleClick = this.handleClick.bind(this);
  }

  // Navigate back to the GitHub listing page
  handleClick(e) {
    this.props.navigate("/github");
  }

  render() {
    return (
      <div className="container mt-4">

        {/* Display values extracted from URL parameters */}
        <h1>User Login: {this.props.params.login}</h1>
        <h2>User Id: {this.props.params.id}</h2>

        {/* Button to go back to GitHub users list */}
        <Button variant="primary" onClick={this.handleClick}>
          Go to GitHub Users
        </Button>
      </div>
    );
  }
}

// Export the class component wrapped with router props
export default withRouter(GitHubUser);
