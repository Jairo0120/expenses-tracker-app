import { Text, View, Pressable } from "react-native";

export default function BadgetPicker({
  budgets,
  selectedBudget,
  setSelectedBudget,
}) {
  return (
    <View className="flex-row mb-2 flex-wrap">
      <Pressable
        className={
          `justify-center mt-2 mr-2 rounded-xl ` +
          (selectedBudget === null
            ? "bg-gray-400 border-gray-600 border-2"
            : "bg-gray-200 border border-gray-400")
        }
        onPress={() => setSelectedBudget(null)}
      >
        <Text className="text-center p-2">Sin categoría</Text>
      </Pressable>
      {budgets.map((budget) => (
        <Pressable
          key={budget.id}
          className={
            `justify-center mt-2 mr-2 rounded-xl ` +
            (selectedBudget === budget.id
              ? "bg-orange-400 border-orange-600 border-2"
              : "bg-orange-200 border border-orange-400")
          }
          onPress={() => setSelectedBudget(budget.id)}
        >
          <Text className="text-center p-2">{budget.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}
