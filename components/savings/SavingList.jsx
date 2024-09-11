import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getSavings } from "../../api/savings";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { SavingModalVisibleContext } from "../../contexts/savings/SavingModalVisibleContext";
import SavingCard from "./SavingCard";

export default function SavingList({ refreshSavings, setRefreshSavings }) {
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(SavingModalVisibleContext);

  const refresh = async () => {
    setIsListEnd(false);
    fetchSavings();
  };

  const loadMoreSavings = async () => {
    if (isListEnd || isLoading) {
      return;
    }
    fetchSavings(savings.length, savings);
  };

  const fetchSavings = async (skip = 0, initialSavings = []) => {
    setIsLoading(true);
    try {
      const credentials = await getCredentials();
      const response = await getSavings(credentials.accessToken, {
        limit: 10,
        skip: skip,
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ahorros desde el API. Status: ${response.status}`
        );
      }
      setSavings([...initialSavings, ...response.data]);
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
    if (refreshSavings) {
      setIsListEnd(false);
      setRefreshSavings(false);
      fetchSavings();
    }
  }, [refreshSavings, fetchSavings]);

  return (
    <FlatList
      className={`${modalVisible ? "opacity-10" : ""}`}
      data={savings}
      onRefresh={refresh}
      refreshing={isLoading}
      keyExtractor={(saving) => saving.id.toString()}
      renderItem={({ item }) => <SavingCard saving={item} />}
      ListFooterComponent={
        <Text className="text-white text-center pb-2">
          {isListEnd && "No hay más ahorros qué mostrar"}
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-white text-center pt-2">
          {!isLoading && savings.length === 0
            ? "No hay ahorros qué mostrar"
            : ""}
        </Text>
      }
      onEndReachedThreshold={0.2}
      onEndReached={loadMoreSavings}
    />
  );
}
