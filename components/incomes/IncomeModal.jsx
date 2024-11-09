import {
  Modal,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Switch,
} from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { styled } from "nativewind";
import { useEffect, useState, useContext } from "react";
import { FormTextInput } from "../FormTextInput";
import { createIncome, updateIncome, deleteIncome } from "../../api/incomes";
import { formatMoney } from "../../helpers/utils";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { IncomeContext } from "../../contexts/incomes/IncomeContext";
import { IncomeModalVisibleContext } from "../../contexts/incomes/IncomeModalVisibleContext";
import { CycleContext } from "../../contexts/cycles/CycleContext";

const StyledPressable = styled(Pressable);

export default function IncomeModal({ setRefreshIncomes }) {
  const {
    control,
    handleSubmit,
    setFocus,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();
  const { selectedIncome, setSelectedIncome } = useContext(IncomeContext);
  const { modalVisible, setModalVisible } = useContext(
    IncomeModalVisibleContext,
  );
  const [totalFormated, setTotalFormated] = useState(null);
  const [formEnabled, setFormEnabled] = useState(true);
  const { getCredentials } = useAuth0();
  const { selectedCycle } = useContext(CycleContext);
  const watchTotal = useWatch({
    control,
    name: "total",
    defaultValue: "",
  });
  const resetFields = () => {
    setSelectedIncome(null);
    setTotalFormated(null);
    resetField("total");
    resetField("concept");
    setIsRecurrentIncomeEnabled(false);
  };
  const [isRecurrentIncomeEnabled, setIsRecurrentIncomeEnabled] =
    useState(false);
  const toggleSwitch = () =>
    setIsRecurrentIncomeEnabled((previousState) => !previousState);

  const onSubmitCreate = async (data) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await createIncome(credentials.accessToken, {
        val_income: data.total,
        description: data.concept.trim(),
        date_income: new Date().toISOString(),
        create_recurrent_income: isRecurrentIncomeEnabled,
        cycle_id: selectedCycle,
      });
      if (response.status === 201) {
        showMessage({
          message: "Ingreso registrado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshIncomes(true);
      } else {
        showMessage({
          message: "No se pudo registrar el ingreso",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo registrar el ingreso",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitUpdate = async (data, income_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await updateIncome(credentials.accessToken, {
        income_id: income_id,
        val_income: data.total,
        description: data.concept.trim(),
      });
      if (response.status === 200) {
        showMessage({
          message: "Ingreso actualizado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshIncomes(true);
      } else {
        showMessage({
          message: "No se pudo actualizar el ingreso",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo actualizar el ingreso",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitDelete = async (income_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await deleteIncome(credentials.accessToken, income_id);
      if (response.status === 200) {
        showMessage({
          message: "Ingreso eliminado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshIncomes(true);
      } else {
        showMessage({
          message: "No se pudo eliminar el ingreso",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo eliminar el ingreso",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setFocus("total");
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      resetFields();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (selectedIncome) {
      setValue("total", selectedIncome.val_income.toString());
      setValue("concept", selectedIncome.description);
    }
  }, [selectedIncome]);

  useEffect(() => {
    if (watchTotal !== "") {
      setTotalFormated(formatMoney(watchTotal));
    }
  }, [watchTotal]);

  return (
    <View className="bg-black flex-1">
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View className="flex-1 mx-5 justify-center">
          <View
            className={`rounded-xl bg-dodger-blue-950 shadow-xl
            shadow-white border border-dodger-blue-800`}
          >
            <View className="mx-4 mt-3">
              {formEnabled || (
                <ActivityIndicator size="large" color="#c98b1e" />
              )}
              <Text className="text-sm font-bold text-white">
                Total del ingreso
              </Text>
              <FormTextInput
                className={
                  `w-full h-12 text-sm border rounded-xl pl-5 text-white ` +
                  (errors.total ? "border-red-500" : "border-gray-400")
                }
                editable={formEnabled}
                control={control}
                keyboardType="numeric"
                enterKeyHint="next"
                name={"total"}
                blurOnSubmit={false}
                rules={{ required: true, pattern: /^[0-9.]+$/ }}
                onSubmitEditing={() => setFocus("concept")}
              />
              {errors.total && (
                <Text className="text-red-500">Campo numerico requerido.</Text>
              )}
              <Text className="text-sm font-bold text-white mb-4">
                {totalFormated || "$ 0,00"}
              </Text>
              <Text className="text-sm font-bold text-white">
                Descripción del ingreso
              </Text>
              <FormTextInput
                className={
                  `w-full h-12 text-sm border rounded-xl pl-5 text-white ` +
                  (errors.concept ? "border-red-500" : "border-gray-400")
                }
                control={control}
                enterKeyHint="done"
                editable={formEnabled}
                blurOnSubmit={false}
                name={"concept"}
                rules={{ required: true }}
              />
              {errors.concept && (
                <Text className="text-red-500">Campo requerido.</Text>
              )}
              {selectedIncome === null && (
                <View className="flex-row items-center">
                  <Text className="text-sm font-bold text-white mt-4">
                    ¿Ingreso mensual?
                  </Text>
                  <Switch
                    className="ml-1 mt-4"
                    trackColor={{ false: "#767577", true: "#bcdcfb" }}
                    thumbColor={
                      isRecurrentIncomeEnabled ? "#1d8eeb" : "#f4f3f4"
                    }
                    onValueChange={toggleSwitch}
                    value={isRecurrentIncomeEnabled}
                  />
                </View>
              )}
            </View>
            <View className="flex-row border-t mt-3">
              <StyledPressable
                onPress={() => setModalVisible(!modalVisible)}
                className={`flex-1 bg-dodger-blue-400 justify-center
                py-3 active:bg-dodger-blue-300 border-r
                rounded-bl-xl`}
              >
                <Text className="text-center font-bold text-sm text-black">
                  Cancelar
                </Text>
              </StyledPressable>
              {selectedIncome === null ? (
                <>
                  <StyledPressable
                    className={`flex-1 bg-dodger-blue-800 justify-center py-3
                active:bg-dodger-blue-600 border-r`}
                    disabled={!formEnabled}
                    onPress={handleSubmit(async (data) => {
                      await onSubmitCreate(data);
                    })}
                  >
                    <Text className="text-center text-sm font-bold text-white">
                      Guardar
                    </Text>
                  </StyledPressable>
                  <StyledPressable
                    className={`flex-1 bg-dodger-blue-800 justify-center
                active:bg-dodger-blue-600 rounded-br-xl`}
                    disabled={!formEnabled}
                    onPress={handleSubmit(async (data) => {
                      await onSubmitCreate(data);
                      setModalVisible(true);
                    })}
                  >
                    <Text className="text-center text-sm font-bold text-white">
                      Crear otro
                    </Text>
                  </StyledPressable>
                </>
              ) : (
                <>
                  <StyledPressable
                    className={`flex-1 bg-dodger-blue-800 justify-center py-3
                active:bg-dodger-blue-600 border-r`}
                    disabled={!formEnabled}
                    onPress={handleSubmit(async (data) => {
                      await onSubmitUpdate(data, selectedIncome.id);
                    })}
                  >
                    <Text className="text-center text-sm font-bold text-white">
                      Actualizar
                    </Text>
                  </StyledPressable>
                  <StyledPressable
                    className={`flex-1 bg-persian-red-800 justify-center py-3
                active:bg-persian-red-600 border-r`}
                    disabled={!formEnabled}
                    onPress={handleSubmit(async (data) => {
                      await onSubmitDelete(selectedIncome.id);
                    })}
                  >
                    <Text className="text-center text-sm font-bold text-white">
                      Eliminar
                    </Text>
                  </StyledPressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
