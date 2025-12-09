import React, { Component } from "react";
import AddProduct from './AddProduct';      // Component for adding new products
import { Table } from 'react-bootstrap';    // Bootstrap table for displaying cart items

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">

        {/* Heading */}
        <h2>Shopping Cart</h2>
        
        {/* AddProduct component
            - Receives onAddProduct function from props (Redux action dispatcher)
            - Allows user to add products to the cart
        */}
        <AddProduct addProduct={this.props.onAddProduct} />
        
        {/* Table to display products in the cart */}
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through products in cart and display each */}
            {this.props.productCart.map(productData => (
              <tr key={productData.productName}>
                <td>{productData.productName}</td>
                <td>${productData.productPrice}</td>
                <td>
                  {/* Remove button
                      - Calls onDeleteProduct from props with product data
                  */}
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDeleteProduct(productData)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {/* Display total cost of products */}
        <h4>Total Amount: ${this.props.totalCost}</h4>
      </div>
    );
  }
}

// Export the Cart component
export default Cart;
