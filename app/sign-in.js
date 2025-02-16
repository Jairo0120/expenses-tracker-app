import { Button, View, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useEffect } from "react";

export default function SignIn() {
  const { authorize } = useAuth0();

  useEffect(() => {
    const authorizer = async () => {
      try {
        await authorize({
          audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
          nonce: process.env.EXPO_PUBLIC_AUTH0_NONCE,
        });
      } catch (e) {
        console.log(e);
      }
    };
    authorizer();
  }, []);

  const onPress = async () => {
    try {
      await authorize({
        audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
        nonce: process.env.EXPO_PUBLIC_AUTH0_NONCE,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="items-center justify-center flex-1">
      <Text className="mb-4 text-lg text-white">
        Por favor inicie sesión para continuar
      </Text>
      <Button onPress={onPress} title="Iniciar sesión" />
    </View>
  );
}
