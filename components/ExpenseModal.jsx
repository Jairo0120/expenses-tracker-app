import { Modal, Text, View, Pressable, ActivityIndicator } from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { FormTextInput } from "./FormTextInput";
import { createExpense } from "../api/expenses";
import { getBudgets } from "../api/catalogs";
import { formatMoney } from "../helpers/utils";
import { showMessage } from "react-native-flash-message";
import { useAuth0 } from "react-native-auth0";
import BadgetPicker from "./BadgetPicker";

const StyledPressable = styled(Pressable);

export default function ExpenseModal({
  visible,
  setVisible,
  setRefreshExpenses,
  selectedExpense,
}) {
  const {
    control,
    handleSubmit,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm();
  const [totalFormated, setTotalFormated] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [formEnabled, setFormEnabled] = useState(true);
  const { getCredentials } = useAuth0();
  const watchTotal = useWatch({
    control,
    name: "total",
    defaultValue: "",
  });
  const resetFields = () => {
    setTotalFormated(null);
    setSelectedBudget(null);
    resetField("total");
    resetField("concept");
  };

  const onSubmit = async (data) => {
    setFormEnabled(false);
    try {
      const credentials = await getCredentials();
      const response = await createExpense(credentials.accessToken, {
        val_expense: data.total,
        description: data.concept.trim(),
        date_expense: new Date().toISOString(),
        budget_id: selectedBudget,
      });
      if (response.status === 201) {
        showMessage({
          message: "Gasto registrado",
          type: "success",
        });
        setVisible(false);
        setRefreshExpenses(true);
      } else {
        showMessage({
          message: "No se pudo registrar el gasto",
          type: "danger",
        });
        console.error(response.data);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "No se pudo registrar el gasto",
        type: "danger",
      });
    } finally {
      setFormEnabled(true);
    }
  };

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setFocus("total");
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (selectedExpense) {
      resetField("total", {
        defaultValue: selectedExpense.val_expense.toString(),
      });
      resetField("concept", { defaultValue: selectedExpense.description });
      setSelectedBudget(selectedExpense.budget?.id || null);
    }
  }, [selectedExpense]);

  useEffect(() => {
    if (watchTotal !== "") {
      setTotalFormated(formatMoney(watchTotal));
    }
  }, [watchTotal]);

  useEffect(() => {
    const loadBudgets = async () => {
      const credentials = await getCredentials();
      const response = await getBudgets(credentials.accessToken);
      if (response.status === 200) {
        setBudgets(response.data);
      } else {
        console.error(response.data);
        showMessage({
          message: "No se pudieron cargar los presupuestos",
          type: "danger",
        });
      }
    };
    loadBudgets().catch((error) => {
      console.error(error);
      showMessage({
        message: "No se pudieron cargar los presupuestos",
        type: "danger",
      });
    });
  }, [getCredentials]);

  return (
    <View className="bg-black flex-1">
      <Modal transparent={true} visible={visible} animationType="slide">
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
                Total del gasto
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
                Descripción del gasto
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
              <Text className="text-sm font-bold text-white mt-4">
                Presupuesto
              </Text>
              <BadgetPicker
                budgets={budgets}
                selectedBudget={selectedBudget}
                setSelectedBudget={setSelectedBudget}
                disabled={!formEnabled}
              />
            </View>
            <View className="flex-row border-t mt-3">
              <StyledPressable
                onPress={() => setVisible(!visible)}
                className={`flex-1 bg-dodger-blue-400 justify-center
                py-3 active:bg-dodger-blue-300 border-r
                rounded-bl-xl`}
              >
                <Text className="text-center font-bold text-sm text-black">
                  Cancelar
                </Text>
              </StyledPressable>
              <StyledPressable
                className={`flex-1 bg-dodger-blue-800 justify-center py-3
                active:bg-dodger-blue-600 border-r`}
                disabled={!formEnabled}
                onPress={handleSubmit(async (data) => {
                  await onSubmit(data);
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
                  await onSubmit(data);
                  setVisible(true);
                })}
              >
                <Text className="text-center text-sm font-bold text-white">
                  Crear otro
                </Text>
              </StyledPressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
