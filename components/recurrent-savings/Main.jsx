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
          <PlusIcon
            size={60}
            color="#81c1f8"
            style={!modalVisible ? {} : { opacity: 0.1 }}
          />
        </StyledPressable>
      </RecurrentSavingModalVisibleContext.Provider>
    </RecurrentSavingContext.Provider>
  );
}
