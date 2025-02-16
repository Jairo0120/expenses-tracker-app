import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import MyHeader from "../../components/header";
import { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";
import { CycleListContext } from "../../contexts/cycles/CycleListContext";
import { getCycleList } from "../../api/cycles";
import { showMessage } from "react-native-flash-message";
import { formatShortDate } from "../../helpers/utils";
import { QueryClient } from "@tanstack/react-query";
import { DevToolsBubble } from "react-native-react-query-devtools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import useAuthentication from "../../hooks/useAuthentication";

const queryClient = new QueryClient();
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function AppLayout() {
  const [expenseSummary, setExpenseSummary] = useState({
    totalExpenses: 0,
    moneyAvailable: 0,
  });
  const [cycleList, setCycleList] = useState([]);
  const { getToken } = useAuthentication();

  const fetchCycleList = async () => {
    try {
      const token = await getToken();
      if (!token) {
        return;
      }
      const response = await getCycleList(token);
      if (response.status !== 200) {
        throw new Error(
          `Error al obtener la lista de ciclos desde el API. Status: ${response.status}`,
        );
      }
      setCycleList(
        response.data.map((x) => ({
          label: formatShortDate(x.start_date),
          value: x.id,
        })),
      );
    } catch (error) {
      showMessage({
        message: "Error al obtener el estado del ciclo",
        type: "danger",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCycleList();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <ExpenseSummaryContext.Provider
        value={{ expenseSummary, setExpenseSummary }}
      >
        <CycleListContext.Provider value={{ cycleList, setCycleList }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Drawer
              screenOptions={{
                drawerStyle: {
                  backgroundColor: "#0a2647",
                  width: 200,
                },
                header: ({ options, navigation }) => (
                  <MyHeader {...options} navigation={navigation} />
                ),
              }}
              initialRouteName="expenses/(tabs)"
              drawerContent={CustomDrawerContent}
            >
              <Drawer.Screen
                name="expenses/(tabs)"
                options={{
                  drawerLabelStyle: { color: "white" },
                  drawerLabel: "Gastos",
                  drawerActiveTintColor: "#bcdcfb",
                  headerTitle: "Gastos",
                }}
              />
              <Drawer.Screen
                name="incomes/(tabs)"
                options={{
                  drawerLabelStyle: { color: "white" },
                  drawerLabel: "Ingresos",
                  drawerActiveTintColor: "#81c1f8",
                  headerTitle: "Ingresos",
                }}
              />
              <Drawer.Screen
                name="savings/(tabs)"
                options={{
                  drawerLabelStyle: { color: "white" },
                  drawerLabel: "Ahorros",
                  drawerActiveTintColor: "#81c1f8",
                  headerTitle: "Ahorros",
                }}
              />
            </Drawer>
            {/* <DevToolsBubble /> */}
            <FlashMessage position="bottom" />
          </GestureHandlerRootView>
        </CycleListContext.Provider>
      </ExpenseSummaryContext.Provider>
    </PersistQueryClientProvider>
  );
}
