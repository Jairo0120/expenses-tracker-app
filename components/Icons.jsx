import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const PlusIcon = (props) => {
  return <FontAwesome name="plus-circle" size={50} color="white" {...props} />;
};

export const SignOutIcon = (props) => {
  return <FontAwesome name="sign-out" size={24} color="black" {...props} />;
};

export const MagnifyingGlassIcon = (props) => {
  return <FontAwesome name="search" size={24} color="black" {...props} />;
};

export const RecurrentIcon = (props) => {
  return <FontAwesome name="retweet" size={24} color="black" {...props} />;
};

export const SavingIcon = (props) => {
  return <FontAwesome6 name="piggy-bank" size={24} color="black" {...props} />;
};

export const HomeIcon = (props) => {
  return <FontAwesome name="home" size={24} color="black" {...props} />;
};
