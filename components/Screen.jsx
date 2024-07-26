import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export function Screen({ children, statusBarStyle = "auto" }) {
  return (
    <View className="flex-1 bg-black pt-4">
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
}
