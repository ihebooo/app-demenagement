import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import StepIndicator from "../../components/StepIndicator";

const Contact = ({ route }) => {
  const navigation = useNavigation();

  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    tel: "",
    date: new Date(),
    message: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || clientInfo.date;
    setShowDatePicker(false);
    setClientInfo({ ...clientInfo, date: currentDate });
  };

  const goToNextStep = () => {
    // Logic to proceed to the next step
  };

  const goToPreviousStep = () => {
    navigation.goBack();
  };

  const renderSummaryItem = ({ item }) => (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryItemText}>
        {item.label}: {item.value}
      </Text>
    </View>
  );

  // Sample data for summary, replace with actual data from previous steps
  const summaryData = route?.params?.summaryData || [
    { id: "1", label: "Adresse de Départ", value: "Sahloul" },
    { id: "2", label: "Adresse d'Arrivée", value: "Khezama" },
    { id: "3", label: "Meubles", value: "Buffet, Bureau" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StepIndicator currentStep={3} />
      <ScrollView
        contentContainerStyle={styles.formContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Client Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom Prenom"
          placeholderTextColor="#888"
          value={clientInfo.name}
          onChangeText={(text) => setClientInfo({ ...clientInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={clientInfo.email}
          onChangeText={(text) => setClientInfo({ ...clientInfo, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tel"
          placeholderTextColor="#888"
          value={clientInfo.tel}
          onChangeText={(text) => setClientInfo({ ...clientInfo, tel: text })}
        />
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerButtonText}>
            {clientInfo.date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={clientInfo.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message"
          placeholderTextColor="#888"
          value={clientInfo.message}
          onChangeText={(text) =>
            setClientInfo({ ...clientInfo, message: text })
          }
          multiline
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={goToPreviousStep}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={goToNextStep}
          >
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary of Selected Information</Text>
        <FlatList
          data={summaryData}
          renderItem={renderSummaryItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#4f46e5",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
  },
  datePickerButton: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  datePickerButtonText: {
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "90%",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 5,
  },
  previousButton: {
    backgroundColor: "#ccc",
  },
  nextButton: {
    backgroundColor: "#4f46e5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryContainer: {
    marginTop: 20,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  summaryItem: {
    marginBottom: 10,
  },
  summaryItemText: {
    fontSize: 16,
  },
});

export default Contact;
