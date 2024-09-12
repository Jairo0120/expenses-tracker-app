import { Tabs } from "expo-router";
import {
  MoneyIcon,
  RecurrentIcon,
  HomeIcon,
} from "../../../../components/Icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3da1f3",
        tabBarInactiveBackgroundColor: "black",
        tabBarActiveBackgroundColor: "black",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Ingresos",
          tabBarIcon: ({ color }) => <MoneyIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recurrent-incomes"
        options={{
          headerShown: false,
          title: "Ingresos recurrentes",
          tabBarIcon: ({ color }) => <RecurrentIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
