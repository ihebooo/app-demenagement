import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoaderWithOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#4f46e5" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderWithOverlay;
