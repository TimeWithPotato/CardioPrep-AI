import React from "react";

const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen w-auto" : "h-auto w-auto"
      } flex items-center justify-center bg-[#F8BBD0]/60 backdrop-blur-md rounded-2xl`}
    >
      <div className="w-16 h-16 border-4 border-dashed border-[#EC407A] rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
