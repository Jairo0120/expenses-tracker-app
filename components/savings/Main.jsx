import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { SavingContext } from "../../contexts/savings/SavingContext";
import { SavingModalVisibleContext } from "../../contexts/savings/SavingModalVisibleContext";
import SavingModal from "./SavingModal";
import SavingList from "./SavingList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshSavings, setRefreshSavings] = useState(true);
  const [selectedSaving, setSelectedSaving] = useState(null);
  return (
    <SavingContext.Provider value={{ selectedSaving, setSelectedSaving }}>
      <SavingModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <SavingModal setRefreshSavings={setRefreshSavings} />
          <SavingList
            refreshSavings={refreshSavings}
            setRefreshSavings={setRefreshSavings}
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
      </SavingModalVisibleContext.Provider>
    </SavingContext.Provider>
  );
}
