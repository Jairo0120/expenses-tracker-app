// `EXPO_ANDROID_APP_VARIANT` is set by npm scripts via dotenv-cli:
// `dotenv -e .env.dev -e .env` or `dotenv -e .env.release -e .env` (see package.json).
const basePackage = "com.jldev.expensestrackerapp";
const baseName = "Expenses Tracker"
const baseSlug = "expenses-tracker-app"
const variant = process.env.EXPO_ANDROID_APP_VARIANT;

const androidPackage =
  variant === "dev" ? `${basePackage}.dev` : basePackage;
const androidName =
  variant === "dev" ? `(DEV) ${baseName}` : baseName
const slug =
  variant === "dev" ? `${baseSlug}-dev` : baseSlug

module.exports = {
  expo: {
    name: androidName,
    slug: slug,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    scheme: "expensestracker",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.jldev.expensestrackerapp",
    },
    android: {
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: androidPackage,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "react-native-auth0",
        {
          domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN
        },
      ],
      "expo-font",
    ],
  },
};

