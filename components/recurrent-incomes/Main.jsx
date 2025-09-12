import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { RecurrentIncomeContext } from "../../contexts/recurrent-incomes/RecurrentIncomeContext";
import { RecurrentIncomeModalVisibleContext } from "../../contexts/recurrent-incomes/RecurrentIncomeModalVisibleContext";
import RecurrentIncomeModal from "./RecurrentIncomeModal";
import RecurrentIncomeList from "./RecurrentIncomeList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshRecurrentIncomes, setRefreshRecurrentIncomes] = useState(true);
  const [selectedRecurrentIncome, setSelectedRecurrentIncome] = useState(null);

  return (
    <RecurrentIncomeContext.Provider
      value={{ selectedRecurrentIncome, setSelectedRecurrentIncome }}
    >
      <RecurrentIncomeModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <RecurrentIncomeModal
            setRefreshRecurrentIncomes={setRefreshRecurrentIncomes}
          />
          <RecurrentIncomeList
            refreshRecurrentIncomes={refreshRecurrentIncomes}
            setRefreshRecurrentIncomes={setRefreshRecurrentIncomes}
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
      </RecurrentIncomeModalVisibleContext.Provider>
    </RecurrentIncomeContext.Provider>
  );
}
