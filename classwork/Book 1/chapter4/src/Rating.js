// Import React and Component to create a class-based component
import React, { Component } from 'react';
// Import star icons from react-icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

class Rating extends Component {
    // Constructor initializes component state
    constructor(props) {
        super(props);
        // Initialize state with rating value passed from props
        this.state = { rating: this.props.rating };
        // Bind handleClick to the component instance
        this.handleClick = this.handleClick.bind(this);
    }

    // Method to update the rating when a star is clicked
    handleClick(ratingValue) {
        this.setState({ rating: ratingValue });
    }

    // Render method defines what is displayed on the screen
    render() {
        return (
            // Container div with styling for star color
            <div style={styles.starStyle}> 
                {/* Display the current rating */}
                <h1>Rating: {this.state.rating}</h1>

                {/* Render 5 stars. Each star is either filled or outlined depending on the rating */}
                {this.state.rating >= 1 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 1)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 1)} />
                )}
                {this.state.rating >= 2 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 2)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 2)} />
                )}
                {this.state.rating >= 3 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 3)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 3)} />
                )}
                {this.state.rating >= 4 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 4)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 4)} />
                )}
                {this.state.rating >= 5 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 5)} />
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 5)} />
                )}
            </div>
        );
    }
}

// Export the Rating component for use in other components
export default Rating;

// Styles object for inline styling
const styles = {
    starStyle: {
        color: 'orange' // Set star color to orange
    }
}
