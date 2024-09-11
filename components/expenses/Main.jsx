import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { ExpenseContext } from "../../contexts/expenses/ExpenseContext";
import { ExpenseModalVisibleContext } from "../../contexts/expenses/ExpenseModalVisibleContext";
import ExpenseModal from "./ExpenseModal";
import ExpenseList from "./ExpenseList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);

  return (
    <ExpenseContext.Provider value={{ selectedExpense, setSelectedExpense }}>
      <ExpenseModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
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
          <PlusIcon
            size={60}
            color="#81c1f8"
            style={!modalVisible ? {} : { opacity: 0.1 }}
          />
        </StyledPressable>
      </ExpenseModalVisibleContext.Provider>
    </ExpenseContext.Provider>
  );
}
