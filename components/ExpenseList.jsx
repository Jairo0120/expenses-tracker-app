import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getExpenses } from "../api/expenses";
import { useAuth } from "../contexts/TokenContext";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ refreshExpenses, setRefreshExpenses }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await getExpenses(token, {});
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (refreshExpenses) {
      setRefreshExpenses(false);
      fetchExpenses();
    }
  }, [refreshExpenses]);

  return (
    <FlatList
      data={expenses}
      onRefresh={fetchExpenses}
      refreshing={loading}
      keyExtractor={(expense) => expense.id.toString()}
      renderItem={({ item }) => <ExpenseCard expense={item} />}
    />
  );
}
