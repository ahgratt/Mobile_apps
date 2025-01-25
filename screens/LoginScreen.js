import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan password wajib diisi.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.5/uas/login.php', {
        username: username,
        password: password,
      });

      console.log('Response:', response.data); // Log the response

      if (response.data.status === 'success') {
        Alert.alert('Success', response.data.message);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error); // Log the error
      Alert.alert('Error', 'Terjadi kesalahan pada server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.go}>Go</Text> <Text style={styles.futsal}>Futsal!</Text>
      </Text>
      <Text style={styles.subtitle}>Sewa lapangan menjadi mudah</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  go: { color: '#007AFF' },
  futsal: { color: '#FFD700' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  input: { width: '80%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default LoginScreen;