import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setcurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setcurrentUser(res.data.userId);

      navigate("/");
    } catch (err) {
      let errorMessage = 'Login failed. Please check your email and password.';
      
      if (err.response) {
        // Server responded with an error status code
        errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        // Something else happened in setting up the request
        errorMessage = err.message || 'An unexpected error occurred';
      }
      
      console.error('Login error:', err);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-[#0d1117] text-[#f0f6fc] font-sans">

      {/* Logo */}
      <div className="py-10">
        <img src={logo} alt="Logo" className="w-12" />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-4">

        <h1 className="text-2xl font-semibold text-center">Sign In</h1>

        {/* Login Form */}
        <form
          className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-6 flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-[#30363d] bg-[#0d1117] px-2 text-sm focus:border-[#58a6ff] outline-none transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-md border border-[#30363d] bg-[#0d1117] px-2 text-sm focus:border-[#58a6ff] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 rounded-md font-semibold text-sm transition ${
              loading
                ? "bg-[#2ea04380] cursor-not-allowed"
                : "bg-[#238636] hover:bg-[#2ea043]"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Link to signup */}
        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-4 text-center text-sm">
          New to GitHub?{" "}
          <Link to="/signup" className="text-[#58a6ff] hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
