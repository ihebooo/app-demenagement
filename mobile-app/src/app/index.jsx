import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/images/logo.png"; // Adjust the path to your logo

export default function Home() {
  const navigation = useNavigation();

  const GoToMeublesPage = () => {
    navigation.navigate("screens/meubles");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "your-background-image-url" }} // Replace with your background image URL or local path
        style={styles.background}
      >
        <View style={styles.overlay}></View>
        <View style={styles.logoContainer}>
          <Image
            source={logo} // Using the imported logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Express Delivery</Text>
          <Text style={styles.subtitle}>
            We're here to help you with your moving needs
          </Text>
          <TouchableOpacity style={styles.button} onPress={GoToMeublesPage}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(144, 137, 252, 0.7)",
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  logo: {
    width: 80, // Reduced width
    height: 80, // Reduced height
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 100, // To move the content a bit down
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
