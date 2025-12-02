import React, { Component } from 'react';
import JumboTronComponent from './JumboTronComponent';

// Main App component
class App extends Component {
  render() {
    return (
      <div>
        {/* 
          Render the JumboTronComponent and pass text/content to it.
          Anything placed between the opening and closing tags of
          <JumboTronComponent> is passed as `props.children`.
        */}
        <JumboTronComponent>
          {/* This text becomes the children of the jumbotron component */}
          This is a long sentence, and I want to insert content into the
          jumbotron component from the outside.
        </JumboTronComponent>
      </div>
    );
  }
}

export default App;
