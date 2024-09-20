import { createContext } from "react";

export const ExpenseSummaryContext = createContext({
  expenseSummary: {
    total: 0,
    budget: 0,
  },
  setExpenseSummary: () => {},
});
