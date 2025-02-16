import { View, Button } from "react-native";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const { isLoading, authorize, getCredentials, user } = useAuth0();
  const router = useRouter();

  const authorizer = async () => {
    console.log("index.js: authorizer");
    try {
      const currentCredentials = await getCredentials();
      if (!currentCredentials) {
        await authorize({
          audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
          nonce: process.env.EXPO_PUBLIC_AUTH0_NONCE,
          scope: "openid profile email offline_access",
        });
      }
      const newCredentials = await getCredentials();
      if (newCredentials) {
        router.replace("/app/expenses");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      authorizer();
    }
  }, [isLoading]);

  return (
    <View className="items-center justify-center flex-1">
      {isLoading && <ActivityIndicator />}
      {!isLoading && (user == null || user !== undefined) && (
        <Button onPress={authorizer} title="Iniciar sesión" />
      )}
    </View>
  );
}
