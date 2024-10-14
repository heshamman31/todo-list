import './App.css';
import TodoList from './componants/TodoList';
import { createContext, useState } from 'react';

export const TodoContext = createContext();


function App() {
  const [todoList, setTodoList] = useState([{}]);
  return (
    <div className="App" style={{ backgroundColor: "#0e0c0c", height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
      <TodoContext.Provider value={{todoList,setTodoList}}>
      <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
