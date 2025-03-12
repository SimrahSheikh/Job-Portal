import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice"
import postReducer from "./slice/userSlice/postSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer
});

export default rootReducer;
