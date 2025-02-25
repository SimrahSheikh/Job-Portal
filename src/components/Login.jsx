// import { NavLink, Router } from "react-router-dom";
// import signup from "./Signup";
// export default function Login() {
//   return (
//     <>
//         <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
//       {/*

//           This example requires updating your template:

//           ```
//           <html class="h-full bg-white">
//           <body class="h-full">
//           ```
//         */}
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <img
//             alt="Your Company"
//             src="data:image/jpeg;base64,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"
//             className="mx-auto h-10 w-auto"
//           />
//           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//             Login in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form action="#" method="POST" className="space-y-6">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm/6 font-medium text-gray-900"
//               >
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm/6 font-medium text-gray-900"
//                 >
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <a
//                     href="#"
//                     className="font-semibold text-indigo-600 hover:text-indigo-500"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Login in
//               </button>
//             </div>
//           </form>

//           {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
//             Not a member?{" "}
//             <a
//               href="#"
//               className="font-semibold text-indigo-600 hover:text-indigo-500"
//             >
//               Signup
//             </a>
//           </p> */}
//           <p className="mt-10 text-center text-sm/6 text-gray-500">
//             Not a member?{" "}
//             <NavLink
//               to="/signup"
//               className="font-semibold text-indigo-600 hover:text-indigo-500"
//             >
//               Signup
//             </NavLink>
//           </p>
//         </div>
//       </div>
//       </section>
//     </>
//   );
// }
import { useState } from "react";
import { NavLink, Router } from "react-router-dom";
import signup from "./SignupHr";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", formData);
    // Implement login logic (API call, Redux store update, etc.)
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-gray-800 rounded-lg shadow sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="data:image/jpeg;base64,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"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-300">



        
              Login in to your account
            </h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              LogIn
            </button>
            {/* <p className="text-sm text-gray-400 text-center">
              Not a member? <a href="#" className="text-blue-500 hover:underline">Signup</a>
            </p> */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <NavLink
                to="/signup-hr"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                SignUp as a Hr
              </NavLink>
              {" | "}
              <NavLink
                to="/signup-seeker"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                SignUp as a JobSeeker
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
