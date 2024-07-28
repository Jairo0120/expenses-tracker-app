import { View, Pressable, Text } from "react-native";
import { Stack, Link } from "expo-router";

export default function Layout() {
  return (
    <View className="flex-1 bg-black">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "Expenses Tracker",
          headerTintColor: "#c98b1e",
        }}
      />
    </View>
  );
}
