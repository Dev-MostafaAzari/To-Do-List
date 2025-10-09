import LoginRegister from "./components/LoginRegister/LoginRegister";
import DoList from "./components/ToDoList/ToDoList";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/Login" element={<LoginRegister/>}/>
          <Route path="/ToDoList" element={<DoList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
