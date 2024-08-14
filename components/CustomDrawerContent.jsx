import { View, Pressable, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { styled } from "nativewind";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MagnifyingGlassIcon, SignOutIcon } from "./Icons";

const StyledPressable = styled(Pressable);

const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledPressable
      onPress={onPress}
      className={`bg-red-500 text-white p-2 text-center m-4
        rounded-lg flex-row items-center justify-center active:bg-red-700`}
    >
      <SignOutIcon />
      <Text className="text-sm font-bold ml-1">Cerrar sesión</Text>
    </StyledPressable>
  );
};

export default function CustomDrawerContent(props) {
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="p-2 flex-row items-center">
          <MagnifyingGlassIcon color="white" size={20} />
          <Text className="text-lg py-3 ml-1 font-bold text-white">
            Expenses Tracker
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <LogoutButton />
    </View>
  );
}
