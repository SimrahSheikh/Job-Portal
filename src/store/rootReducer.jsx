import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice";
import postReducer from "./slice/userSlice/postSlice";
import appliedJobsReducer from "./slice/userSlice/appliedJobSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  appliedJobs :appliedJobsReducer,
  post: postReducer
});

export default rootReducer;
