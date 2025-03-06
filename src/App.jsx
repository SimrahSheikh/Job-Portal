import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import PostJob from "./components/HR_Components/PostJob";
import HRLayout from "./components/Layouts/HRLayout";
import Applications from "./components/HR_Components/Applications";
import PostedJobs from "./components/HR_Components/PostedJobs";
import UserLayout from "./components/Layouts/UserLayout";
import UserDashboard from "./components/User_Components/UserDashboard";
import Jobs from "./components/User_Components/Jobs";
import AppliedJobs from "./components/User_Components/AppliedJobs";
import SavedJobs from "./components/User_Components/SavedJobs";
import Profile from "./components/User_Components/Profile";
import JobDetails from "./components/User_Components/JobDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="relative h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/hr" element={<HRLayout />}>
            <Route path="/hr/postjob" element={<PostJob />} />
            <Route path="applications/:jobId" element={<Applications />} />

            <Route path="/hr/postedjobs" element={<PostedJobs />} />

          </Route>

          {/* User Dashboard Routes */}
          <Route element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
