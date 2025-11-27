// Import React and Component to create a class-based component
import React, { Component } from 'react';
// Import the Product component to render individual products
import Product from './Product';

class Products extends Component {

    // Constructor is called when the component is created
    constructor(props) {
        super(props);
        // Initialize the products array by calling getProducts
        this.products = this.getProducts();
    }

    // Method to return an array of product objects
    getProducts() {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 4,
                numOfReviews: 2,
                numOfViews: 150
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 2,
                numOfReviews: 12,
                numOfViews: 380
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 5,
                numOfReviews: 2,
                numOfViews: 90
            }
        ];
    }

    // The render method defines what gets displayed on the screen
    render() {
        // Map each product to a Product component, passing data as a prop
        const listProducts = this.products.map((product) =>
            <Product key={product.productName} data={product} />
        );

        return (
            // Container div for the product list with flex centering
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* Unordered list to display product cards horizontally */}
                <ul
                    style={{
                        listStyle: "none",       // Remove default bullets
                        padding: 0,              // Remove default padding
                        display: "flex",         // Arrange list items in a row
                        gap: "20px",             // Space between items
                        justifyContent: "center",// Center items horizontally
                        flexWrap: "wrap"         // Wrap items to next line if needed
                    }}
                >
                    {/* Render each Product component */}
                    {listProducts}
                </ul>
            </div>
        );
    }
}

// Export the Products component for use in other parts of the app
export default Products;
