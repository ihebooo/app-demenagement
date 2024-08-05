import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import StepIndicator from "../../components/StepIndicator";
import InvoiceTable from "../../components/InvoiceTable";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { globalState } from "../../utils/atom";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoaderWithOverlay from "../../components/common/looding";
const Contact = ({ route }) => {
  const navigation = useNavigation();
  const [gState, setgState] = useRecoilState(globalState);

  console.log({ gState });

  const [clientMeubles, setClientMeubles] = useState([]);
  const [isLooding, setIsLooding] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    nom_prenom: "",
    email: "",
    tel: "",
    date: new Date().toISOString(), // Ensure date is a string
    message: "",
  });
  const [clientFormErrors, setClientFormErrors] = useState({
    nom_prenom: false,
    email: false,
    tel: false,
    date: false,
    message: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadClientMeubles = async () => {
      const storedMeubles = await AsyncStorage.getItem("meubles");
      if (storedMeubles) {
        setClientMeubles(JSON.parse(storedMeubles));
      }
    };
    loadClientMeubles();
  }, []);

  useEffect(() => {
    const loadClientInfo = async () => {
      const storedClientForm = await AsyncStorage.getItem("clientForm");
      if (storedClientForm) {
        const parsedClientForm = JSON.parse(storedClientForm);
        setClientInfo(parsedClientForm);
      }
    };
    loadClientInfo();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setClientInfo({ ...clientInfo, date: currentDate.toISOString() });
  };

  const validateForm = () => {
    const form = clientInfo;
    let formErrors = { ...clientFormErrors };
    let formValid = true;

    for (const key in form) {
      if (form[key].length < 2 && key !== "message") {
        formErrors[key] = true;
        formValid = false;
      } else {
        formErrors[key] = false;
      }
    }

    setClientFormErrors(formErrors);
    return formValid;
  };

  const goToNextStep = async () => {
    setIsLooding(true);
    if (validateForm()) {
      const updatedGState = {
        meubles: clientMeubles,
        form_client: clientInfo,
        form_address: {
          dep: {
            type: "Depart",
            ...gState.form_address.dep,
          },
          arr: {
            type: "Arrivee",
            ...gState.form_address.arr,
          },
        },
      };

      setgState(updatedGState);

      await AsyncStorage.setItem("clientForm", JSON.stringify(clientInfo));

      try {
        const response = await api.post("/api/post-request", updatedGState);
        console.log("Response:", response);

        if (response.status) {
          console.log("Success response:", response);

          // Clear stored data
          await AsyncStorage.removeItem("departAddress");
          await AsyncStorage.removeItem("arriveeAddress");
          await AsyncStorage.removeItem("clientForm");
          await AsyncStorage.removeItem("meubles");
          await AsyncStorage.removeItem("currentStep");

          // Reset global state
          setgState({
            meubles: null,
            form_address: null,
            form_client: null,
          });

          // Navigate to success screen
          navigation.navigate("success");
          setIsLooding(false);
        } else {
          setIsLooding(false);

          console.error("Failed to submit request:", response.data.message);
          throw new Error("Failed to submit request: " + response.data.message);
        }
      } catch (error) {
        setIsLooding(false);

        console.error("Error submitting client info:", error);
        console.error(
          "Error details:",
          error.response?.data || error.message || error
        );
      }
    } else {
      console.error("Please fill in all required fields.");
    }
  };

  const goToPreviousStep = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLooding && <LoaderWithOverlay />}
      <StepIndicator currentStep={3} />
      <ScrollView
        contentContainerStyle={styles.formContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Client Form</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              clientFormErrors.nom_prenom && styles.errorInput,
            ]}
            placeholder="Nom Prenom"
            placeholderTextColor="#888"
            value={clientInfo.nom_prenom}
            onChangeText={(text) =>
              setClientInfo({ ...clientInfo, nom_prenom: text })
            }
          />
          {clientFormErrors.nom_prenom && (
            <Text style={styles.errorText}>
              Please provide a valid nom_prenom.
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, clientFormErrors.email && styles.errorInput]}
            placeholder="Email"
            placeholderTextColor="#888"
            value={clientInfo.email}
            onChangeText={(text) =>
              setClientInfo({ ...clientInfo, email: text })
            }
          />
          {clientFormErrors.email && (
            <Text style={styles.errorText}>Please provide a valid email.</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, clientFormErrors.tel && styles.errorInput]}
            placeholder="Tel"
            placeholderTextColor="#888"
            value={clientInfo.tel}
            onChangeText={(text) => setClientInfo({ ...clientInfo, tel: text })}
          />
          {clientFormErrors.tel && (
            <Text style={styles.errorText}>Please provide a valid tel.</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerButtonText}>
              {new Date(clientInfo.date).toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(clientInfo.date)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {clientFormErrors.date && (
            <Text style={styles.errorText}>Please provide a valid date.</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
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
        </View>

        <InvoiceTable data={{ ...gState, meubles: clientMeubles }} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={goToPreviousStep}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={goToNextStep}
          >
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  inputContainer: {
    marginBottom: 16,
    width: "90%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
  },
  datePickerButton: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
  },
});

export default Contact;
