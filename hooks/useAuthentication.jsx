import { useAuth0 } from "react-native-auth0";

export default function useAuthentication() {
  const { getCredentials, authorize } = useAuth0();

  const getToken = async () => {
    const credentials = await getCredentials();
    if (credentials) {
      return credentials.accessToken;
    }
    return await authorize({
      audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      nonce: process.env.EXPO_PUBLIC_AUTH0_NONCE,
    }).accessToken;
  };

  return { getToken };
}
