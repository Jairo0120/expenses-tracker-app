import { Modal, Text, View, TextInput, Pressable } from "react-native";
import { styled } from "nativewind";
import { useRef, useEffect, useState } from "react";
import BadgetPicker from "./BadgetPicker";

const StyledPressable = styled(Pressable);

export default function AddExpense({ visible, setVisible, categories = [] }) {
  const conceptInput = useRef(null);
  const totalInput = useRef(null);
  const [totalFormated, setTotalFormated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (visible) {
      setTotalFormated(null);
      setSelectedCategory(null);
      const timeout = setTimeout(() => {
        totalInput.current?.blur();
        totalInput.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View className="flex-1 mx-5 justify-center">
        <View className="bg-white px-5 rounded-tl-xl rounded-tr-xl py-3">
          <Text className="text-sm font-bold">Total del gasto</Text>
          <TextInput
            className={`w-full h-12 text-sm border
              border-gray-400 rounded-xl pl-5`}
            keyboardType="numeric"
            enterKeyHint="next"
            onChangeText={(text) => {
              const cleanedText = text.replace(/[^0-9]/g, "");
              setTotalFormated(
                Number(cleanedText).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
              );
            }}
            ref={totalInput}
            blurOnSubmit={false}
            onSubmitEditing={() => conceptInput.current.focus()}
          />
          <Text className="text-sm font-bold mb-4">
            {totalFormated || "$ 0.00"}
          </Text>
          <Text className="text-sm font-bold">Descripción del gasto</Text>
          <TextInput
            className={`w-full h-12 text-sm border
              border-gray-400 rounded-xl mb-4 pl-5`}
            enterKeyHint="done"
            blurOnSubmit={false}
            ref={conceptInput}
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
