import { createContext } from "react";

export const IncomeContext = createContext({
  income: null,
  setIncome: () => {},
});
