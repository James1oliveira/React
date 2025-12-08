import React, { Component } from "react";
import AddProduct from './AddProduct';          // Form component to add products
import { Table } from 'react-bootstrap';        // Bootstrap table component

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">

        {/* Heading */}
        <h2>Shopping Cart</h2>
        
        {/* AddProduct component
            - Receives onAddProduct function via props
            - Allows user to add a new product to the cart
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
            {/* Map through productCart array from props and render each product */}
            {this.props.productCart.map(productData => (
              <tr key={productData.productName}> {/* Unique key required */}
                <td>{productData.productName}</td>  {/* Product name */}
                <td>${productData.productPrice}</td> {/* Product price */}
                <td>
                  {/* Remove button
                      - Calls onDeleteProduct from props with the product data
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
        
        {/* Display total cost from props */}
        <h4>Total Amount: ${this.props.totalCost}</h4>
      </div>
    );
  }
}

// Export Cart component
export default Cart;
