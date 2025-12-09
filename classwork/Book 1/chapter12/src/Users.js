import React from 'react';
import useFetch from './useFetch'; // Custom hook to fetch data from an API

/*
  Users component
  - Uses the `useFetch` hook to get a list of users from the API
  - Displays the users in an unordered list
*/
const Users = () => {
  // Fetch users data from API using custom hook
  const users = useFetch("https://jsonplaceholder.typicode.com/users");
  
  return (
    <div className="mb-4">
      {/* Heading */}
      <h3>Users</h3>

      {/* Render fetched users in a list */}
      <ul>
        {users.map(el => (
          // Each list item needs a unique key
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
