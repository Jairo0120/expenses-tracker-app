import { Pressable, View } from "react-native";
import { PlusIcon } from "../Icons";
import { styled } from "nativewind";
import { useState } from "react";
import { SavingContext } from "../../contexts/savings/SavingContext";
import { SavingModalVisibleContext } from "../../contexts/savings/SavingModalVisibleContext";
import SavingIndividualModal from "./SavingIndividualModal";
import SavingIndividualList from "./SavingIndividualList";

const StyledPressable = styled(Pressable);

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshSavings, setRefreshSavings] = useState(true);
  const [selectedSaving, setSelectedSaving] = useState(null);

  return (
    <SavingContext.Provider
      value={{ selectedSaving, setSelectedSaving }}
    >
      <SavingModalVisibleContext.Provider
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
      </SavingModalVisibleContext.Provider>
    </SavingContext.Provider>
  );
}
