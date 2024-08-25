import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { formatMoney, formatDate } from "../helpers/utils";
import { IncomeContext } from "../contexts/IncomeContext";
import { IncomeModalVisibleContext } from "../contexts/IncomeModalVisibleContext";
import { styled } from "nativewind";
import { RecurrentIcon } from "./Icons";

const StyledPressable = styled(Pressable);

export default function IncomeCard({ income }) {
  const { setSelectedIncome } = useContext(IncomeContext);
  const { setModalVisible } = useContext(IncomeModalVisibleContext);

  return (
    <StyledPressable
      className={`flex-row bg-dodger-blue-950 p-4
        rounded-lg shadow-md mb-4 mx-3
        items-center
        active:bg-dodger-blue-900`}
      onPress={() => {
        setSelectedIncome(income);
        setModalVisible(true);
      }}
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-dodger-blue-300">
          {income.description}
        </Text>
        <Text className="text-dodger-blue-100 text-xl">
          {formatMoney(income.val_income.toString())}
        </Text>
      </View>
      {income.is_recurrent_income && (
        <RecurrentIcon color="#81c1f8" size={20} />
      )}
      <View className="flex-1 items-end justify-center">
        {income.is_recurrent_income && (
          <Text
            className={
              `text-sm font-semibold ` +
              (income.budget !== null
                ? "text-dodger-blue-300"
                : "text-persian-red-400")
            }
          >
            Ingreso recurrente
          </Text>
        )}
        <Text className="text-dodger-blue-500 text-xs">
          {formatDate(income.date_income)}
        </Text>
      </View>
    </StyledPressable>
  );
}
