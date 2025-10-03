import { View, Button } from "react-native";
import { useEffect } from "react";
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
// import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
// import { drizzle } from "drizzle-orm/expo-sqlite";
// import * as schema from "../db/schema";

export default function Index() {
  const { isLoading, authorize, getCredentials, user } = useAuth0();
  const router = useRouter();
  // const db = useSQLiteContext();

  // Initialize Drizzle database instance
  // const drizzleDb = drizzle(db, { schema });

  // Pass the Drizzle database instance to the studio plugin
  // useDrizzleStudio(drizzleDb);

  const authorizer = async () => {
    console.log("index.js: authorizer");
    try {
      try {
        await getCredentials();
      } catch (e) {
        console.error(e);
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
        <>
          <Button onPress={authorizer} title="Iniciar sesión" />
          <View className="h-4" />
          <Button onPress={authorizer} title="Continuar offline" />
        </>
      )}
    </View>
  );
}
