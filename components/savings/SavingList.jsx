import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getSavings } from "../../api/savings";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { formatShortDate } from "../../helpers/utils";
import { SavingModalVisibleContext } from "../../contexts/savings/SavingModalVisibleContext";
import { CycleListContext } from "../../contexts/cycles/CycleListContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import SavingCard from "./SavingCard";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function SavingList({ refreshSavings, setRefreshSavings }) {
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(SavingModalVisibleContext);
  const { cycleList } = useContext(CycleListContext);
  const { selectedCycle, setSelectedCycle } = useContext(CycleContext);
  const [isFocus, setIsFocus] = useState(false);

  const dropdownStyle = StyleSheet.create({
    itemText: {
      fontSize: 14,
      paddingVertical: 0,
    },
    dropdown: {
      height: 35,
      borderColor: "gray",
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: "white",
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

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
        ...(selectedCycle && { cycle_id: selectedCycle }),
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ahorros desde el API. Status: ${response.status}`,
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
    refresh();
  }, [selectedCycle]);

  useEffect(() => {
    if (refreshSavings) {
      setIsListEnd(false);
      setRefreshSavings(false);
      fetchSavings();
    }
  }, [refreshSavings, fetchSavings]);

  return (
    <View className="flex-col">
      <View className="mb-3 mx-3 flex-row">
        <Dropdown
          style={[dropdownStyle.dropdown, isFocus && { borderColor: "blue" }]}
          className="basis-2/6"
          selectedTextStyle={dropdownStyle.selectedTextStyle}
          inputSearchStyle={dropdownStyle.inputSearchStyle}
          itemTextStyle={dropdownStyle.itemText}
          itemContainerStyle={{ padding: 0, height: 55 }}
          data={cycleList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Buscar..."
          placeholder={formatShortDate(new Date())}
          placeholderStyle={dropdownStyle.placeholderStyle}
          value={selectedCycle}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedCycle(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View>
        <FlatList
          className={`${modalVisible ? "opacity-10" : ""} mb-36`}
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
      </View>
    </View>
  );
}
