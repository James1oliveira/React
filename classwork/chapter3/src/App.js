// Importing React and Component from the 'react' library
import React, { Component } from 'react';

// Importing custom Rating component
import Rating from './Rating';

// Importing Button component from 'react-bootstrap' library
import { Button } from 'react-bootstrap';

// Importing custom Products component
import Products from './Products';

// Creating a class component called App
class App extends Component {
    // The render method is required for a class component
    render() {
        // A simple boolean variable to control the Button's disabled state
        const isValid = true;

        // Returning JSX to render the component UI
        return (
            <div>
                {/* Rendering the Products component */}
                <Products></Products>

                {/* Rendering a Bootstrap button with a disabled state based on isValid */}
                <Button variant="primary" disabled={!isValid}>Default</Button>

                {/* Rendering multiple Rating components with different rating values */}
                <Rating rating={1} />
                <Rating rating={2} />
                <Rating rating={3} />
                <Rating rating={4} />
                <Rating rating={5} />
            </div>
        );
    }
}

// Exporting the App component as default so it can be imported in other files
export default App;
