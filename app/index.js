import { Pressable } from "react-native";
import { Link } from "expo-router";
import { PlusIcon } from "../components/Icons";
import { Screen } from "../components/Screen";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function Index() {
  return (
    <Screen>
      <Link asChild href="/auth">
        <StyledPressable className="absolute right-5 bottom-5 active:opacity-50">
          <PlusIcon size={60} />
        </StyledPressable>
      </Link>
    </Screen>
  );
}
