import React, { useEffect, useState } from 'react';
import ParentQuizContainer from './ParentQuizContainer';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import InstructionModal from '../modal/InstructionModal';

const Home = () => {
  const [showInstruction, setShowInstruction] = useState(false);

  // Show instructions on every visit/refresh
  useEffect(() => {
    setShowInstruction(true);
  }, []);

  return (
    <>
      <Navbar onShowInstructions={() => setShowInstruction(true)} />
      {showInstruction && (
        <InstructionModal onClose={() => setShowInstruction(false)} />
      )}
      <ParentQuizContainer />
      <Footer />
    </>
  );
};

export default Home;
