import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/forgot-password", { email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError("Failed to send reset link. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-center text-2xl text-blue-600 font-bold">Forgot Password?</h2>
        <p className="text-gray-600 text-center mt-2">Enter your email to reset your password</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md transition-all duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Success & Error Messages */}
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
