import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../../helpers/utils";
import { ExpenseContext } from "../../contexts/ExpenseContext";
import { ExpenseModalVisibleContext } from "../../contexts/ExpenseModalVisibleContext";
import { styled } from "nativewind";
import { RecurrentIcon } from "../Icons";

const StyledPressable = styled(Pressable);

export default function ExpenseCard({ expense }) {
  const { setSelectedExpense } = useContext(ExpenseContext);
  const { setModalVisible } = useContext(ExpenseModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        setSelectedExpense(expense);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {expense.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(expense.val_expense.toString())}
        </Text>
      </View>
      {expense.is_recurrent_expense && (
        <RecurrentIcon color="#81c1f8" size={20} />
      )}
      <View className="flex-1 items-end justify-center">
        <Text
          className={
            `text-sm font-semibold ` +
            (expense.budget !== null
              ? "text-dodger-blue-300"
              : "text-persian-red-400")
          }
        >
          {expense.budget?.description || "Sin presupuesto"}
        </Text>
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(expense.date_expense)}
        </Text>
      </View>
    </StyledPressable>
  );
}
