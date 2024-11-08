import {
  Modal,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Switch,
} from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { styled } from "nativewind";

export default function FilterModal({ filterModalVisible }) {
  return (
    <View className="bg-black flex-1">
      <Modal
        transparent={true}
        visible={filterModalVisible}
        animationType="slide"
      >
        <View className="flex-1 mx-5 justify-center">
          <Text className="text-white text-center text-2xl mb-5">Prueb</Text>
        </View>
      </Modal>
    </View>
  );
}
