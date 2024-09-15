import { createContext } from "react";

export const BudgetContext = createContext({
  saving: null,
  setBudget: () => {},
});
