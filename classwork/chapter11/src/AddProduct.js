import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

class AddProduct extends Component {
  // --------------------------------------------------------
  // Component state to hold form values
  // --------------------------------------------------------
  state = {
    productName: '',  // Name of the product
    productPrice: 0   // Price of the product
  };

  // --------------------------------------------------------
  // Handler for updating productName in state when input changes
  // --------------------------------------------------------
  productNameChangedHandler = (event) => {
    this.setState({ productName: event.target.value });
  };

  // --------------------------------------------------------
  // Handler for updating productPrice in state when input changes
  // --------------------------------------------------------
  productPriceChangedHandler = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  // --------------------------------------------------------
  // Form submission handler
  // - Prevents default form submission
  // - Validates input values
  // - Calls parent function addProduct passed via props
  // - Resets form fields after submission
  // --------------------------------------------------------
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.productName && this.state.productPrice > 0) {
      // Call parent function to add the product
      this.props.addProduct(this.state.productName, this.state.productPrice);
      
      // Clear form after adding
      this.setState({ productName: '', productPrice: 0 });
    }
  };

  render() {
    return (
      <div className="container mt-4">

        {/* Bootstrap form */}
        <Form onSubmit={this.handleSubmit}>
          <Row>

            {/* Product Name input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  onChange={this.productNameChangedHandler}
                  value={this.state.productName}
                />
              </Form.Group>
            </Col>

            {/* Product Price input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  onChange={this.productPriceChangedHandler}
                  value={this.state.productPrice}
                />
              </Form.Group>
            </Col>

            {/* Submit button */}
            <Col md={4}>
              <Button 
                variant="primary" 
                type="submit"
                className="w-100">
                Add Product
              </Button>
            </Col>

          </Row>
        </Form>
      </div>
    );
  }
}

// Export component to be used in other parts of the app
export default AddProduct;
