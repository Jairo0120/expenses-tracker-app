import { Text, View, Pressable } from "react-native";

export default function BadgetPicker({
  budgets,
  selectedBudget,
  setSelectedBudget,
  disabled = false,
}) {
  const inactiveBadge = "bg-dodger-blue-300 border border-dodger-blue-400";
  const activeBadge =
    "bg-dodger-blue-100 border-dodger-blue-600 border-2 shadow-lg shadow-white";

  return (
    <View className="flex-row mb-2 flex-wrap">
      <Pressable
        disabled={disabled}
        className={
          `justify-center mt-2 mr-2 rounded-xl ` +
          (selectedBudget === null ? activeBadge : inactiveBadge)
        }
        onPress={() => setSelectedBudget(null)}
      >
        <Text className="text-center p-2">Sin presupuesto</Text>
      </Pressable>
      {budgets.map((budget) => (
        <Pressable
          disabled={disabled}
          key={budget.id}
          className={
            `justify-center mt-2 mr-2 rounded-xl ` +
            (selectedBudget === budget.id ? activeBadge : inactiveBadge)
          }
          onPress={() => setSelectedBudget(budget.id)}
        >
          <Text className="text-center p-2">{budget.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}
