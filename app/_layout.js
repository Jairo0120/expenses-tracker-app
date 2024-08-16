import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import * as SystemUI from "expo-system-ui";

export default function Root() {
  SystemUI.setBackgroundColorAsync("black");
  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
    >
      <Slot />
    </Auth0Provider>
  );
}
