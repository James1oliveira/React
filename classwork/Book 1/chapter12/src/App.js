import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import { Button } from 'react-bootstrap';       // Bootstrap button
import useFetch from './useFetch';             // Custom hook for fetching data
import Users from './Users';                   // Component displaying users

const App = () => {
  // --------------------------------------------------------
  // API URLs
  // --------------------------------------------------------
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";
  
  // --------------------------------------------------------
  // State to track which URL is currently requested
  // --------------------------------------------------------
  const [requested, setRequested] = useState(postsUrl);

  // --------------------------------------------------------
  // Fetch data using custom hook
  // - The hook returns data from the currently requested URL
  // --------------------------------------------------------
  const data = useFetch(requested);
  
  return (
    <div className="container mt-4">

      {/* Users component (could display user list or details) */}
      <Users />
      
      {/* Buttons to switch API requests */}
      <Button 
        variant="link" 
        onClick={() => setRequested(postsUrl)}> {/* Sets request to posts URL */}
        Posts
      </Button>
      <Button 
        variant="link" 
        onClick={() => setRequested(todosUrl)}> {/* Sets request to todos URL */}
        Todos
      </Button>
      <br />

      {/* Display the currently requested URL */}
      <p>Requested: {requested}</p>
      
      {/* Display fetched data as a list */}
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li> // Each item must have a unique key
        ))}
      </ul>
    </div>
  );
};

// Export the App component
export default App;
