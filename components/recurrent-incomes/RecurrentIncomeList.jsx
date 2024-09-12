import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getRecurrentIncomes } from "../../api/incomes";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { RecurrentIncomeModalVisibleContext } from "../../contexts/recurrent-incomes/RecurrentIncomeModalVisibleContext";
import RecurrentIncomeCard from "./RecurrentIncomeCard";

export default function RecurrentIncomeList({
  refreshRecurrentIncomes,
  setRefreshRecurrentIncomes,
}) {
  const [recurrentIncomes, setRecurrentIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(RecurrentIncomeModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchRecurrentIncomes();
  };

  const loadMoreRecurrentIncomes = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchRecurrentIncomes(recurrentIncomes.length, recurrentIncomes);
  };

  const fetchRecurrentIncomes = async (skip = 0, initialIncomes = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getRecurrentIncomes(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ingresos recurrentes desde el API. Status: ${response.status}`
        );
      }
      setRecurrentIncomes([...initialIncomes, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los ingresos recurrentes",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshRecurrentIncomes) {
      setIsListEnd(false);
      setRefreshRecurrentIncomes(false);
      fetchRecurrentIncomes();
    }
  }, [refreshRecurrentIncomes, fetchRecurrentIncomes]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={recurrentIncomes}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(income) => income.id.toString()}
      renderItem={({ item }) => <RecurrentIncomeCard recurrentIncome={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más ingresos recurrentes qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && recurrentIncomes.length === 0
            ? "No hay ingresos recurrentes qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreRecurrentIncomes}
    />
  );
}
