import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {label && <label className="text-[13px] text-slate-500">{label}</label>}
      <div className="input-box flex items-center border border-gray-300 rounded-md p-2">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value} // Keep this, `value` should be controlled
          onChange={ onChange} // Ensure this updates state
        />
        {type === "password" && (
          showPassword ? (
            <FaRegEye size={22} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
          ) : (
            <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
