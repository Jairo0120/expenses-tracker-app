import { createContext } from "react";

export const RecurrentIncomeContext = createContext({
  income: null,
  setRecurrentIncome: () => {},
});
