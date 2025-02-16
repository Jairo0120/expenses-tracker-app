import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getRecurrentExpenses } from "../../api/expenses";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { RecurrentExpenseModalVisibleContext } from "../../contexts/recurrent-expenses/RecurrentExpenseModalVisibleContext";
import RecurrentExpenseCard from "./RecurrentExpenseCard";

export default function RecurrentExpenseList({
  refreshRecurrentExpenses,
  setRefreshRecurrentExpenses,
}) {
  const [recurrentExpenses, setRecurrentExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(RecurrentExpenseModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchRecurrentExpenses();
  };

  const loadMoreRecurrentExpenses = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchRecurrentExpenses(recurrentExpenses.length, recurrentExpenses);
  };

  const fetchRecurrentExpenses = async (skip = 0, initialExpenses = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getRecurrentExpenses(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los gastos recurrentes desde el API. Status: ${response.status}`,
        );
      }
      setRecurrentExpenses([...initialExpenses, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los gastos recurrentes",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshRecurrentExpenses) {
      setIsListEnd(false);
      setRefreshRecurrentExpenses(false);
      fetchRecurrentExpenses();
    }
  }, [refreshRecurrentExpenses, fetchRecurrentExpenses]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={recurrentExpenses}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(expense) => expense.id.toString()}
      renderItem={({ item }) => (
        <RecurrentExpenseCard recurrentExpense={item} />
      )}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más gastos recurrentes qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && recurrentExpenses.length === 0
            ? "No hay gastos recurrentes qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreRecurrentExpenses}
    />
  );
}
