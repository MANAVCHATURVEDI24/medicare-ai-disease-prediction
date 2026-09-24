import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [reportData, setReportData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [predictions, setPredictions] = useState(null);

  const value = {
    reportData,
    setReportData,
    questions,
    setQuestions,
    predictions,
    setPredictions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}