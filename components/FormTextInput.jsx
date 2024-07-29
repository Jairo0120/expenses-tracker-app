import { TextInput } from "react-native";
import { Controller } from "react-hook-form";

export const FormTextInput = ({ name, control, ...props }) => (
  <Controller
    control={control}
    render={({ field: { onChange, value, ref } }) => {
      return (
        <TextInput {...props} onChangeText={onChange} value={value} ref={ref} />
      );
    }}
    name={name}
    rules={{ required: true }}
  />
);
