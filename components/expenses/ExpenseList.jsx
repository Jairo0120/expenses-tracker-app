import { useContext, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { getExpenses } from "../../api/expenses";
import { showMessage } from "react-native-flash-message";
import { ExpenseModalVisibleContext } from "../../contexts/expenses/ExpenseModalVisibleContext";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";
import { CycleListContext } from "../../contexts/cycles/CycleListContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import { getCycleStatus } from "../../api/cycles";
import { formatShortDate } from "../../helpers/utils";
import ExpenseCard from "./ExpenseCard";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ReloadBudgetsContext } from "../../contexts/budgets/ReloadBudgetsContext";
import useAuthentication from "../../hooks/useAuthentication";

export default function ExpenseList({ refreshExpenses, setRefreshExpenses }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const { modalVisible } = useContext(ExpenseModalVisibleContext);
  const { setExpenseSummary } = useContext(ExpenseSummaryContext);
  const { cycleList } = useContext(CycleListContext);
  const { selectedCycle, setSelectedCycle } = useContext(CycleContext);
  const [isFocus, setIsFocus] = useState(false);
  const { setReloadBudgets } = useContext(ReloadBudgetsContext);
  const { getToken } = useAuthentication();

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
    fetchExpenses();
    fetchCycleStatus();
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
      const token = await getToken();
      if (!token) {
        return;
      }
      console.log("Calling getExpenses with token", token);
      const response = await getExpenses(token, {
        limit: 10,
        skip: skip,
        ...(selectedCycle && { cycle_id: selectedCycle }),
      });
      console.log("Called getExpenses");
      if (response.status !== 200) {
        console.error(response.data);
        throw new Error(
          `Error al obtener los gastos desde el API. Status: ${response.status}`,
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

  const fetchCycleStatus = async () => {
    try {
      const token = await getToken();
      if (!token) {
        return;
      }
      console.log("Calling getCycleStatus with token", token);
      const response = await getCycleStatus(token, {
        ...(selectedCycle && { cycle_id: selectedCycle }),
      });
      console.log("Called getCycleStatus");
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener el estado del ciclo desde el API. Status: ${response.status}`,
        );
      }
      setExpenseSummary(response.data);
    } catch (error) {
      showMessage({
        message: "Error al obtener el estado del ciclo",
        type: "danger",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    refresh();
    setReloadBudgets(true);
  }, [selectedCycle]);

  useEffect(() => {
    if (refreshExpenses) {
      setIsListEnd(false);
      setRefreshExpenses(false);
      fetchExpenses();
      fetchCycleStatus();
    }
  }, [refreshExpenses, fetchExpenses]);

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
      </View>
    </View>
  );
}
