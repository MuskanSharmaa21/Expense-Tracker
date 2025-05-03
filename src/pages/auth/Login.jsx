import React, { useState, useContext } from "react"; 
import AuthLayout from "../../components/AuthLayout"; 
import { Link, useNavigate } from "react-router-dom"; 
import Input from "../../components/Input/Input"; 
import axiosInstance from "../../utils/axiosInstance"; 
import { validateEmail } from "../../utils/helper"; 
import { API_PATH } from "../../utils/apiPath"; 
import { UserContext } from "../../context/userContext";

const Login = () => {
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };
  
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Login to your account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Welcome back! Please enter your details
        </p>
        
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          
          {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
          
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full"
          >
            Login
          </button>
          
          <p className="text-center text-sm mt-4">
            Don't have an account? <Link to="/signup" className="text-purple-600">Sign up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;