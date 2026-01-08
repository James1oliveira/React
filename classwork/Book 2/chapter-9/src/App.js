import React, { useReducer } from 'react';
import ToDoList from './ToDoList';

// Initial state for the todos reducer
const todosInitialState = { 
  todos: []
};

// Create a Context to share todos state and dispatch across components
export const TodosContext = React.createContext();

function App() {
  // useReducer manages complex state logic for todos
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  
  return (
    // Provide state and dispatch to all child components
    <TodosContext.Provider value={{ state, dispatch }}> 
      <ToDoList />
    </TodosContext.Provider> 
  );
}

// Reducer function to handle all todo-related actions
function todosReducer(state, action) { 
  switch(action.type) { 

    // Replace current todos with fetched todos
    case 'get': 
      return { ...state, todos: action.payload };
      
    // Add a new todo to the existing list
    case 'add': 
      const addedToDos = [...state.todos, action.payload];
      return { ...state, todos: addedToDos };
      
    // Remove a todo by filtering it out using its id
    case 'delete':
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
      
    // Update an existing todo
    case 'edit': 
      const updatedToDo = { ...action.payload };

      // Find the index of the todo being edited
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === action.payload.id
      );

      // Create a new todos array with the updated todo
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];

      return { ...state, todos: updatedToDos };
      
    // Fallback case: reset to initial state
    default:
      return todosInitialState;
  }
}

export default App;
