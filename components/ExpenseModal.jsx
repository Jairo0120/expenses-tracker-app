import { Modal, Text, View, Pressable, ActivityIndicator } from "react-native";
import { set, useForm, useWatch } from "react-hook-form";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { FormTextInput } from "./FormTextInput";
import { createExpense } from "../api/expenses";
import { useAuth } from "../contexts/TokenContext";
import { getBudgets } from "../api/catalogs";
import { formatMoney } from "../helpers/utils";
import { showMessage } from "react-native-flash-message";
import BadgetPicker from "./BadgetPicker";

const StyledPressable = styled(Pressable);

export default function ExpenseModal({
  visible,
  setVisible,
  setRefreshExpenses,
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
  const { token } = useAuth();
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
      const response = await createExpense(token, {
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
    if (watchTotal !== "") {
      setTotalFormated(formatMoney(watchTotal));
    }
  }, [watchTotal]);

  useEffect(() => {
    getBudgets(token)
      .then((response) => {
        if (response.status === 200) {
          setBudgets(response.data);
        } else {
          console.error(response.data);
          showMessage({
            message: "No se pudieron cargar los presupuestos",
            type: "danger",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        showMessage({
          message: "No se pudieron cargar los presupuestos",
          type: "danger",
        });
      });
  }, [token]);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View className="flex-1 mx-5 justify-center">
        <View className="bg-white px-5 rounded-tl-xl rounded-tr-xl py-3">
          {formEnabled || <ActivityIndicator size="large" color="#c98b1e" />}
          <Text className="text-sm font-bold">Total del gasto</Text>
          <FormTextInput
            className={
              `w-full h-12 text-sm border rounded-xl pl-5 ` +
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
          <Text className="text-sm font-bold mb-4">
            {totalFormated || "$ 0,00"}
          </Text>
          <Text className="text-sm font-bold">Descripción del gasto</Text>
          <FormTextInput
            className={
              `w-full h-12 text-sm border rounded-xl pl-5 ` +
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
          <Text className="text-sm font-bold mt-4">Categoría</Text>
          <BadgetPicker
            budgets={budgets}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            disabled={!formEnabled}
          />
        </View>
        <View className="flex-row border-t border-gray-400">
          <StyledPressable
            onPress={() => setVisible(!visible)}
            className={`flex-1 bg-red-300 justify-center rounded-bl-xl
              border-r border-gray-400 py-3 active:bg-red-400`}
          >
            <Text className="text-center font-bold text-sm">Cancelar</Text>
          </StyledPressable>
          <StyledPressable
            className={`flex-1 bg-green-100 justify-center border-r
              border-gray-400 py-3 active:bg-green-200`}
            disabled={!formEnabled}
            onPress={handleSubmit(async (data) => {
              await onSubmit(data);
            })}
          >
            <Text className="text-center text-sm font-bold">Guardar</Text>
          </StyledPressable>
          <StyledPressable
            className={`flex-1 bg-green-100 justify-center
              rounded-br-xl py-3 active:bg-green-200`}
            disabled={!formEnabled}
            onPress={handleSubmit(async (data) => {
              await onSubmit(data);
              setVisible(true);
            })}
          >
            <Text className="text-center text-sm font-bold">Crear otro</Text>
          </StyledPressable>
        </View>
      </View>
    </Modal>
  );
}
