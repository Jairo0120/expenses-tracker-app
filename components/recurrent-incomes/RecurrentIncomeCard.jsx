import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../../helpers/utils";
import { RecurrentIncomeContext } from "../../contexts/recurrent-incomes/RecurrentIncomeContext";
import { RecurrentIncomeModalVisibleContext } from "../../contexts/recurrent-incomes/RecurrentIncomeModalVisibleContext";
import { styled } from "nativewind";
import { CheckIcon, RemoveIcon } from "../Icons";

const StyledPressable = styled(Pressable);

export default function RecurrentIncomeCard({ recurrentIncome }) {
  const { setSelectedRecurrentIncome } = useContext(RecurrentIncomeContext);
  const { setModalVisible } = useContext(RecurrentIncomeModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        setSelectedRecurrentIncome(recurrentIncome);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {recurrentIncome.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(recurrentIncome.val_income.toString())}
        </Text>
      </View>
      <View className="flex-1 items-end">
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(recurrentIncome.created_at)}
        </Text>
        {recurrentIncome.enabled ? (
          <Text className="text-dodger-blue-500 text-sm">
            Habilitado
            <CheckIcon size={20} color="#81c1f8" />
          </Text>
        ) : (
          <Text className="text-gray-500 text-sm">
            Deshabilitado
            <RemoveIcon size={20} color="#6b7280" />
          </Text>
        )}
      </View>
    </StyledPressable>
  );
}
