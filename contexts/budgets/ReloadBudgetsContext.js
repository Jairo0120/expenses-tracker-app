import { createContext } from "react";

export const ReloadBudgetsContext = createContext({
  reloadBudgets: false,
  setReloadBudgets: () => {},
});
