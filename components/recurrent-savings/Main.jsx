import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { RecurrentSavingContext } from "../../contexts/recurrent-savings/RecurrentSavingContext";
import { RecurrentSavingModalVisibleContext } from "../../contexts/recurrent-savings/RecurrentSavingModalVisibleContext";
import RecurrentSavingModal from "./RecurrentSavingModal";
import RecurrentSavingList from "./RecurrentSavingList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshRecurrentSavings, setRefreshRecurrentSavings] = useState(true);
  const [selectedRecurrentSaving, setSelectedRecurrentSaving] = useState(null);

  return (
    <RecurrentSavingContext.Provider
      value={{ selectedRecurrentSaving, setSelectedRecurrentSaving }}
    >
      <RecurrentSavingModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <RecurrentSavingModal
            setRefreshRecurrentSavings={setRefreshRecurrentSavings}
          />
          <RecurrentSavingList
            refreshRecurrentSavings={refreshRecurrentSavings}
            setRefreshRecurrentSavings={setRefreshRecurrentSavings}
          />
        </View>
        <StyledPressable
          className="absolute right-5 bottom-5 active:opacity-50"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm shadow-blue-500/30 p-3">
            <PlusIcon
              size={50}
              color="white"
              style={!modalVisible ? {} : { opacity: 0.1 }}
            />
          </View>
        </StyledPressable>
      </RecurrentSavingModalVisibleContext.Provider>
    </RecurrentSavingContext.Provider>
  );
}
