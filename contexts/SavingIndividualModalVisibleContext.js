import { createContext } from "react";

export const SavingIndividualModalVisibleContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});
