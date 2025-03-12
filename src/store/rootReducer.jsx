import { combineReducers } from "redux";
import authReducer from "./slice/AuthSlice"
import jobReducer from "./slice/HrSlice/jobSlice"
// // Example reducer for user authentication
// const authReducer = (state = { isAuthenticated: false }, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, isAuthenticated: true };
//     case "LOGOUT":
//       return { ...state, isAuthenticated: false };
//     default:
//       return state;
//   }
// };

// // Example reducer for job listings
// const jobReducer = (state = { jobs: [] }, action) => {
//   switch (action.type) {
//     case "ADD_JOB":
//       return { ...state, jobs: [...state.jobs, action.payload] };
//     case "REMOVE_JOB":
//       return { ...state, jobs: state.jobs.filter(job => job.id !== action.payload.id) };
//     default:
//       return state;
//   }
// };

// Combine reducers


const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});

export default rootReducer;
