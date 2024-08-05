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
import { countryList } from "../../utils/countryList";
import { useRecoilState } from "recoil";
import { globalState } from "../../utils/atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";

const Address = () => {
  const [departAddress, setDepartAddress] = useState({
    type: "Depart",
    rue: "",
    code_postal: "",
    ville: "",
    pays: "",
  });
  const [arriveeAddress, setArriveeAddress] = useState({
    type: "Arrivee",
    rue: "",
    code_postal: "",
    ville: "",
    pays: "",
  });
  const [departFormErrors, setDepartFormErrors] = useState({});
  const [arriveeFormErrors, setArriveeFormErrors] = useState({});
  const [gState, setgState] = useRecoilState(globalState);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAddresses = async () => {
      const storedDepartAddress = await AsyncStorage.getItem("departAddress");
      const storedArriveeAddress = await AsyncStorage.getItem("arriveeAddress");

      if (storedDepartAddress) {
        setDepartAddress(JSON.parse(storedDepartAddress));
      }
      if (storedArriveeAddress) {
        setArriveeAddress(JSON.parse(storedArriveeAddress));
      }
    };

    loadAddresses();
  }, []);

  const validateForm = (form) => {
    let formErrors = {};
    let isValid = true;

    for (const key in form) {
      if (form[key].length < 2) {
        formErrors[key] = true;
        isValid = false;
      } else {
        formErrors[key] = false;
      }
    }

    return { isValid, formErrors };
  };

  const goToNextStep = async () => {
    const { isValid: isDepartValid, formErrors: departErrors } =
      validateForm(departAddress);
    const { isValid: isArriveeValid, formErrors: arriveeErrors } =
      validateForm(arriveeAddress);

    if (isDepartValid && isArriveeValid) {
      setgState({
        ...gState,
        form_address: { dep: departAddress, arr: arriveeAddress },
      });

      await AsyncStorage.setItem(
        "departAddress",
        JSON.stringify(departAddress)
      );
      await AsyncStorage.setItem(
        "arriveeAddress",
        JSON.stringify(arriveeAddress)
      );

      navigation.navigate("screens/contact", {
        summaryData: {
          departAddress,
          arriveeAddress,
          meubles: gState.meubles,
        },
      });
    } else {
      setDepartFormErrors(departErrors);
      setArriveeFormErrors(arriveeErrors);
    }
  };

  const goToPreviousStep = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StepIndicator currentStep={2} />
      <ScrollView
        contentContainerStyle={styles.formContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Entrez Votre Adresse</Text>
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Adresse de Départ</Text>
          <TextInput
            style={[styles.input, departFormErrors.rue && styles.errorInput]}
            placeholder="Rue"
            placeholderTextColor="#888"
            value={departAddress.rue}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, rue: value })
            }
          />
          {departFormErrors.rue && (
            <Text style={styles.errorText}>Please provide a valid rue.</Text>
          )}
          <TextInput
            style={[
              styles.input,
              departFormErrors.code_postal && styles.errorInput,
            ]}
            placeholder="Code Postal"
            placeholderTextColor="#888"
            value={departAddress.code_postal}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, code_postal: value })
            }
            keyboardType="numeric"
          />
          {departFormErrors.code_postal && (
            <Text style={styles.errorText}>
              Please provide a valid code postal.
            </Text>
          )}
          <TextInput
            style={[styles.input, departFormErrors.ville && styles.errorInput]}
            placeholder="Ville"
            placeholderTextColor="#888"
            value={departAddress.ville}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, ville: value })
            }
          />
          {departFormErrors.ville && (
            <Text style={styles.errorText}>Please provide a valid ville.</Text>
          )}
          <Dropdown
            style={styles.dropdown}
            data={countryList}
            labelField="label"
            valueField="value"
            placeholder="Pays"
            value={departAddress.pays}
            onChange={(item) =>
              setDepartAddress({ ...departAddress, pays: item.value })
            }
          />
          {departFormErrors.pays && (
            <Text style={styles.errorText}>Please select a country.</Text>
          )}
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>ET</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Adresse d'Arrivée</Text>
          <TextInput
            style={[styles.input, arriveeFormErrors.rue && styles.errorInput]}
            placeholder="Rue"
            placeholderTextColor="#888"
            value={arriveeAddress.rue}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, rue: value })
            }
          />
          {arriveeFormErrors.rue && (
            <Text style={styles.errorText}>Please provide a valid rue.</Text>
          )}
          <TextInput
            style={[
              styles.input,
              arriveeFormErrors.code_postal && styles.errorInput,
            ]}
            placeholder="Code Postal"
            placeholderTextColor="#888"
            value={arriveeAddress.code_postal}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, code_postal: value })
            }
            keyboardType="numeric"
          />
          {arriveeFormErrors.code_postal && (
            <Text style={styles.errorText}>
              Please provide a valid code postal.
            </Text>
          )}
          <TextInput
            style={[styles.input, arriveeFormErrors.ville && styles.errorInput]}
            placeholder="Ville"
            placeholderTextColor="#888"
            value={arriveeAddress.ville}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, ville: value })
            }
          />
          {arriveeFormErrors.ville && (
            <Text style={styles.errorText}>Please provide a valid ville.</Text>
          )}
          <Dropdown
            style={styles.dropdown}
            data={countryList}
            labelField="label"
            valueField="value"
            placeholder="Pays"
            value={arriveeAddress.pays}
            onChange={(item) =>
              setArriveeAddress({ ...arriveeAddress, pays: item.value })
            }
          />
          {arriveeFormErrors.pays && (
            <Text style={styles.errorText}>Please select a country.</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={goToPreviousStep}
          >
            <Text style={styles.buttonText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={goToNextStep}
          >
            <Text style={styles.buttonText}>Suivant</Text>
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
    flexGrow: 1,
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
  addressSection: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
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
  dropdown: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
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
    marginLeft: "5%",
  },
});

export default Address;
