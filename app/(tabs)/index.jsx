import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [movieName, setMovieName] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  const fetchMovieData = async () => {
    if (!movieName) {
      setError('Por favor, ingrese el nombre de una película.');
      return;
    }

    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=8ef24bd5`);
      const jsonData = await response.json();
      if (jsonData.Response === 'False') {
        setError('Película no encontrada');
        setMovieData(null);
      } else {
        setMovieData(jsonData);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Error en la red');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.title}>Buscador de películas</Text>
          <TextInput
            placeholder="Buscar película..."
            value={movieName}
            onChangeText={setMovieName}
            style={styles.input}
          />
          <Button title="Buscar" onPress={fetchMovieData} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {movieData && (
            <View style={styles.movieContainer}>
              <Image source={{ uri: movieData.Poster }} style={styles.poster} />
              <Text style={styles.title}>{movieData.Title}</Text>
              <Text style={styles.plot}>{movieData.Plot}</Text>
            </View>
          )}
        </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  movieContainer: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  plot: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: 'black',
  },
});
