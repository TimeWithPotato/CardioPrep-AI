import { createContext, useState } from "react";

export const CurrentQuestionContext = createContext(null);

const CurrentQuestionProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState([]);

  return (
    <CurrentQuestionContext.Provider
      value={{ currentQuestion, setCurrentQuestion }}
    >
      {children}
    </CurrentQuestionContext.Provider>
  );
};

export default CurrentQuestionProvider;
