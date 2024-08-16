import { View, Text } from "react-native";
import { formatMoney, formatDate } from "../helpers/utils";

export default function ExpenseCard({ expense }) {
  return (
    <View className="flex-row bg-dodger-blue-950 p-4 rounded-lg shadow-md mb-4 mx-3">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {expense.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(expense.val_expense.toString())}
        </Text>
      </View>
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
    </View>
  );
}
