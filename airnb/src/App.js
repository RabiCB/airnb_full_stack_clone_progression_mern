import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import { UserContextProvider } from "./Auth/AuthContext";
import axios from "axios";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Profile from "./Auth/Profile";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
