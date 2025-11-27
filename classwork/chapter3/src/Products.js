// Importing React and Component from the 'react' library
import React, { Component } from 'react';

// Creating a class component named Products
class Products extends Component {

    // The render method defines what this component will display
    render() {
        // An array of product names
        const products = ["Learning React", "Pro React", "Beginning React"];

        // Mapping over the products array to create a list of <li> elements
        // Each <li> needs a unique 'key' prop for React to track list items efficiently
        const listProducts = products.map((product) =>
            <li key={product.toString()}>{product}</li>
        );

        // Returning the JSX to render
        return (
            <div>
                {/* Displaying the list of products inside an unordered list */}
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

// Exporting the Products component so it can be imported in other files
export default Products;
