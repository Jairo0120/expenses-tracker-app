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
import {
  createRecurrentIncome,
  updateRecurrentIncome,
  deleteRecurrentIncome,
} from "../../api/incomes";
import { formatMoney } from "../../helpers/utils";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { RecurrentIncomeContext } from "../../contexts/recurrent-incomes/RecurrentIncomeContext";
import { RecurrentIncomeModalVisibleContext } from "../../contexts/recurrent-incomes/RecurrentIncomeModalVisibleContext";

const StyledPressable = styled(Pressable);

export default function RecurrentIncomeModal({ setRefreshRecurrentIncomes }) {
  const {
    control,
    handleSubmit,
    setFocus,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();
  const { selectedRecurrentIncome, setSelectedRecurrentIncome } = useContext(
    RecurrentIncomeContext
  );
  const { modalVisible, setModalVisible } = useContext(
    RecurrentIncomeModalVisibleContext
  );
  const [totalFormated, setTotalFormated] = useState(null);
  const [formEnabled, setFormEnabled] = useState(true);
  const { getCredentials } = useAuth0();
  const watchTotal = useWatch({
    control,
    name: "total",
    defaultValue: "",
  });
  const resetFields = () => {
    setSelectedRecurrentIncome(null);
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
      const response = await createRecurrentIncome(credentials.accessToken, {
        val_income: data.total,
        description: data.concept.trim(),
      });
      if (response.status === 201) {
        showMessage({
          message: "Ingreso recurrente registrado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshRecurrentIncomes(true);
      } else {
        showMessage({
          message: "No se pudo registrar el ingreso recurrente",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo registrar el ingreso recurrente",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitUpdate = async (data, recurrent_income_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await updateRecurrentIncome(credentials.accessToken, {
        recurrent_income_id: recurrent_income_id,
        val_income: data.total,
        description: data.concept.trim(),
        enabled: isRecurrentIncomeEnabled,
      });
      if (response.status === 200) {
        showMessage({
          message: "Ingreso recurrente actualizado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshRecurrentIncomes(true);
      } else {
        showMessage({
          message: "No se pudo actualizar el ingreso recurrente",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo actualizar el ingreso recurrente",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitDelete = async (recurrent_income_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await deleteRecurrentIncome(
        credentials.accessToken,
        recurrent_income_id
      );
      if (response.status === 200) {
        showMessage({
          message: "Ingreso recurrente eliminado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshRecurrentIncomes(true);
      } else {
        showMessage({
          message: "No se pudo eliminar el ingreso recurrente",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo eliminar el ingreso recurrente",
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
    if (selectedRecurrentIncome) {
      setValue("total", selectedRecurrentIncome.val_income.toString());
      setValue("concept", selectedRecurrentIncome.description);
      setIsRecurrentIncomeEnabled(selectedRecurrentIncome.enabled);
    }
  }, [selectedRecurrentIncome]);

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
              {selectedRecurrentIncome !== null && (
                <View className="flex-row items-center">
                  <Text className="text-sm font-bold text-white mt-4">
                    ¿Habilitado?
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
              {selectedRecurrentIncome === null ? (
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
                      await onSubmitUpdate(data, selectedRecurrentIncome.id);
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
                      await onSubmitDelete(selectedRecurrentIncome.id);
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
