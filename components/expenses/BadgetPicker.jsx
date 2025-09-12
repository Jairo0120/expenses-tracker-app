import { Text, View, Pressable, ScrollView } from "react-native";

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
        <Pressable
          disabled={disabled}
          className={
            `justify-center mt-2 mr-2 rounded-xl ` +
            (selectedBudget === null ? activeBadge : inactiveBadge)
          }
          onPress={() => setSelectedBudget(null)}
        >
          <Text className="text-center p-2">N/A</Text>
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
    </ScrollView>
  );
}
