import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import AddEmp from './components/AddEmp';
import Home from './components/Home';
import EditEmp from './components/EditEmp';

function App() {
  return (
    <div className="App bg-success p-2 text-dark bg-opacity-25 border-5" >
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/addEmp" element={<AddEmp></AddEmp>}></Route>
        <Route path="/EditEmp/:id" element={<EditEmp></EditEmp>}></Route>
        

      </Routes>
      
    </div>
  );
}

export default App;
