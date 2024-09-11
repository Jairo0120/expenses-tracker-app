import { Tabs } from "expo-router";
import {
  SavingIcon,
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
          title: "Resumen",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          headerShown: false,
          title: "Ahorros",
          tabBarIcon: ({ color }) => <SavingIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recurrent-savings"
        options={{
          headerShown: false,
          title: "Ahorros recurrentes",
          tabBarIcon: ({ color }) => <RecurrentIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
