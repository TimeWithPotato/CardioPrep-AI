import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CurrentQuestionProvider from "./context/CurrentQuestionContext.jsx";
import QnaEvaluateContextProvider from "./context/QnaEvaluateContext.jsx";
import QnaHistoryContextProvider from "./context/QnaHistoryContext.jsx";
import ShowExplanationsContextProvider from "./context/ShowExplanationsContext.jsx";
import LoaderContextProvider from "./context/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <CurrentQuestionProvider>
      <QnaEvaluateContextProvider>
        <QnaHistoryContextProvider>
          <ShowExplanationsContextProvider>
            <LoaderContextProvider>
                <App/>
            </LoaderContextProvider>
          </ShowExplanationsContextProvider>
        </QnaHistoryContextProvider>
      </QnaEvaluateContextProvider>
    </CurrentQuestionProvider>
  // </StrictMode>
);
