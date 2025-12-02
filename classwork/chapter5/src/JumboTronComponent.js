import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class JumboTronComponent extends Component {
  constructor(props) {
    super(props); 
    // Constructor receives props and passes them to Component's constructor.
    // No local state is used here, but constructor is included for clarity.
  }

  render() {
    return (
      <div>
        {/* 
          Outer container styled like a jumbotron using Bootstrap utility classes.
          `fluid` makes it full-width; padding, margin, and background classes apply styling.
        */}
        <Container fluid className="p-5 mb-4 bg-light rounded-3">

          {/* Inner container that constrains width and adds vertical padding */}
          <Container className="py-5">

            {/* Jumbotron heading */}
            <h1 className="display-5 fw-bold">Hello, world!</h1>

            {/* 
              Display any content passed from the parent component.
              This comes from <JumboTronComponent>children here</JumboTronComponent>
            */}
            <p className="col-md-8 fs-4">{this.props.children}</p>

            {/* Simple Bootstrap button */}
            <Button variant="primary">Learn more</Button>
          </Container>
        </Container>
      </div>
    );
  }
}

export default JumboTronComponent;
