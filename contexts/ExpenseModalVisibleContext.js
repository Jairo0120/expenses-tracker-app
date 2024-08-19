import { createContext } from "react";

export const ExpenseModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
