import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-lg border-t border-pink-200/50 py-6 mt-10 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p>
            <span className="text-pink-700 font-semibold">CardioPrep-AI</span> &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p>
            Developed by NSU_Cgpa<strong
  className="text-red-600 font-semibold p italic tracking-widest font-mono"
>
  I
</strong>nAir
          </p>
        </div>
        <div className="flex gap-6 text-pink-600">
          <a href="mailto:support@cardioprep.ai" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
