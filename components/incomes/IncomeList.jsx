import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getIncomes } from "../../api/incomes";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { IncomeModalVisibleContext } from "../../contexts/incomes/IncomeModalVisibleContext";
import IncomeCard from "./IncomeCard";
import { CycleListContext } from "../../contexts/cycles/CycleListContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import { formatShortDate } from "../../helpers/utils";
import { Dropdown } from "react-native-element-dropdown";
import { View, StyleSheet } from "react-native";

export default function IncomeList({ refreshIncomes, setRefreshIncomes }) {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { getCredentials } = useAuth0();
  const { modalVisible } = useContext(IncomeModalVisibleContext);
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
        ...(selectedCycle && { cycle_id: selectedCycle }),
      });
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener los ingresos desde el API. Status: ${response.status}`,
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
    refresh();
  }, [selectedCycle]);

  useEffect(() => {
    if (refreshIncomes) {
      setIsListEnd(false);
      setRefreshIncomes(false);
      fetchIncomes();
    }
  }, [refreshIncomes, fetchIncomes]);

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
      </View>
    </View>
  );
}
