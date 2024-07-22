import { Text, View } from "tamagui";

export default function ModalScreen({ text }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>{text}</Text>
    </View>
  );
}
