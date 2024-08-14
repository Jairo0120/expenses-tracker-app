import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getExpenses } from "../api/expenses";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ refreshExpenses, setRefreshExpenses }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { authorize, getCredentials } = useAuth0();

  const refresh = async () => {
    setIsListEnd(false);
    fetchExpenses();
  };

  const loadMoreExpenses = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchExpenses(expenses.length, expenses);
  };

  const fetchExpenses = async (skip = 0, initialExpenses = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getExpenses(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los gastos desde el API. Status: ${response.status}`
        );
      }
      setExpenses([...initialExpenses, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los gastos",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshExpenses) {
      setIsListEnd(false);
      setRefreshExpenses(false);
      fetchExpenses();
    }
  }, [refreshExpenses]);

  return (
    <FlatList
      data={expenses}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(expense) => expense.id.toString()}
      renderItem={({ item }) => <ExpenseCard expense={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más gastos qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && expenses.length === 0
            ? "No hay gastos qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreExpenses}
    />
  );
}
