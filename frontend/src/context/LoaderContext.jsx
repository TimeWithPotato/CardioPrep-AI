import React, { createContext, useState } from 'react';

export const LoaderContext = createContext(null);
const LoaderContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoaderContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderContextProvider;