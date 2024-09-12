import { createContext } from "react";

export const RecurrentSavingModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
