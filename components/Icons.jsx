import { FontAwesome } from "@expo/vector-icons";

export const PlusIcon = (props) => {
  return <FontAwesome name="plus-circle" size={50} color="white" {...props} />;
};

export const SignOutIcon = (props) => {
  return <FontAwesome name="sign-out" size={24} color="black" {...props} />;
};

export const MagnifyingGlassIcon = (props) => {
  return <FontAwesome name="search" size={24} color="black" {...props} />;
};
