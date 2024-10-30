import { StyleSheet, SafeAreaView, TouchableOpacity, View, Button, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { useState } from 'react';

const images = [
  {
    id: '1',
    source: require('../../assets/images/Imagen1.jpg'),
    description: 'Estrella de mar',
  },
  {
    id: '2',
    source: require('../../assets/images/Imagen2.jpg'),
    description: 'Paisaje de montaña',
  },
  {
    id: '3',
    source: require('../../assets/images/Imagen3.jpg'),
    description: 'Paisaje de playa',
  },
];

export default function TabTwoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImage = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
    <Image source={images[currentIndex].source} style={styles.image} />
    <Text style={styles.description}>{images[currentIndex].description}</Text>
    <Button title="Cambiar Imagen" onPress={changeImage} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
