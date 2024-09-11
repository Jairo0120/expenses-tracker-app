import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import CustomDrawerContent from "../../components/CustomDrawerContent";

export default function AppLayout() {
  const { user, isLoading } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!loggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer
        screenOptions={{
          headerTintColor: "#3da1f3",
          drawerStyle: {
            backgroundColor: "#0a2647",
            width: 200,
          },
        }}
        initialRouteName="index"
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerBackground: () => (
              <View style={{ backgroundColor: "black", flex: 1 }} />
            ),
            drawerLabelStyle: { color: "white" },
            drawerLabel: "Gastos",
            drawerActiveTintColor: "#bcdcfb",
            headerTitle: "Gastos",
            headerTitleAlign: "left",
          }}
        />
        <Drawer.Screen
          name="incomes"
          options={{
            headerBackground: () => (
              <View style={{ backgroundColor: "black", flex: 1 }} />
            ),
            drawerLabelStyle: { color: "white" },
            drawerLabel: "Ingresos",
            drawerActiveTintColor: "#81c1f8",
            headerTitle: "Ingresos",
            headerTitleAlign: "left",
          }}
        />
        <Drawer.Screen
          name="savings"
          options={{
            headerBackground: () => (
              <View style={{ backgroundColor: "black", flex: 1 }} />
            ),
            drawerLabelStyle: { color: "white" },
            drawerLabel: "Resumen ahorros",
            drawerActiveTintColor: "#81c1f8",
            headerTitle: "Resumen ahorros",
            headerTitleAlign: "left",
          }}
        />
        <Drawer.Screen
          name="individual-savings"
          options={{
            headerBackground: () => (
              <View style={{ backgroundColor: "black", flex: 1 }} />
            ),
            drawerLabelStyle: { color: "white" },
            drawerLabel: "Ahorros",
            drawerActiveTintColor: "#81c1f8",
            headerTitle: "Ahorros",
            headerTitleAlign: "left",
          }}
        />
      </Drawer>
      <FlashMessage position="bottom" />
    </GestureHandlerRootView>
  );
}
