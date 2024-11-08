import { createContext } from "react";

export const CycleListContext = createContext({
  cycleList: [],
  setCycleList: () => {},
});
