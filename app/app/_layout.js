import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useAuth0 } from "react-native-auth0";
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
            drawerLabel: "Gastos",
            title: "Gastos",
            headerTitleAlign: "center",
          }}
        />
      </Drawer>
      <FlashMessage position="bottom" />
    </GestureHandlerRootView>
  );
}
