import { Pressable } from "react-native";
import { PlusIcon } from "./Icons";
import { styled } from "nativewind";
import { useState } from "react";
import ExpenseModal from "./ExpenseModal";
import ExpenseList from "./ExpenseList";

const StyledPressable = styled(Pressable);

export default function Expenses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(true);

  return (
    <>
      <ExpenseModal
        visible={modalVisible}
        setVisible={setModalVisible}
        setRefreshExpenses={setRefreshExpenses}
      />
      <ExpenseList
        modalVisible={modalVisible}
        refreshExpenses={refreshExpenses}
        setRefreshExpenses={setRefreshExpenses}
      />
      <StyledPressable
        className="absolute right-5 bottom-5 active:opacity-50"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <PlusIcon size={60} color="#81c1f8" />
      </StyledPressable>
    </>
  );
}
