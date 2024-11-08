import { createContext } from "react";

export const CycleContext = createContext({
  selectedCycle: null,
  setSelectedCycle: () => {},
});
