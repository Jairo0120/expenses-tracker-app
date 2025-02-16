import { View, Text } from "react-native";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const { isLoading, authorize, getCredentials } = useAuth0();
  const router = useRouter();

  useEffect(() => {
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
        router.replace("/app/expenses");
      } catch (e) {
        console.error(e);
      }
    };
    if (!isLoading) {
      authorizer();
    }
  }, [isLoading]);

  return (
    <View className="items-center justify-center flex-1">
      {isLoading && <ActivityIndicator />}
    </View>
  );
}
