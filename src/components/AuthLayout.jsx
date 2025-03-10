import React from "react";
import img from "../image/img.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section (Purple Background) */}
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-purple-500 to-violet-500 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Purple Decorations */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[-40px]"></div>
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute top-[30%] -right-5"></div>

        {/* Stats Card */}
        <div className="relative z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
          />
        </div>

        {/* Transactions Card (Placeholder) */}
        <div className="absolute bottom-10 w-[90%] bg-white p-6 rounded-2xl shadow-lg shadow-gray-300">
          <h4 className="font-medium text-gray-600"></h4>
          <p className="text-xs text-gray-500"></p>
          {/* Add Graph Component Here */}
        </div>

        {/* Image */}
        <img
          src={img}
          className="w-64 lg:w-[90%] absolute bottom-20 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200/50 relative w-[80%]">
      {/* Purple Highlight in Corner */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-purple-600 rounded-tl-xl"></div>

      {/* Purple Circle Around Icon */}
      <div className="w-16 h-16 flex items-center justify-center border-4 border-purple-500 rounded-full bg-white shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center text-[26px] text-white bg-purple-600 rounded-full drop-shadow-2xl">
          {icon}
        </div>
      </div>

      {/* Text Content */}
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold text-gray-800">${value}</span>
      </div>
    </div>
  );
};
