import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ListField = () => {
  const navigation = useNavigation();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFields = async () => {
    try {
      const response = await axios.get('http://192.168.1.12/uas/lapangan.php');
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteField = async (id) => {
    try {
      await axios.delete(`http://192.168.1.12/uas/lapangan.php?id=${id}`);
      Alert.alert('Success', 'Lapangan berhasil dihapus!');
      fetchFields();
    } catch (error) {
      console.error('Error deleting field:', error);
      Alert.alert('Error', 'Gagal menghapus lapangan.');
    }
  };

  const editField = (id) => {
    navigation.navigate('EditFieldScreen', { id });
  };
  
  const addField = () => {
    navigation.navigate('AddFieldScreen');
  };
  

  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.addButton} onPress={addField}>
            <Text style={styles.addButtonText}>Tambah Lapangan</Text>
          </TouchableOpacity>
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
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={() => editField(item.id)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteField(item.id)}>
                    <Text style={styles.buttonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 14, color: '#666', marginBottom: 2 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  editButton: { backgroundColor: '#FFA500', padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
  deleteButton: { backgroundColor: '#FF4500', padding: 10, borderRadius: 8, flex: 1 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default ListField;
