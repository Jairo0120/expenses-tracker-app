import { Pressable } from "react-native";
import { PlusIcon } from "./Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { ExpenseContext } from "../contexts/ExpenseContext";
import { ExpenseModalVisibleContext } from "../contexts/ExpenseModalVisibleContext";
import ExpenseModal from "./ExpenseModal";
import ExpenseList from "./ExpenseList";

const StyledPressable = styled(Pressable);

export default function Expenses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);

  return (
    <ExpenseContext.Provider value={{ selectedExpense, setSelectedExpense }}>
      <ExpenseModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <ExpenseModal setRefreshExpenses={setRefreshExpenses} />
        <ExpenseList
          refreshExpenses={refreshExpenses}
          setRefreshExpenses={setRefreshExpenses}
        />
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
