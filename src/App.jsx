import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostJob from "./components/HR_Components/PostJob";
import HRLayout from "./components/Layouts/HRLayout";
import HRProfile from "./components/HR_Components/HrProfile";
import { HrHome } from "./components/HR_Components/HrHome";
import Applications from "./components/HR_Components/Applications";
import PostedJobs from "./components/HR_Components/PostedJobs";
import UserLayout from "./components/Layouts/UserLayout";
import Jobs from "./components/User_Components/Jobs";
import AppliedJobs from "./components/User_Components/AppliedJobs";
import SavedJobs from "./components/User_Components/SavedJobs";
import Profile from "./components/User_Components/Profile";
import JobDetails from "./components/User_Components/JobDetails";
import Premium from "./components/stripe/Premium";
import PaymentPage from "./components/stripe/PaymentPage";
import PaymentSuccess from "./components/stripe/PaymentSuccess";
import Web_homepage from "./components/Layouts/Web_homepage";
import ForgotPassword from "./components/passwordHandle/ForgotPassword";
import ResetPassword from "./components/passwordHandle/ResetPassword";
import HRLogin from "./components/HRLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="relative h-screen">
        <Routes>
        <Route path="/" element={<Web_homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-hr" element={<HRLogin />} />

          <Route path="/premium" element={<Premium />} />

          <Route path="/forgot-password" element ={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>}/> 

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment/:plan" element={<PaymentPage />} />

          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HrHome />} />
            <Route path="/hr/postjob" element={<PostJob />} />
            <Route path="/hr/postedjobs" element={<PostedJobs />} />
            <Route path="/hr/profile" element={<HRProfile />} />
            <Route path="/hr/home" element={<HrHome />} />
            <Route path="applications/:jobId" element={<Applications />} />

          </Route>

          {/* User Dashboard Routes */}
          <Route path="/user" element={<UserLayout />}>
            {/* <Route index element={<UserDashboard />} /> */}
            <Route path="/user/jobs" element={<Jobs />} />
            <Route path="/user/jobs/:id" element={<JobDetails />} />
            <Route path="/user/applied-jobs/:id" element={<JobDetails />} />
            <Route path="/user/applied-jobs" element={<AppliedJobs />} />
            <Route path="/user/saved-jobs" element={<SavedJobs />} />
            <Route path="/user/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
