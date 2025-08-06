import { useContext, useEffect, useState, useRef } from "react";
import { QnaEvaluateContext } from "../context/QnaEvaluateContext";
import { LoaderContext } from "../context/LoaderContext";

import EvaluationModal from "../modal/EvaluationModal";
import getApiBaseUrl from "../Utils/getApiBaseUrl";


const Evaluate = () => {
  const {
    mcqEvaluate,
    descriptiveEvaluate,
    setEvaluationResult,
    setShowEvaluationModal,
    evaluationResult,
  } = useContext(QnaEvaluateContext);


  const {isLoading, setIsLoading} = useContext(LoaderContext);


  // ✅ Guard to prevent multiple fetches
  const hasFetched = useRef(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const fetchEvaluation = async () => {
    setIsLoading(true);
    try {
      const resMcq = await fetch(`${getApiBaseUrl()}/api/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mcqEvaluate }),
      });

      const dataMcq = await resMcq.json();
      console.log("Evaluation Data of MCQ: ", dataMcq);

      const resDescriptive = await fetch(`${getApiBaseUrl()}/api/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descriptiveEvaluate }),
      });

      const dataDescriptive = await resDescriptive.json();
      console.log("Evaluation Data of Descriptive: ", dataDescriptive);

      // ✅ Merge and set at once
      setEvaluationResult({
        mcqEvaluate: dataMcq,
        descriptiveEvaluate: dataDescriptive,
      });
      // console.log("Evaluation Result: ",evaluationResult);
    } catch (error) {
      console.log("Error from evaluate fetching: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchEvaluation();
}, []);
 // <- only runs once on mount

  return (
    <>
      {!isLoading && evaluationResult && (
        <EvaluationModal onClose={() => setShowEvaluationModal(false)} />
      )}
    </>
  );
};

export default Evaluate;
