import { createContext } from "react";

export const RecurrentSavingContext = createContext({
  saving: null,
  setRecurrentSaving: () => {},
});
