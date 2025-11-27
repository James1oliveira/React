// Import React and Component for creating a class-based component
import React, { Component } from 'react';
// Import Card component from react-bootstrap for styled card layout
import Card from 'react-bootstrap/Card';
// Import custom Rating component to display product ratings
import Rating from './Rating';

class Product extends Component {
    // The render method defines the UI of this Product component
    render() {
        return (
            // Container div for the product card
            <div>
                {/* Bootstrap Card component for displaying product information */}
                <Card style={{ width: '18rem' }}>
                    {/* Product image */}
                    <Card.Img variant="top" src={this.props.data.imageUrl} />

                    {/* Card body containing product details */}
                    <Card.Body>
                        {/* Product name */}
                        <Card.Title>{this.props.data.productName}</Card.Title>

                        {/* Product release date */}
                        {this.props.data.releasedDate}

                        {/* Render the Rating component with rating value and number of reviews */}
                        <Rating
                            rating={this.props.data.rating}
                            numOfReviews={this.props.data.numOfReviews}
                        />

                        {/* Display the number of views */}
                        <p><strong>Views:</strong> {this.props.data.numOfViews}</p>
                        {/* Display the number of reviews */}
                        <p><strong>Reviews:</strong> {this.props.data.numOfReviews}</p>
                        
                        {/* Product description */}
                        <Card.Text>
                            {this.props.data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

// Export the Product component for use in other parts of the app
export default Product;
