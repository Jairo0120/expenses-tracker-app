import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getRecurrentSavings } from "../../api/savings";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { RecurrentSavingModalVisibleContext } from "../../contexts/recurrent-savings/RecurrentSavingModalVisibleContext";
import RecurrentSavingCard from "./RecurrentSavingCard";

export default function RecurrentSavingList({
  refreshRecurrentSavings,
  setRefreshRecurrentSavings,
}) {
  const [recurrentSavings, setRecurrentSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(RecurrentSavingModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchRecurrentSavings();
  };

  const loadMoreSavings = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchRecurrentSavings(recurrentSavings.length, recurrentSavings);
  };

  const fetchRecurrentSavings = async (skip = 0, initialSavings = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getRecurrentSavings(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ahorros desde el API. Status: ${response.status}`,
        );
      }
      setRecurrentSavings([...initialSavings, ...response.data]);
      if (!response.data.length || response.data.length < 10) {
        setIsListEnd(true);
      }
    } catch (error) {
      showMessage({
        message: "Error al obtener los ahorros",
        type: "danger",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshRecurrentSavings) {
      setIsListEnd(false);
      setRefreshRecurrentSavings(false);
      fetchRecurrentSavings();
    }
  }, [refreshRecurrentSavings, fetchRecurrentSavings]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={recurrentSavings}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(recurrentSaving) => recurrentSaving.id.toString()}
      renderItem={({ item }) => <RecurrentSavingCard recurrentSaving={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más ahorros qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && recurrentSavings.length === 0
            ? "No hay ahorros qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreSavings}
    />
  );
}
