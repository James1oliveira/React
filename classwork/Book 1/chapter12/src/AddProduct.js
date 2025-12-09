import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

class AddProduct extends Component {
  // --------------------------------------------------------
  // Component state for managing form inputs
  // --------------------------------------------------------
  state = {
    productName: '',  // Stores the name of the product
    productPrice: 0   // Stores the price of the product
  };

  // --------------------------------------------------------
  // Handler for updating product name in state
  // --------------------------------------------------------
  productNameChangedHandler = (event) => {
    this.setState({ productName: event.target.value });
  };

  // --------------------------------------------------------
  // Handler for updating product price in state
  // --------------------------------------------------------
  productPriceChangedHandler = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  // --------------------------------------------------------
  // Handle form submission
  // - Prevent default form submission behavior
  // - Validate that product name is not empty and price > 0
  // - Call the addProduct function passed via props (Redux action)
  // - Reset form fields after submission
  // --------------------------------------------------------
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.productName && this.state.productPrice > 0) {
      this.props.addProduct(this.state.productName, this.state.productPrice);
      this.setState({ productName: '', productPrice: 0 }); // Clear form
    }
  };

  // --------------------------------------------------------
  // Render the form
  // --------------------------------------------------------
  render() {
    return (
      <div className="container mt-4">
        <Form onSubmit={this.handleSubmit}>
          <Row>

            {/* Product Name Input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  onChange={this.productNameChangedHandler} // Update state on change
                  value={this.state.productName}            // Bind input value to state
                />
              </Form.Group>
            </Col>

            {/* Product Price Input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  onChange={this.productPriceChangedHandler} // Update state on change
                  value={this.state.productPrice}            // Bind input value to state
                />
              </Form.Group>
            </Col>

            {/* Submit Button */}
            <Col md={4}>
              <Button 
                variant="primary" 
                type="submit"
                className="w-100"> {/* Full-width button */}
                Add Product
              </Button>
            </Col>

          </Row>
        </Form>
      </div>
    );
  }
}

// Export the AddProduct component
export default AddProduct;
