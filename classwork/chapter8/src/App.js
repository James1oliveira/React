import React, { Component } from 'react';
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

// Main App component — simply renders the Header.
class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;

// Header component — contains navigation bar and client-side routing.
class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          {/* Navigation bar using React-Bootstrap */}
          <Navbar bg="light" expand="lg">
            <Container>
              {/* Brand logo that links back to home */}
              <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>

              {/* Hamburger toggle for mobile screens */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              {/* Collapsible navigation links */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                  {/* Navigation links using Router's Link component */}
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/github">GitHub</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Define application routes */}
          <Routes>

            {/* Dynamic GitHub user route (e.g., /github/user/john/123) */}
            <Route path="/github/user/:login/:id" element={<GitHubUser />} />

            {/* GitHub page route */}
            <Route path="/github" element={<GitHub />} />

            {/* Home page route */}
            <Route path="/" element={<Home />} />

            {/* Fallback route for any undefined paths */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

// Home component — simple landing page.
class Home extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>Home</h1>
        <p>Welcome to the React Routing Example!</p>
      </div>
    );
  }
}

// NotFound component — shown when no route matches.
class NotFound extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }
}
