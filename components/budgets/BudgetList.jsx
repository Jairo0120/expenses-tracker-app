import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getRecurrentBudgets } from "../../api/budgets";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { BudgetModalVisibleContext } from "../../contexts/budgets/BudgetModalVisibleContext";
import BudgetCard from "./BudgetCard";

export default function BudgetList({ refreshBudgets, setRefreshBudgets }) {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(BudgetModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchBudgets();
  };

  const loadMoreBudgets = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchBudgets(budgets.length, budgets);
  };

  const fetchBudgets = async (skip = 0, initialBudgets = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getRecurrentBudgets(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los presupuestos desde el API. Status: ${response.status}`
        );
      }
      setBudgets([...initialBudgets, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los presupuestos",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshBudgets) {
      setIsListEnd(false);
      setRefreshBudgets(false);
      fetchBudgets();
    }
  }, [refreshBudgets, fetchBudgets]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={budgets}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(budget) => budget.id.toString()}
      renderItem={({ item }) => <BudgetCard budget={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más presupuestos qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && budgets.length === 0
            ? "No hay presupuestos qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreBudgets}
    />
  );
}
