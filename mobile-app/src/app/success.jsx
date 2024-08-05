import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Success = () => {
  const navigation = useNavigation();

  const goHome = () => {
    navigation.navigate("index");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.message}>
        Your request has been submitted successfully.
      </Text>
      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4f46e5",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  button: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: "#4f46e5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Success;
