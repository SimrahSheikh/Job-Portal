import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setMessage("");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setError("");
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to reset password. Try again.");
      setMessage("");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-center text-2xl text-blue-600 font-bold">Reset Password</h2>
        <p className="text-gray-600 text-center mt-2">Enter a new password to reset your account</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* New Password Input */}
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSuccess}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isSuccess}
          />

          {/* Submit Button */}
          {!isSuccess && (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md transition-all duration-300"
            >
              Reset Password
            </button>
          )}
        </form>

        {/* Success & Error Messages */}
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Login Button (Only Shows on Success) */}
        {isSuccess && (
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
