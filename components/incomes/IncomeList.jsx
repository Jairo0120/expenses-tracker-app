import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getIncomes } from "../../api/incomes";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { IncomeModalVisibleContext } from "../../contexts/IncomeModalVisibleContext";
import IncomeCard from "./IncomeCard";

export default function IncomeList({ refreshIncomes, setRefreshIncomes }) {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(IncomeModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchIncomes();
  };

  const loadMoreIncomes = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchIncomes(incomes.length, incomes);
  };

  const fetchIncomes = async (skip = 0, initialIncomes = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getIncomes(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ingresos desde el API. Status: ${response.status}`
        );
      }
      setIncomes([...initialIncomes, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los ingresos",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshIncomes) {
      setIsListEnd(false);
      setRefreshIncomes(false);
      fetchIncomes();
    }
  }, [refreshIncomes, fetchIncomes]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={incomes}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(income) => income.id.toString()}
      renderItem={({ item }) => <IncomeCard income={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más ingresos qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && incomes.length === 0
            ? "No hay ingresos qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreIncomes}
    />
  );
}
