import { createContext } from "react";

export const RecurrentExpenseModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
