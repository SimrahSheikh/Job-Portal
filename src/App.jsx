// import './App.css'
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SignupHr from "./components/SignupHr";
import SignupSeeker from "./components/SignupSeeker";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup-hr" element={<SignupHr />} />
          <Route path="/signup-seeker" element={<SignupSeeker />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
