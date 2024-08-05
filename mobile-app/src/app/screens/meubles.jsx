import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import StepIndicator from "../../components/StepIndicator";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgUri } from "react-native-svg";

const Meubles = () => {
  const [clientMeubles, setClientMeubles] = useState([]);
  const navigation = useNavigation();

  const { data, isLoading, error, isError } = useQuery(
    ["get-meubles"],
    async () => api.get(`categories`)
  );

  useEffect(() => {
    const loadClientMeubles = async () => {
      const storedMeubles = await AsyncStorage.getItem("meubles");
      if (storedMeubles) {
        setClientMeubles(JSON.parse(storedMeubles));
      }
    };
    loadClientMeubles();
  }, []);

  const incrementMeuble = (meuble) => {
    setClientMeubles((prevState) => {
      const updatedMeubles = [...prevState];
      const foundMeuble = updatedMeubles.find((m) => m.id === meuble.id);

      if (foundMeuble) {
        foundMeuble.quantity += 1;
      } else {
        updatedMeubles.push({ ...meuble, quantity: 1 });
      }

      return updatedMeubles;
    });
  };

  const decrementMeuble = (meuble) => {
    setClientMeubles((prevState) => {
      const updatedMeubles = prevState.map((m) => {
        if (m.id === meuble.id && m.quantity > 0) {
          return { ...m, quantity: m.quantity - 1 };
        }
        return m;
      });

      return updatedMeubles.filter((m) => m.quantity > 0);
    });
  };

  const getQuantity = (meuble) => {
    const foundMeuble = clientMeubles.find((m) => m.id === meuble.id);
    return foundMeuble ? foundMeuble.quantity : 0;
  };

  const goToAddressPage = async () => {
    await AsyncStorage.setItem("meubles", JSON.stringify(clientMeubles));
    navigation.navigate("screens/address");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StepIndicator currentStep={1} />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <StepIndicator currentStep={1} />
        <Text>Error fetching meubles data: {error?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StepIndicator currentStep={1} />
      <ScrollView>
        {data.map((category, index) => (
          <View key={index}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.meublesContainer}>
              {category.meubles.map((meuble) => {
                const isSvg = meuble.img.endsWith(".svg");
                return (
                  <View key={meuble.id} style={styles.meubleCard}>
                    <Text style={styles.quantityBadge}>
                      {getQuantity(meuble)}
                    </Text>

                    {isSvg ? (
                      <SvgUri
                        style={styles.meubleImage}
                        width="100"
                        height="100"
                        uri={meuble.img}
                      />
                    ) : (
                      <Image
                        source={{ uri: meuble.img }}
                        style={styles.meubleImage}
                      />
                    )}

                    <Text style={styles.meubleTitle}>{meuble.title}</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.incrementButton}
                        onPress={() => incrementMeuble(meuble)}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.decrementButton}
                        onPress={() => decrementMeuble(meuble)}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={goToAddressPage}>
            <Text style={styles.nextButtonText}>Next</Text>
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
    padding: 10,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  meublesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  meubleCard: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  meubleImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 15,
  },
  meubleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  incrementButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  decrementButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  quantityBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff6347",
    color: "#fff",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  nextButtonContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  nextButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Meubles;
