import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import * as SystemUI from "expo-system-ui";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import initDb from "../db/init-db";

const db = openDatabaseSync("db_expenses.db");

export default function Root() {
  SystemUI.setBackgroundColorAsync("black");
  useDrizzleStudio(db);
  return (
    <SQLiteProvider databaseName="db_expenses.db" onInit={initDb}>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
      >
        <Slot />
      </Auth0Provider>
    </SQLiteProvider>
  );
}
