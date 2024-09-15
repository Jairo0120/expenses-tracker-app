import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../../helpers/utils";
import { RecurrentExpenseContext } from "../../contexts/recurrent-expenses/RecurrentExpenseContext";
import { RecurrentExpenseModalVisibleContext } from "../../contexts/recurrent-expenses/RecurrentExpenseModalVisibleContext";
import { styled } from "nativewind";
import { CheckIcon, RemoveIcon } from "../Icons";

const StyledPressable = styled(Pressable);

export default function RecurrentExpenseCard({ recurrentExpense }) {
  const { setSelectedRecurrentExpense } = useContext(RecurrentExpenseContext);
  const { setModalVisible } = useContext(RecurrentExpenseModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        setSelectedRecurrentExpense(recurrentExpense);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {recurrentExpense.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(recurrentExpense.val_expense.toString())}
        </Text>
      </View>
      <View className="flex-1 items-end justify-center">
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(recurrentExpense.created_at)}
        </Text>
        {recurrentExpense.enabled ? (
          <Text className="text-dodger-blue-500 text-sm">
            Habilitado
            <CheckIcon size={20} color="#81c1f8" />
          </Text>
        ) : (
          <Text className="text-gray-500 text-sm">
            Deshabilitado
            <RemoveIcon size={20} color="#6b7280" />
          </Text>
        )}
      </View>
    </StyledPressable>
  );
}
