import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          {/* <Route path="/user/logout" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
