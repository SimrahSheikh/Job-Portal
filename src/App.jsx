import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import NavBar from "./components/HR_Components/NavBar";
import PostJob from "./components/HR_Components/PostJob";
import HRLayout from "./components/Layouts/HRLayout";
import { Applications } from "./components/HR_Components/Applications";
import PostedJobs from "./components/HR_Components/PostedJobs";


// user dashboard imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layouts/UserLayout";
// import UserDashboard from "./components/User_Components/UserDashboard"; 
import Jobs from "./components/User_Components/Jobs";
import AppliedJobs from "./components/User_Components/AppliedJobs";
import SavedJobs from "./components/User_Components/SavedJobs";
import ApplicationStatus from "./components/User_Components/ApplicationStatus";
import Profile from "./components/User_Components/Profile";



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



         {/* User Dashboard Routes */}
         <Route  element={<UserLayout />}>
            {/* <Route index element={<UserDashboard />} /> */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/profile" element={<Profile />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
