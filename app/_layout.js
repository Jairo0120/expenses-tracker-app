import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";

export default function Root() {
  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
    >
      <Slot />
    </Auth0Provider>
  );
}
