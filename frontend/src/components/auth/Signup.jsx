import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/users/signup", {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to sign up. Please check your details and try again.");
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

      {/* Box Wrapper */}
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

        {/* Form Container */}
        <form
          onSubmit={handleSignup}
          className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-10 bg-[#0d1117] border border-[#30363d] rounded-md px-2 text-sm focus:border-[#58a6ff] outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 bg-[#0d1117] border border-[#30363d] rounded-md px-2 text-sm focus:border-[#58a6ff] outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 bg-[#0d1117] border border-[#30363d] rounded-md px-2 text-sm focus:border-[#58a6ff] outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 rounded-md font-semibold text-sm ${
              loading
                ? "bg-[#34c759] cursor-not-allowed"
                : "bg-[#34c759] hover:bg-[#34c759]"
            } transition`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Already account */}
        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth" className="text-[#58a6ff] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
