// import './App.css'
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
