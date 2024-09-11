import { createContext } from "react";

export const SavingContext = createContext({
  saving: null,
  setSaving: () => {},
});
