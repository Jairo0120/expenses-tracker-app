import { View } from "react-native";

export function Screen({ children }) {
  return (
    <View style={{ backgroundColor: "#171717" }} className="flex-1 pt-4">
      {children}
    </View>
  );
}
