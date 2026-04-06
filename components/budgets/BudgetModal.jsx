import {
  Modal,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { useEffect, useState, useContext } from "react";
import { FormTextInput } from "../FormTextInput";
import {
  createRecurrentBudget,
  updateRecurrentBudget,
  deleteRecurrentBudget,
} from "../../api/budgets";
import {
  formatMoneyInputDisplay,
  parseMoneyInputText,
} from "../../helpers/utils";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import { BudgetContext } from "../../contexts/budgets/BudgetContext";
import { BudgetModalVisibleContext } from "../../contexts/budgets/BudgetModalVisibleContext";
import { ReloadBudgetsContext } from "../../contexts/budgets/ReloadBudgetsContext";

const StyledPressable = styled(Pressable);

export default function BudgetModal({ setRefreshBudgets }) {
  const {
    control,
    handleSubmit,
    setFocus,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();
  const { selectedBudget, setSelectedBudget } = useContext(BudgetContext);
  const { modalVisible, setModalVisible } = useContext(
    BudgetModalVisibleContext,
  );
  const { setReloadBudgets } = useContext(ReloadBudgetsContext);
  const [formEnabled, setFormEnabled] = useState(true);
  const { getCredentials } = useAuth0();
  const resetFields = () => {
    setSelectedBudget(null);
    resetField("total");
    resetField("concept");
  };

  const onSubmitCreate = async (data) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await createRecurrentBudget(credentials.accessToken, {
        val_budget: data.total,
        description: data.concept.trim(),
      });
      if (response.status === 201) {
        showMessage({
          message: "Presupuesto registrado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshBudgets(true);
        setReloadBudgets(true);
      } else {
        showMessage({
          message: "No se pudo registrar el presupuesto",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo registrar el presupuesto",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitUpdate = async (data, budget_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await updateRecurrentBudget(credentials.accessToken, {
        budget_id: budget_id,
        val_budget: data.total,
        description: data.concept.trim(),
      });
      if (response.status === 200) {
        showMessage({
          message: "Presupuesto actualizado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshBudgets(true);
        setReloadBudgets(true);
      } else {
        showMessage({
          message: "No se pudo actualizar el presupuesto",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo actualizar el presupuesto",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  const onSubmitDelete = async (budget_id) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await deleteRecurrentBudget(
        credentials.accessToken,
        budget_id,
      );
      if (response.status === 200) {
        showMessage({
          message: "Presupuesto eliminado",
          type: "success",
        });
        setModalVisible(false);
        setRefreshBudgets(true);
        setReloadBudgets(true);
      } else {
        showMessage({
          message: "No se pudo eliminar el presupuesto",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo eliminar el presupuesto",
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
    if (selectedBudget) {
      setValue("total", selectedBudget.val_budget.toString());
      setValue("concept", selectedBudget.description);
    }
  }, [selectedBudget]);

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
                Total del presupuesto
              </Text>
              <Controller
                control={control}
                name="total"
                rules={{ required: true, pattern: /^[0-9.]+$/ }}
                render={({ field: { onChange, value, ref } }) => (
                  <TextInput
                    ref={ref}
                    className={
                      `w-full h-12 text-sm border rounded-xl pl-5 text-white ` +
                      (errors.total ? "border-red-500" : "border-gray-400")
                    }
                    editable={formEnabled}
                    keyboardType="numeric"
                    enterKeyHint="next"
                    blurOnSubmit={false}
                    placeholder="$ 0,00"
                    placeholderTextColor="#9ca3af"
                    value={formatMoneyInputDisplay(value)}
                    onChangeText={(text) => onChange(parseMoneyInputText(text))}
                    onSubmitEditing={() => setFocus("concept")}
                  />
                )}
              />
              {errors.total && (
                <Text className="text-red-500">Campo numerico requerido.</Text>
              )}
              <Text className="text-sm font-bold text-white mt-4">
                Descripción del presupuesto
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
              {selectedBudget === null ? (
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
                      await onSubmitUpdate(data, selectedBudget.id);
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
                      await onSubmitDelete(selectedBudget.id);
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
