import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice";
import postReducer from "./slice/userSlice/postSlice";
import appliedJobsReducer from "./slice/userSlice/appliedJobSlice"
import hrJobsReducer from "./slice/HrSlice/jobSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  appliedJobs :appliedJobsReducer,
  post: postReducer,
  hrJobs: hrJobsReducer
});

export default rootReducer;
