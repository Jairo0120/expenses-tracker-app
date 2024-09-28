import { Text, View } from "react-native";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";
import { useContext, useState } from "react";
import { formatMoney } from "../../helpers/utils";
import { Pressable } from "react-native";

export default function ExpenseSummary() {
  const { expenseSummary } = useContext(ExpenseSummaryContext);
  const availableToSpent =
    expenseSummary.moneyAvailable - expenseSummary.totalExpenses;
  const [showIncome, setShowIncome] = useState(false);
  let spentColor = "text-persian-red-600";
  // This conditions only applies when there's a income in the cycle
  if (
    availableToSpent > 0 &&
    (availableToSpent / expenseSummary.moneyAvailable) * 100 > 70
  ) {
    spentColor = "text-green-500";
  } else if (
    availableToSpent > 0 &&
    (availableToSpent / expenseSummary.moneyAvailable) * 100 > 50
  ) {
    spentColor = "text-yellow-500";
  } else if (
    availableToSpent > 0 &&
    (availableToSpent / expenseSummary.moneyAvailable) * 100 > 20
  ) {
    spentColor = "text-orange-500";
  } else if (
    availableToSpent > 0 &&
    (availableToSpent / expenseSummary.moneyAvailable) * 100 > 1
  ) {
    spentColor = "text-persian-red-400";
  }

  return (
    <View className="flex-row">
      {expenseSummary.moneyAvailable > 0 && (
        <Pressable
          className="flex-row"
          onPress={() => setShowIncome(!showIncome)}
        >
          {showIncome ? (
            <>
              <Text className="text-sm text-white">
                {formatMoney(expenseSummary.totalExpenses.toString())}
              </Text>
              <Text className="text-sm text-white px-1">de</Text>
              <Text className="text-sm text-white">
                {formatMoney(expenseSummary.moneyAvailable.toString())}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-sm pr-2 text-dodger-blue-300">
                Disponible:
              </Text>
              <Text className={`text-sm font-bold ` + spentColor}>
                {availableToSpent > 0
                  ? formatMoney(availableToSpent.toString())
                  : "- " + formatMoney(availableToSpent.toString())}
              </Text>
            </>
          )}
        </Pressable>
      )}
      {expenseSummary.moneyAvailable === 0 && (
        <>
          <Text className="text-dodger-blue-300 pr-2 text-sm">Gastado:</Text>
          <Text className="text-white text-sm">
            {formatMoney(expenseSummary.totalExpenses.toString())}
          </Text>
        </>
      )}
    </View>
  );
}
