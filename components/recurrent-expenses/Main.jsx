import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { RecurrentExpenseContext } from "../../contexts/recurrent-expenses/RecurrentExpenseContext";
import { RecurrentExpenseModalVisibleContext } from "../../contexts/recurrent-expenses/RecurrentExpenseModalVisibleContext";
import RecurrentExpenseModal from "./RecurrentExpenseModal";
import RecurrentExpenseList from "./RecurrentExpenseList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshRecurrentExpenses, setRefreshRecurrentExpenses] =
    useState(true);
  const [selectedRecurrentExpense, setSelectedRecurrentExpense] =
    useState(null);

  return (
    <RecurrentExpenseContext.Provider
      value={{ selectedRecurrentExpense, setSelectedRecurrentExpense }}
    >
      <RecurrentExpenseModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <RecurrentExpenseModal
            setRefreshRecurrentExpenses={setRefreshRecurrentExpenses}
          />
          <RecurrentExpenseList
            refreshRecurrentExpenses={refreshRecurrentExpenses}
            setRefreshRecurrentExpenses={setRefreshRecurrentExpenses}
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
      </RecurrentExpenseModalVisibleContext.Provider>
    </RecurrentExpenseContext.Provider>
  );
}
