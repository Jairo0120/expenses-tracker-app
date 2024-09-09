import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../helpers/utils";
import { SavingContext } from "../contexts/SavingContext";
import { SavingModalVisibleContext } from "../contexts/SavingModalVisibleContext";
import { styled } from "nativewind";
import { RecurrentIcon } from "./Icons";

const StyledPressable = styled(Pressable);

export default function SavingCard({ saving }) {
  const { setSelectedSaving } = useContext(SavingContext);
  const { setModalVisible } = useContext(SavingModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-col bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        console.log("Pressed saving", saving);
        // setSelectedSaving(saving);
        // setModalVisible(true);
      }}
    >
      <Text className="text-lg font-semibold text-dodger-blue-300">
        {saving.is_recurrent_saving && (
          <RecurrentIcon color="#81c1f8" size={20} />
        )}{" "}
        {saving.description}
      </Text>
      <View className="flex-row items-center">
        <View className="flex-1 items-end mr-2">
          <Text className="text-sm font-semibold text-dodger-blue-400">
            Este mes
          </Text>
          <Text className="text-dodger-blue-100 text-xl">
            {formatMoney(saving.total_last_month.toString())}
          </Text>
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-sm font-semibold text-dodger-blue-400">
            Totalizado
          </Text>
          <Text className="text-dodger-blue-100 text-xl">
            {formatMoney(saving.total_global.toString())}
          </Text>
        </View>
      </View>
    </StyledPressable>
  );
}
