import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { SavingContext } from "../../contexts/savings/SavingContext";
import { SavingModalVisibleContext } from "../../contexts/savings/SavingModalVisibleContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";
import SavingModal from "./SavingModal";
import SavingList from "./SavingList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshSavings, setRefreshSavings] = useState(true);
  const [selectedSaving, setSelectedSaving] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);

  return (
    <SavingContext.Provider value={{ selectedSaving, setSelectedSaving }}>
      <SavingModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <CycleContext.Provider value={{ selectedCycle, setSelectedCycle }}>
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
            <PlusIcon
              size={60}
              color="#81c1f8"
              style={!modalVisible ? {} : { opacity: 0.1 }}
            />
          </StyledPressable>
        </CycleContext.Provider>
      </SavingModalVisibleContext.Provider>
    </SavingContext.Provider>
  );
}
