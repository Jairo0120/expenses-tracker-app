import { createContext } from "react";

export const RecurrentExpenseContext = createContext({
  expense: null,
  setRecurrentExpense: () => {},
});
