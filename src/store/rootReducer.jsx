import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice";
import postReducer from "./slice/userSlice/postSlice";
import appliedJobsReducer from "./slice/userSlice/appliedJobSlice"
import hrJobsReducer from "./slice/HrSlice/jobSlice";
import profileReducer from "./slice/userSlice/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  appliedJobs :appliedJobsReducer,
  post: postReducer,
  hrJobs: hrJobsReducer
  ,profile:profileReducer
});

export default rootReducer;
