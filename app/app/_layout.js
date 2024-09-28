import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { StatusBar } from "expo-status-bar";
import { MyHeader } from "./header";
import { useState } from "react";
import FlashMessage from "react-native-flash-message";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import { ExpenseSummaryContext } from "../../contexts/expenses/ExpenseSummaryContext";

export default function AppLayout() {
  const { user, isLoading } = useAuth0();
  const loggedIn = user !== undefined && user !== null;
  const [expenseSummary, setExpenseSummary] = useState({
    totalExpenses: 0,
    moneyAvailable: 0,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!loggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <ExpenseSummaryContext.Provider
      value={{ expenseSummary, setExpenseSummary }}
    >
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
        <FlashMessage position="bottom" />
      </GestureHandlerRootView>
    </ExpenseSummaryContext.Provider>
  );
}
