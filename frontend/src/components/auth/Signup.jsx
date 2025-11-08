import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const { setcurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (loading) return; 
    
    setLoading(true);
    
    
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
      source.cancel('Request timeout. Please check your internet connection and try again.');
    }, 10000); 

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/signup",
        { email, password, username },
        { 
          cancelToken: source.token,
          timeout: 10000, 
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Signup response:', res.data); 

      if (!res.data || !res.data.token || !res.data.userId) {
        throw new Error('Invalid response format from server');
      }

      
      const userId = typeof res.data.userId === 'object' 
        ? res.data.userId.toString() 
        : res.data.userId;
        
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userId);
      
      
      setcurrentUser(userId);
      
      
      clearTimeout(timeout);
      
      navigate("/", { replace: true });
      return; 
    } catch (err) {
      clearTimeout(timeout);
      
      let errorMessage = 'Failed to sign up. Please try again.';
      
      if (axios.isCancel(err)) {
        errorMessage = err.message;
      } else if (err.response) {
        // Server responded with an error status code
        errorMessage = err.response.data?.message || `Error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        // Something else happened in setting up the request
        errorMessage = err.message || 'An unexpected error occurred';
      }
      
      console.error('Signup error:', err);
      alert(errorMessage);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-[#0d1117] text-[#f0f6fc] font-sans">
      <div className="py-10">
        <img src={logo} alt="Logo" className="w-12" />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

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
                ? "bg-[#1f7a34] cursor-not-allowed flex items-center justify-center"
                : "bg-[#34c759] hover:bg-[#2db84d]"
            } transition`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

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
