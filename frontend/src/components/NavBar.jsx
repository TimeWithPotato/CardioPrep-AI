import React, { useEffect, useState } from "react";
import OfflineModal from "../modal/OfflineModal";

const Navbar = ({ onShowInstructions }) => {
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <nav className="bg-white/50 backdrop-blur-md shadow-md p-4 flex justify-between items-center rounded-b-xl">
        <h1 className="text-2xl font-bold text-pink-700">CardioPrep-AI</h1>
        <div className="flex gap-4">
          <button
            onClick={onShowInstructions}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full text-sm transition"
          >
            Instructions
          </button>

          {isDesktop && (
            <button
              onClick={() => setShowOfflineModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition"
            >
              Offline
            </button>
          )}
        </div>
      </nav>

      {isDesktop && showOfflineModal && (
        <OfflineModal onClose={() => setShowOfflineModal(false)} />
      )}
    </>
  );
};

export default Navbar;
