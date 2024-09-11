import { createContext } from "react";

export const ExpenseContext = createContext({
  expense: null,
  setExpense: () => {},
});
