import { Tabs } from "expo-router";
import {
  ExpenseIcon,
  RecurrentIcon,
  BudgetIcon,
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
          title: "Gastos",
          tabBarIcon: ({ color }) => <ExpenseIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recurrent-expenses"
        options={{
          headerShown: false,
          title: "Gastos recurrentes",
          tabBarIcon: ({ color }) => <RecurrentIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          headerShown: false,
          title: "Presupuestos",
          tabBarIcon: ({ color }) => <BudgetIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
