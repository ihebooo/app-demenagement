import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { key: 1, label: "Choose Meubles" },
    { key: 2, label: "Addresses" },
    { key: 3, label: "Client Details" },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step.key}>
          <View style={styles.step}>
            <View
              style={[
                styles.circle,
                currentStep >= step.key && styles.activeCircle,
              ]}
            >
              {currentStep > step.key && (
                <View style={styles.checkmark}>
                  <Text>✔</Text>
                </View>
              )}
              {currentStep === step.key && (
                <Text style={styles.stepNumber}>{step.key}</Text>
              )}
            </View>
            <Text style={styles.label}>{step.label}</Text>
          </View>
          {index < steps.length - 1 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 20,
  },
  step: {
    alignItems: "center",
    flexDirection: "column",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4f46e5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  activeCircle: {
    backgroundColor: "#4f46e5",
  },
  checkmark: {
    color: "#fff",
    backgroundColor: "#fff",
    borderRadius: "50%",
    fontWeight: "bold",
  },
  stepNumber: {
    color: "#4f46e5",
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#4f46e5",
  },
});

export default StepIndicator;
