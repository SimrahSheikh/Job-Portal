import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import NavBar from "./components/HR_Components/NavBar";
import PostJob from "./components/HR_Components/PostJob";
import HRLayout from "./components/Layouts/HRLayout";
import { Applications } from "./components/HR_Components/Applications";
import PostedJobs from "./components/HR_Components/PostedJobs";

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/hr" element={<HRLayout />}>
            <Route path="/hr/postjob" element={<PostJob />} />
            <Route path="/hr/applications" element={<Applications />} />
            <Route path="/hr/postedjobs" element={<PostedJobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
