import { View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import SignIn from "./sign-in";

export default function Index() {
  const { user, isLoading } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  return (
    <View className="items-center justify-center flex-1">
      {isLoading && <ActivityIndicator />}
      {!isLoading && loggedIn && <Redirect href="/app" />}
      {!isLoading && !loggedIn && <SignIn />}
    </View>
  );
}
