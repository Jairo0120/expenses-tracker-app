import { createContext } from "react";

export const ExpenseSummaryContext = createContext({
  expenseSummary: {
    spent: 0,
    available: 0,
  },
  setExpenseSummary: () => {},
});
