import { createContext, useState } from "react";

export const QnaEvaluateContext = createContext(null);

const QnaEvaluateContextProvider = ({ children }) => {
  const [qnaEvaluate, setQnaEvaluate] = useState([]);
  const [mcqEvaluate, setMcqEvaluate] = useState([]);
  const [descriptiveEvaluate, setDescriptiveEvaluate] = useState([]);
  const [evaluationResult, setEvaluationResult] = useState({});
  const [showEvaluateButton, setShowEvaluateButton] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [isEvaluateFetched, setIsEvaluateFetched] = useState(false);

  return (
    <QnaEvaluateContext.Provider
      value={{
        qnaEvaluate,
        setQnaEvaluate,
        mcqEvaluate,
        setMcqEvaluate,
        descriptiveEvaluate,
        setDescriptiveEvaluate,
        evaluationResult,
        setEvaluationResult,
        showEvaluateButton,
        setShowEvaluateButton,
        showEvaluationModal,
        setShowEvaluationModal, 
        isEvaluateFetched,
        setIsEvaluateFetched
      }}
    >
      {children}
    </QnaEvaluateContext.Provider>
  );
};

export default QnaEvaluateContextProvider;
