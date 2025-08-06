import { createContext, useState } from "react";


export const QnaHistoryContext = createContext(null);

const QnaHistoryContextProvider = ({ children }) => {
    const [qnaHistory, setQnaHistory] = useState([]);

    return (
        <QnaHistoryContext.Provider value={{ qnaHistory, setQnaHistory }}>
            {children}
        </QnaHistoryContext.Provider>
    );
};

export default QnaHistoryContextProvider;