import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input/Input";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";

const Signup = () => {
  const { updateUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {

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
      <h3 className="text-xl font-semibold text-black">Create an account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us below by entering your details
      </p>
  
      <form onSubmit={handleSignup}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            type="text"
            placeholder="John"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
  
        {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
  
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  </AuthLayout>
  
  );
};

export default Signup;
