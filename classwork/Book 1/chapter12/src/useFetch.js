import { useState, useEffect } from 'react';

/*
  Custom React hook to fetch data from a given URL.
  This hook returns the fetched data and updates automatically
  whenever the URL changes.
*/
const useFetch = (url) => {
  // State to store fetched data
  const [data, setData] = useState([]);
  
  /*
    useEffect runs when the component mounts or when the 'url' changes.
    - Fetches data from the provided URL
    - Converts response to JSON
    - Updates the 'data' state
  */
  useEffect(() => {
    fetch(url)                        // Make GET request to the URL
      .then(response => response.json()) // Parse response as JSON
      .then(data => setData(data));      // Store parsed data in state
  }, [url]); // Dependency array ensures effect runs again if URL changes
  
  // Return the fetched data so the component using this hook can access it
  return data;
};

export default useFetch;
