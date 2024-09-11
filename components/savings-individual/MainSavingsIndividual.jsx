import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { SavingIndividualContext } from "../../contexts/SavingIndividualContext";
import { SavingIndividualModalVisibleContext } from "../../contexts/SavingIndividualModalVisibleContext";
import SavingIndividualModal from "./SavingIndividualModal";
import SavingIndividualList from "./SavingIndividualList";

const StyledPressable = styled(Pressable);

export default function MainSavingsIndividual() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshSavings, setRefreshSavings] = useState(true);
  const [selectedSaving, setSelectedSaving] = useState(null);

  return (
    <SavingIndividualContext.Provider
      value={{ selectedSaving, setSelectedSaving }}
    >
      <SavingIndividualModalVisibleContext.Provider
        value={{ modalVisible, setModalVisible }}
      >
        <View className="content-start">
          <SavingIndividualModal setRefreshSavings={setRefreshSavings} />
          <SavingIndividualList
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
      </SavingIndividualModalVisibleContext.Provider>
    </SavingIndividualContext.Provider>
  );
}
