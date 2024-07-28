import { Pressable } from "react-native";
import { PlusIcon } from "../components/Icons";
import { Screen } from "../components/Screen";
import { styled } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import AddExpense from "../components/AddExpense";

const StyledPressable = styled(Pressable);

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Screen>
      <AddExpense visible={modalVisible} setVisible={setModalVisible} />
      <StatusBar style="light" />
      <StyledPressable
        className="absolute right-5 bottom-5 active:opacity-50"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <PlusIcon size={60} color="#c98b1e" />
      </StyledPressable>
    </Screen>
  );
}
