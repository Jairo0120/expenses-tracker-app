import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";

export default function Layout() {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "Expenses Tracker",
          headerTintColor: "#c98b1e",
        }}
      />
      <FlashMessage position="top" />
    </View>
  );
}
