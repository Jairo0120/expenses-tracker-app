import { Text, View } from "react-native";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";
import { useContext } from "react";
import { formatMoney } from "../../helpers/utils";

export default function ExpenseSummary() {
  const { expenseSummary } = useContext(ExpenseSummaryContext);
  const spent =
    expenseSummary.spent < expenseSummary.available &&
    expenseSummary.available > 0
      ? expenseSummary.spent
      : expenseSummary.available - expenseSummary.spent;
  return (
    <View className="flex-row">
      <Text
        className={
          spent > 0 || expenseSummary.available === 0
            ? "text-sm text-white"
            : "text-xl text-red-600"
        }
      >
        {spent >= 0 || expenseSummary.available === 0
          ? formatMoney(spent.toString())
          : "- " + formatMoney(spent.toString())}
      </Text>
      {expenseSummary.available > 0 &&
        expenseSummary.available > expenseSummary.spent && (
          <>
            <Text className="text-white mx-1">/</Text>
            <Text className="text-white text-sm">
              {formatMoney(expenseSummary.available.toString())}
            </Text>
          </>
        )}
    </View>
  );
}
