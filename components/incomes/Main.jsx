import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { IncomeContext } from "../../contexts/incomes/IncomeContext";
import { IncomeModalVisibleContext } from "../../contexts/incomes/IncomeModalVisibleContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import IncomeModal from "./IncomeModal";
import IncomeList from "./IncomeList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshIncomes, setRefreshIncomes] = useState(true);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);

  return (
    <IncomeContext.Provider value={{ selectedIncome, setSelectedIncome }}>
      <IncomeModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <CycleContext.Provider value={{ selectedCycle, setSelectedCycle }}>
          <View className="content-start">
            <IncomeModal setRefreshIncomes={setRefreshIncomes} />
            <IncomeList
              refreshIncomes={refreshIncomes}
              setRefreshIncomes={setRefreshIncomes}
            />
          </View>
          <StyledPressable
            className="absolute right-5 bottom-5 active:opacity-50"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <PlusIcon
              size={60}
              color="#81c1f8"
              style={!modalVisible ? {} : { opacity: 0.1 }}
            />
          </StyledPressable>
        </CycleContext.Provider>
      </IncomeModalVisibleContext.Provider>
    </IncomeContext.Provider>
  );
}
