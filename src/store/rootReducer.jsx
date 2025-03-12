import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice";
import postReducer from "./slice/PostSlice";
import appliedJobsReducer from "./slice/AppliedJobsSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  appliedJobs :appliedJobsReducer,


  post: postReducer
});

export default rootReducer;
