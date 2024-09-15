import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { BudgetContext } from "../../contexts/budgets/BudgetContext";
import { BudgetModalVisibleContext } from "../../contexts/budgets/BudgetModalVisibleContext";
import BudgetModal from "./BudgetModal";
import BudgetList from "./BudgetList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshBudgets, setRefreshBudgets] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState(null);

  return (
    <BudgetContext.Provider value={{ selectedBudget, setSelectedBudget }}>
      <BudgetModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <BudgetModal setRefreshBudgets={setRefreshBudgets} />
          <BudgetList
            refreshBudgets={refreshBudgets}
            setRefreshBudgets={setRefreshBudgets}
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
      </BudgetModalVisibleContext.Provider>
    </BudgetContext.Provider>
  );
}
