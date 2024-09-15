import { createContext } from "react";

export const BudgetModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
