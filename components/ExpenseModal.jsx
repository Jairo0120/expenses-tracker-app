import { Modal, Text, View, Pressable } from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import BadgetPicker from "./BadgetPicker";
import { FormTextInput } from "./FormTextInput";

const StyledPressable = styled(Pressable);

export default function AddExpense({ visible, setVisible, categories = [] }) {
  const { control, handleSubmit, setFocus, resetField } = useForm();
  const [totalFormated, setTotalFormated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const watchTotal = useWatch({
    control,
    name: "total",
    defaultValue: "",
  });
  const onSubmit = (data) => {
    console.log(data);
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setFocus("total");
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTotalFormated(null);
      setSelectedCategory(null);
      resetField("total");
      resetField("concept");
    }
  }, [visible, setFocus, resetField]);

  useEffect(() => {
    if (watchTotal !== "") {
      const cleanedText = watchTotal.replace(/[^0-9]/g, "");
      setTotalFormated(
        Number(cleanedText).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })
      );
    }
  }, [watchTotal]);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View className="flex-1 mx-5 justify-center">
        <View className="bg-white px-5 rounded-tl-xl rounded-tr-xl py-3">
          <Text className="text-sm font-bold">Total del gasto</Text>
          <FormTextInput
            className={`w-full h-12 text-sm border
              border-gray-400 rounded-xl pl-5`}
            control={control}
            keyboardType="numeric"
            enterKeyHint="next"
            name={"total"}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus("concept")}
          />
          <Text className="text-sm font-bold mb-4">
            {totalFormated || "$ 0,00"}
          </Text>
          <Text className="text-sm font-bold">Descripción del gasto</Text>
          <FormTextInput
            className={`w-full h-12 text-sm border
              border-gray-400 rounded-xl mb-4 pl-5`}
            control={control}
            enterKeyHint="done"
            blurOnSubmit={false}
            name={"concept"}
          />
          <Text className="text-sm font-bold">Categoría</Text>
          <BadgetPicker
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </View>
        <View className="flex-row border-t border-gray-400">
          <StyledPressable
            onPress={() => setVisible(!visible)}
            className={`flex-1 bg-red-300 justify-center rounded-bl-xl
              border-r border-gray-400 py-3 active:opacity-50`}
          >
            <Text className="text-center font-bold text-sm">Cancelar</Text>
          </StyledPressable>
          <StyledPressable
            className={`flex-1 bg-green-100 justify-center border-r
              border-gray-400 py-3 active:opacity-50`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center text-sm font-bold">Guardar</Text>
          </StyledPressable>
          <StyledPressable
            className={`flex-1 bg-green-100 justify-center
              rounded-br-xl py-3 active:opacity-50`}
          >
            <Text className="text-center text-sm font-bold">Crear otro</Text>
          </StyledPressable>
        </View>
      </View>
    </Modal>
  );
}
