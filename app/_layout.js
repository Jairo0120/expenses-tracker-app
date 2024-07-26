import { View, Pressable, Text } from "react-native";
import { Stack, Link } from "expo-router";

export default function Layout() {
  return (
    <View className="flex-1 bg-black">
      <Stack>
        <Stack.Screen name="index" options={{}} />
      </Stack>
    </View>
  );
}
