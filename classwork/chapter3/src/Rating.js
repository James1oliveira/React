// Importing React and Component for creating a class component
import React, { Component } from 'react';

// Importing star icons from 'react-icons/io'
// IoIosStar is a filled star, IoIosStarOutline is an outlined star
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// Creating a class component named Rating
class Rating extends Component {
    // Constructor initializes state and binds methods
    constructor(props){
        super(props);
        // Initialize state with the rating value passed as a prop
        this.state = { rating: this.props.rating };
        // Bind the handleClick method to this component instance
        this.handleClick = this.handleClick.bind(this);
    }

    // Method to update the rating when a star is clicked
    handleClick(ratingValue){
        this.setState({rating: ratingValue});
    }

    // The render method returns JSX to display the component
    render() {
        return (
            <div style={styles.starStyle}>
                {/* Display the current rating */}
                <h1>Rating: {this.state.rating}</h1>

                {/* Render star icons conditionally based on the current rating */}
                {/* If rating >= 1, display filled star, else outlined star */}
                {this.state.rating >= 1 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 1)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 1)}/>
                )}

                {this.state.rating >= 2 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 2)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 2)}/>
                )}

                {this.state.rating >= 3 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 3)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 3)}/>
                )}

                {this.state.rating >= 4 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 4)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 4)}/>
                )}

                {this.state.rating >= 5 ? (
                    <IoIosStar onClick={this.handleClick.bind(this, 5)}/>
                ) : (
                    <IoIosStarOutline onClick={this.handleClick.bind(this, 5)}/>
                )}
            </div>
        );
    }
}

// Exporting the Rating component for use in other files
export default Rating;

// Inline styles for the component
const styles = {
    starStyle: {
        color: 'orange' // Sets the color of the stars to orange
    }
}
