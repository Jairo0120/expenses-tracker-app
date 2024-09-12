import { createContext } from "react";

export const RecurrentIncomeModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
