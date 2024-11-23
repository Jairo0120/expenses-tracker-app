import { Header } from "@react-navigation/elements";
import { Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { BarsIcon } from "./Icons";
import ExpenseSummary from "./expenses/ExpenseSummary";

export default function MyHeader(options) {
  const navigation = useNavigation();
  return (
    <Header
      title={options.headerTitle}
      headerStyle={{
        backgroundColor: "#171717",
        height: 70,
      }}
      headerTintColor="#3da1f3"
      headerRight={() => <ExpenseSummary />}
      headerRightContainerStyle={{
        marginEnd: 20,
      }}
      headerShadowVisible={false}
      headerLeft={() => (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="pl-5"
        >
          <BarsIcon color="#3da1f3" size={20} />
        </Pressable>
      )}
    />
  );
}
