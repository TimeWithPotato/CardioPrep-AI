import { createContext, useState } from "react";

export const ShowExplanationsContext = createContext(null);

const ShowExplanationsContextProvider = ({ children }) => {
  const [showExplanations, setShowExplanations] = useState(null);

  return (
    <ShowExplanationsContext.Provider
      value={{ showExplanations, setShowExplanations }}
    >
      {children}
    </ShowExplanationsContext.Provider>
  );
};

export default ShowExplanationsContextProvider;
