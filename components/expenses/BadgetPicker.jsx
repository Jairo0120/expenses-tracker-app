import { Text, View, Pressable, ScrollView } from "react-native";
import { formatShortMoney } from "../../helpers/utils";

export default function BadgetPicker({
  budgets,
  selectedBudget,
  setSelectedBudget,
  disabled = false,
}) {
  const inactiveBadge = "bg-dodger-blue-300 border border-dodger-blue-400";
  const activeBadge =
    "bg-dodger-blue-100 border-dodger-blue-600 border-2 shadow-sm shadow-white";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-2"
      contentContainerStyle={{ paddingVertical: 8 }}
    >
      <View className="flex-row">
        {budgets.map((budget) => (
          <Pressable
            disabled={disabled}
            key={budget.id}
            className={
              `justify-center mt-2 mr-2 rounded-xl ` +
              (selectedBudget === budget.id ? activeBadge : inactiveBadge)
            }
            onPress={() =>
              setSelectedBudget(selectedBudget === budget.id ? null : budget.id)
            }
          >
            <View className="px-2 py-1">
              <Text
                className="text-center font-semibold"
                style={{ fontSize: 11 }}
              >
                {budget.description}
              </Text>
              <Text className="text-center" style={{ fontSize: 9 }}>
                {formatShortMoney(budget.total_spent)}
                {budget.val_budget > 0 &&
                  ` / ${formatShortMoney(budget.val_budget)}`}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
