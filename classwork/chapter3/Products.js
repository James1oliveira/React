// Import React and the Component class to create a class-based component
import React, { Component } from 'react';

class Products extends Component {
  
  // The render method defines what gets displayed on the screen
  render() {

    // An array of product titles
    const products = ["Learning React", "Pro React", "Beginning React"];

    // Convert each product in the array into an <li> element.
    // The 'key' helps React keep track of items efficiently.
    const listProducts = products.map((product) => 
      <li key={product.toString()}>{product}</li>
    );

    return (
      // Container for the product list
      <div>
        {/* Render the list of product items */}
        <ul>{listProducts}</ul>     
      </div>
    );
  }
}

// Export the Products component so it can be used in other files
export default Products;
