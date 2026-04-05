import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { getExpenses } from "../../api/expenses";
import { getBudgets } from "../../api/budgets";
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
import { useAuth0 } from "react-native-auth0";
import BadgetPicker from "./BadgetPicker";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function ExpenseList() {
  const { modalVisible } = useContext(ExpenseModalVisibleContext);
  const { setExpenseSummary } = useContext(ExpenseSummaryContext);
  const { cycleList } = useContext(CycleListContext);
  const { selectedCycle, setSelectedCycle } = useContext(CycleContext);
  const [isFocus, setIsFocus] = useState(false);
  const { reloadBudgets, setReloadBudgets } = useContext(ReloadBudgetsContext);
  const { getCredentials } = useAuth0();
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const queryClient = useQueryClient();

  const { status, data: budgetsData } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const credentials = await getCredentials();
      const response = await getBudgets(credentials.accessToken, selectedCycle);
      if (response.status !== 200) {
        console.error(response.data);
        throw new Error("No se pudieron cargar los presupuestos");
      }
      console.log("Budgets loaded.");
      return response.data;
    },
    enabled: !!selectedCycle,
  });

  const {
    data: expensesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingExpenses,
    refetch: refetchExpenses,
  } = useInfiniteQuery({
    queryKey: ["expenses", selectedCycle, selectedBudget],
    queryFn: async ({ pageParam = 0 }) => {
      const credentials = await getCredentials();
      const response = await getExpenses(credentials.accessToken, {
        limit: 10,
        skip: pageParam,
        ...(selectedCycle && { cycle_id: selectedCycle }),
        ...(selectedBudget !== null && { budget_id: selectedBudget }),
      });
      if (response.status !== 200) {
        console.error(response.data);
        throw new Error(
          `Error al obtener los gastos desde el API. Status: ${response.status}`,
        );
      }
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.flat().length;
    },
  });

  const { data: cycleStatusData } = useQuery({
    queryKey: ["cycleStatus", selectedCycle],
    queryFn: async () => {
      const credentials = await getCredentials();
      const response = await getCycleStatus(credentials.accessToken, {
        ...(selectedCycle && { cycle_id: selectedCycle }),
      });
      console.log("Called getCycleStatus");
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener el estado del ciclo desde el API. Status: ${response.status}`,
        );
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (cycleStatusData) setExpenseSummary(cycleStatusData);
  }, [cycleStatusData]);

  useEffect(() => {
    if (selectedCycle) setReloadBudgets(true);
  }, [selectedCycle]);

  useEffect(() => {
    if (status === "success") {
      setBudgets(budgetsData);
    }
    if (reloadBudgets) {
      setReloadBudgets(false);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    }
  }, [status, budgetsData, reloadBudgets]);

  const expenses = expensesData?.pages.flat() ?? [];

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

  return (
    <View className="flex-1 flex-col">
      <View className="mb-1 -mt-4 mx-3 flex-row items-center">
        <Dropdown
          style={[dropdownStyle.dropdown, isFocus && { borderColor: "blue" }]}
          className="basis-2/6 mr-3"
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
            setSelectedBudget(null);
            setSelectedCycle(item.value);
            setIsFocus(false);
          }}
        />
        <View className="flex-1">
          <BadgetPicker
            budgets={budgets}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            disabled={false}
          />
        </View>
      </View>
      <View className="flex-1">
        <FlatList
          className={`${modalVisible ? "opacity-10" : ""}`}
          data={expenses}
          onRefresh={refetchExpenses}
          refreshing={isLoadingExpenses}
          keyExtractor={(expense) => expense.id.toString()}
          renderItem={({ item }) => <ExpenseCard expense={item} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                size="small"
                color="#3da1f3"
                className="pb-10"
              />
            ) : (
              <Text className="text-white text-center pb-2">
                {!hasNextPage &&
                  expenses.length > 0 &&
                  "No hay más gastos qué mostrar"}
              </Text>
            )
          }
          ListEmptyComponent={
            <Text className="text-white text-center pt-2">
              {!isLoadingExpenses && expenses.length === 0
                ? "No hay gastos qué mostrar"
                : ""}
            </Text>
          }
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
        />
      </View>
    </View>
  );
}
