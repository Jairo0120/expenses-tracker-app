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
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        setSelectedSaving(saving);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {saving.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(saving.val_saving.toString())}
        </Text>
      </View>
      {saving.is_recurrent_saving && (
        <RecurrentIcon color="#81c1f8" size={20} />
      )}
      <View className="flex-1 items-end justify-center">
        {saving.is_recurrent_saving && (
          <Text
            className={
              `text-sm font-semibold ` +
              (saving.budget !== null
                ? "text-dodger-blue-300"
                : "text-persian-red-400")
            }
          >
            Ahorro recurrente
          </Text>
        )}
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(saving.date_saving)}
        </Text>
      </View>
    </StyledPressable>
  );
}
