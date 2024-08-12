import { Pressable, Button } from "react-native";
import { PlusIcon } from "../components/Icons";
import { Screen } from "../components/Screen";
import { styled } from "nativewind";
import { useState } from "react";
import ExpenseModal from "../components/ExpenseModal";
import ExpenseList from "../components/ExpenseList";
import { useAuth0, Auth0Provider } from "react-native-auth0";

const StyledPressable = styled(Pressable);

const LoginButton = () => {
  const { authorize } = useAuth0();

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

  return <Button onPress={onPress} title="Log in" />;
};

const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log out" />;
};

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshExpenses, setRefreshExpenses] = useState(true);

  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
    >
      <Screen>
        <LoginButton />
        <LogoutButton />
        <ExpenseModal
          visible={modalVisible}
          setVisible={setModalVisible}
          setRefreshExpenses={setRefreshExpenses}
        />
        <ExpenseList
          refreshExpenses={refreshExpenses}
          setRefreshExpenses={setRefreshExpenses}
        />
        <StyledPressable
          className="absolute right-5 bottom-5 active:opacity-50"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <PlusIcon size={60} color="#c98b1e" />
        </StyledPressable>
      </Screen>
    </Auth0Provider>
  );
}
