// Import React and the Component class to create a class-based component
import React, { Component } from 'react';

class Products extends Component {
  
  // The render method returns the UI for this component
  render() {

    // Array of product names to display
    const products = ["Learning React", "Pro React", "Beginning React"];

    // Map each product name to an <li> element.
    // The key helps React efficiently update the list.
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

// Export the component so it can be imported elsewhere
export default Products;
