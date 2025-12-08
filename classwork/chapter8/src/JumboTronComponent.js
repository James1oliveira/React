import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class JumboTronComponent extends Component {
  constructor(props){
    super(props);
    // No local state needed; component simply renders Bootstrap layout
  }

  render() {
    return (
      <div>
        {/* 
          Outer container styled like a Bootstrap Jumbotron.
          'fluid' makes it stretch full width. 
        */}
        <Container fluid className="p-5 mb-4 bg-light rounded-3">

          {/*
            Inner container for centering and adding vertical padding.
          */}
          <Container className="py-5">

            {/* Large title text */}
            <h1 className="display-5 fw-bold">Hello, world!</h1>

            {/*
              Display any child content passed between
              <JumboTronComponent> ... </JumboTronComponent>
            */}
            <p className="col-md-8 fs-4">{this.props.children}</p>

            {/* Example action button */}
            <Button variant="primary">Learn more</Button>

          </Container>
        </Container>
      </div>
    );
  }
}

export default JumboTronComponent;
