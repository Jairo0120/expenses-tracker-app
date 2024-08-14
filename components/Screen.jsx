import { View } from "react-native";

export function Screen({ children }) {
  return <View className="bg-black flex-1 pt-4">{children}</View>;
}
