import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching data from an API endpoint
const useAPI = endpoint => {
  // Local state to store fetched data
  const [data, setData] = useState([]);

  // Fetch data when the component mounts or when endpoint changes
  useEffect(() => {
    const getData = async () => {
      // Make GET request to the provided endpoint
      const response = await axios.get(endpoint);

      // Save response data to state
      setData(response.data);
    };

    // Call the async function
    getData();
  }, [endpoint]); // Re-run effect if endpoint value changes

  // Return fetched data to the component using this hook
  return data;
};

export default useAPI;
