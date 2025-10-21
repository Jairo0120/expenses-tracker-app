import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { getBudgets } from "../../api/budgets";
import { showMessage } from "react-native-flash-message";

export default function BudgetHorizontalList({
  selectedCycle,
  selectedBudget,
  setSelectedBudget,
}) {
  const { getCredentials } = useAuth0();
  const [budgets, setBudgets] = useState([]);
  const inactiveBadge = "bg-dodger-blue-300 border border-dodger-blue-400";
  const activeBadge =
    "bg-dodger-blue-100 border-dodger-blue-600 border-2 shadow-lg shadow-white";

  const fetchBudgetsList = async () => {
    try {
      const credentials = await getCredentials();
      const response = await getBudgets(credentials.accessToken, selectedCycle);
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener el la lista de budgets desde el API. Status: ${response.status}`,
        );
      }
      setBudgets(response.data);
    } catch (error) {
      showMessage({
        message: "Error al obtener la lista de budgets",
        type: "danger",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBudgetsList();
  }, [selectedCycle]);

  return (
    <View className="flex-row mb-2 flex-wrap">
      <Pressable
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
