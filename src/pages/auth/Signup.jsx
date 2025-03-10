import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input/Input";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";

const Signup=()=>{
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName]= useState("");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  const handleSignup=async(e)=>{}

  return(
    <AuthLayout>
      <div className="lg-w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6"> Join us below by entering your details</p>
      </div>
      <form onSubmit={handleSignup} >
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
       <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
        value={fullName}
        onChange={({target})=> setFullName(target.value)}
        label="fullName"
        type="text"
        placeholder="John"
        />

       </div>
       </form>
    

    </AuthLayout>
  )
}
export default Signup;