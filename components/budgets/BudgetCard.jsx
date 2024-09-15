import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../../helpers/utils";
import { BudgetContext } from "../../contexts/budgets/BudgetContext";
import { BudgetModalVisibleContext } from "../../contexts/budgets/BudgetModalVisibleContext";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function BudgetCard({ budget }) {
  const { setSelectedBudget } = useContext(BudgetContext);
  const { setModalVisible } = useContext(BudgetModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        console.log("Pressed budget", budget);
        setSelectedBudget(budget);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {budget.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(budget.val_budget.toString())}
        </Text>
      </View>
      <View className="flex-1 items-end">
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(budget.created_at)}
        </Text>
      </View>
    </StyledPressable>
  );
}
