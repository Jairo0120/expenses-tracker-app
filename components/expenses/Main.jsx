import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { ExpenseContext } from "../../contexts/expenses/ExpenseContext";
import { ExpenseModalVisibleContext } from "../../contexts/expenses/ExpenseModalVisibleContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import ExpenseModal from "./ExpenseModal";
import ExpenseList from "./ExpenseList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);

  return (
    <ExpenseContext.Provider value={{ selectedExpense, setSelectedExpense }}>
      <ExpenseModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <CycleContext.Provider value={{ selectedCycle, setSelectedCycle }}>
          <View className="content-start">
            <ExpenseModal setRefreshExpenses={setRefreshExpenses} />
            <ExpenseList
              refreshExpenses={refreshExpenses}
              setRefreshExpenses={setRefreshExpenses}
            />
          </View>
          <StyledPressable
            className="absolute right-5 bottom-5 active:opacity-50"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm shadow-blue-500/30 p-3">
              <PlusIcon
                size={50}
                color="white"
                style={!modalVisible ? {} : { opacity: 0.1 }}
              />
            </View>
          </StyledPressable>
        </CycleContext.Provider>
      </ExpenseModalVisibleContext.Provider>
    </ExpenseContext.Provider>
  );
}
