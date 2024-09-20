import { Text, View } from "react-native";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";
import { useContext } from "react";

export default function ExpenseSummary() {
  const { expenseSummary } = useContext(ExpenseSummaryContext);
  console.log(expenseSummary);
  return (
    <View className="flex-row">
      <Text className="text-white text-sm">{expenseSummary.total}</Text>
      <Text className="text-white mx-1">/</Text>
      <Text className="text-white text-sm">{expenseSummary.budget}</Text>
    </View>
  );
}
