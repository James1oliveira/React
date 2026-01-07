// Import React library to enable JSX
import React from 'react';

// Import the Rating component to display product ratings
import Rating from './Rating';

// Import Media component from react-bootstrap for layout (image + content)
import { Media } from 'react-bootstrap';

// Define a functional component called Product
// Receives props from its parent component
const Product = (props) => {
  return (
    <div>
      {/* Media component aligns image and content side by side */}
      <Media>

        {/* Product image */}
        <img
          width={64}                    // Set image width
          height={64}                   // Set image height
          className="mr-3"              // Add right margin using Bootstrap class
          src={props.data.imageUrl}     // Image URL from props
          alt="Image"                   // Alt text for accessibility
        />

        {/* Media body contains product details */}
        <Media.Body>

          {/* Display product name */}
          <h5>{props.data.productName}</h5>

          {/* Display product release date */}
          {props.data.releasedDate}

          {/* Render the Rating component */}
          {/* Pass rating value and number of reviews from props */}
          <Rating
            rating={props.data.rating}
            numOfReviews={props.data.numOfReviews}
          />

          {/* Display product description */}
          <p>{props.data.description}</p>

        </Media.Body>
      </Media>
    </div>
  );
};

// Export the Product component so it can be used in other files
export default Product;
