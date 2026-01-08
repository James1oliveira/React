import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './App';
import { Table, Form, Button } from 'react-bootstrap';
import useAPI from './useAPI';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ToDoList() {
  // Access global todos state and dispatch from Context
  const { state, dispatch } = useContext(TodosContext); 

  // Local state for the input field
  const [todoText, setTodoText] = useState(""); 

  // Track whether the form is in edit mode
  const [editMode, setEditMode] = useState(false); 

  // Store the todo currently being edited
  const [editTodo, setEditTodo] = useState(null); 

  // Button label changes based on mode
  const buttonTitle = editMode ? "Edit" : "Add";

  // API endpoint for todos
  const endpoint = "http://localhost:3000/todos/";
  
  // Custom hook to fetch saved todos from the API
  const savedTodos = useAPI(endpoint);
  
  // Update global state when todos are fetched from the API
  useEffect(() => {
    if (savedTodos && savedTodos.length > 0) {
      dispatch({ type: "get", payload: savedTodos });
    }
  }, [savedTodos, dispatch]); // Re-run when savedTodos changes

  // Handle form submission for adding or editing todos
  const handleSubmit = async event => {
    event.preventDefault();

    if (editMode) { 
      // Update existing todo on the server
      await axios.patch(endpoint + editTodo.id, { text: todoText });

      // Update todo in global state
      dispatch({
        type: 'edit',
        payload: { ...editTodo, text: todoText }
      });

      // Exit edit mode
      setEditMode(false);
      setEditTodo(null);
    } else {
      // Create a new todo object
      const newToDo = { id: uuidv4(), text: todoText };

      // Save new todo to the server
      await axios.post(endpoint, newToDo);

      // Add new todo to global state
      dispatch({ type: 'add', payload: newToDo });
    } 

    // Clear input field after submit
    setTodoText("");
  };
  
  return (
    <div>
      {/* Todo input form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group> 
          <Form.Control 
            type="text" 
            placeholder="Enter To Do" 
            onChange={event => setTodoText(event.target.value)}
            value={todoText}
          />
        </Form.Group> 
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button> 
      </Form>

      {/* Todos table */}
      <Table striped bordered hover>
        <thead>
          <tr> 
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.id}> 
              {/* Display todo text */}
              <td>{todo.text}</td>

              {/* Edit todo */}
              <td
                onClick={() => {
                  setTodoText(todo.text);
                  setEditMode(true);
                  setEditTodo(todo);
                }}
              > 
                <Button variant="link">Edit</Button> 
              </td>

              {/* Delete todo */}
              <td
                onClick={async () => { 
                  await axios.delete(endpoint + todo.id);
                  dispatch({ type: 'delete', payload: todo });
                }}
              >
                <Button variant="link">Delete</Button>
              </td>
            </tr>
          ))} 
        </tbody>
      </Table> 
    </div>
  );
}

export default ToDoList;
