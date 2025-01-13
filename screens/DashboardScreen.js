import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import DetailScreen from './DetailScreen'; 

const Stack = createStackNavigator(); 
const Dashboard = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://192.168.1.12/uas/lapangan.php')
      .then((response) => {
        setFields(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Halo, Admin</Text>
        <Text style={styles.question}>Mau main dimana kamu hari ini?</Text>
      </View>

      {/* Carousel */}
      <FlatList
        data={fields}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { field: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.nama_lapangan}</Text>
            <Text style={styles.details}>{item.alamat}</Text>
            <Text style={styles.details}>Harga: {item.harga}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DashboardScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardMain"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Lapangan' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  question: { fontSize: 16, color: '#666', marginTop: 5 },
  card: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginRight: 15,
    elevation: 2,
  },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 14, color: '#666' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default DashboardScreen;