import { createContext } from "react";

export const IncomeModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
