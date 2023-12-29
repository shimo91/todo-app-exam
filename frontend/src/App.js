import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './elements/Todo';

function App() {

  
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Todo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
