import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import StepIndicator from "../../components/StepIndicator";
import { countryList } from "../../utils/countryList"; 

const Address = () => {
  const [departAddress, setDepartAddress] = useState({
    rue: "",
    codePostal: "",
    ville: "",
    pays: "Tunisia",
  });
  const [arriveeAddress, setArriveeAddress] = useState({
    rue: "",
    codePostal: "",
    ville: "",
    pays: "Tunisia",
  });

  const navigation = useNavigation();

  const goToNextStep = () => {
    navigation.navigate("screens/contact");
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
            style={styles.input}
            placeholder="Rue"
            placeholderTextColor="#888"
            value={departAddress.rue}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, rue: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Code Postal"
            placeholderTextColor="#888"
            value={departAddress.codePostal}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, codePostal: value })
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Ville"
            placeholderTextColor="#888"
            value={departAddress.ville}
            onChangeText={(value) =>
              setDepartAddress({ ...departAddress, ville: value })
            }
          />
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
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>ET</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Adresse d'Arrivée</Text>
          <TextInput
            style={styles.input}
            placeholder="Rue"
            placeholderTextColor="#888"
            value={arriveeAddress.rue}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, rue: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Code Postal"
            placeholderTextColor="#888"
            value={arriveeAddress.codePostal}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, codePostal: value })
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Ville"
            placeholderTextColor="#888"
            value={arriveeAddress.ville}
            onChangeText={(value) =>
              setArriveeAddress({ ...arriveeAddress, ville: value })
            }
          />
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
});

export default Address;
