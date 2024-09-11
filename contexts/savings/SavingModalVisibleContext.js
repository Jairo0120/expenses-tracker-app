import { createContext } from "react";

export const SavingModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
