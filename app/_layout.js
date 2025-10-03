import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import * as SystemUI from "expo-system-ui";
import { SQLiteProvider } from "expo-sqlite";
// import { drizzle } from "drizzle-orm/expo-sqlite";
// import { migrate } from "drizzle-orm/expo-sqlite/migrator";
// import * as schema from "../db/schema";

async function createDbIfNeeded(db) {
  // Initialize Drizzle
  // const drizzleDb = drizzle(db, { schema });
  // Create tables using Drizzle migrations
  // try {
  //   await migrate(drizzleDb, { migrationsFolder: "./db/migrations" });
  //   console.log("Database migrated successfully");
  // } catch (error) {
  //   console.log(
  //     "Migration error (this is normal for first run):",
  //     error.message,
  //   );
  //   // Create tables manually if migrations don't exist yet
  //   await db.execAsync(`CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     amount REAL,
  //     date TEXT,
  //     category TEXT,
  //     description TEXT,
  //     image TEXT
  //   )`);
  //   await db.execAsync(`CREATE TABLE IF NOT EXISTS expenses (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     val_expense REAL NOT NULL,
  //     description TEXT,
  //     date_expense TEXT NOT NULL,
  //     budget_id INTEGER,
  //     create_recurrent_expense INTEGER,
  //     cycle_id INTEGER
  //   )`);
  //   await db.execAsync(`CREATE TABLE IF NOT EXISTS incomes (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     val_income REAL NOT NULL,
  //     description TEXT,
  //     date_income TEXT NOT NULL,
  //     create_recurrent_income INTEGER,
  //     cycle_id INTEGER
  //   )`);
  //   await db.execAsync(`CREATE TABLE IF NOT EXISTS savings (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     val_saving REAL NOT NULL,
  //     description TEXT,
  //     date_saving TEXT NOT NULL,
  //     create_recurrent_saving INTEGER,
  //     cycle_id INTEGER
  //   )`);
  //   await db.execAsync(`CREATE TABLE IF NOT EXISTS budgets (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL,
  //     amount REAL NOT NULL,
  //     description TEXT,
  //     color TEXT
  //   )`);
  // await db.execAsync(`CREATE TABLE IF NOT EXISTS cycles (
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   name TEXT NOT NULL,
  //   start_date TEXT NOT NULL,
  //   end_date TEXT NOT NULL,
  //   description TEXT
  // )`);
  // }
  // console.log("Database initialized successfully");
}

export default function Root() {
  SystemUI.setBackgroundColorAsync("black");
  return (
    // <SQLiteProvider databaseName="db_expenses" onInit={createDbIfNeeded}>
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
    >
      <Slot />
    </Auth0Provider>
    // </SQLiteProvider>
  );
}
