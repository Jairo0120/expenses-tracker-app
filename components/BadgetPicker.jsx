import { Text, View, Pressable } from "react-native";

export default function BadgetPicker({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <View className="flex-row mb-2 flex-wrap">
      <Pressable
        className={
          `justify-center mt-2 mr-2 rounded-xl ` +
          (selectedCategory === null
            ? "bg-gray-400 border-gray-600 border-2"
            : "bg-gray-200 border border-gray-400")
        }
        onPress={() => setSelectedCategory(null)}
      >
        <Text className="text-center p-2">Sin categoría</Text>
      </Pressable>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          className={
            `justify-center mt-2 mr-2 rounded-xl ` +
            (selectedCategory === category.id
              ? "bg-orange-400 border-orange-600 border-2"
              : "bg-orange-200 border border-orange-400")
          }
          onPress={() => setSelectedCategory(category.id)}
        >
          <Text className="text-center p-2">{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
