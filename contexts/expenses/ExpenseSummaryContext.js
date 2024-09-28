import { createContext } from "react";

export const ExpenseSummaryContext = createContext({
  expenseSummary: {
    totalExpenses: 0,
    moneyAvailable: 0,
  },
  setExpenseSummary: () => {},
});
