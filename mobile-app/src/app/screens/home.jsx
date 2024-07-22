import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'your-background-image-url' }} // Replace with your background image URL or local path
        style={styles.background}
      >
        <View style={styles.overlay}></View>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Our Moving Services</Text>
          <Text style={styles.subtitle}>We're here to help you with your moving needs</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WizardHome')}>
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(144, 137, 252, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
