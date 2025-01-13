import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ListField = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API
  const fetchFields = async () => {
    try {
      const response = await axios.get('http://192.168.1.12/uas/lapangan.php'); // Ganti URL dengan URL API Anda
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect untuk memanggil API saat komponen pertama kali dirender
  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={fields}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nama_lapangan}</Text>
              <Text style={styles.details}>Alamat: {item.alamat}</Text>
              <Text style={styles.details}>Deskripsi: {item.deskripsi}</Text>
              <Text style={styles.details}>Ukuran: {item.ukuran}</Text>
              <Text style={styles.details}>Kapasitas: {item.kapasitas}</Text>
              <Text style={styles.details}>Harga: {item.harga}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 14, color: '#666', marginBottom: 2 },
});

export default ListField;
