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
      const response = await axios.get('http://192.168.100.5/uas/lapangan.php');
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteField = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this field?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.100.5/uas/lapangan.php?id=${id}`);
              Alert.alert('Success', 'Lapangan berhasil dihapus!');
              fetchFields();
            } catch (error) {
              console.error('Error deleting field:', error);
              Alert.alert('Error', 'Gagal menghapus lapangan.');
            }
          },
        },
      ],
      { cancelable: true }
    );
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
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>List Lapangan</Text>
          </View>
        </View>
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
                <Text style={styles.details}>Ukuran: {item.ukuran_lapangan}</Text>
                <Text style={styles.details}>Kapasitas: {item.kapasitas_lapangan} Orang</Text>
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
  container: { flex: 1, backgroundColor: '#fff'},
  headerContainer: {
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 70, // Adjust for better vertical alignment
    paddingBottom: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center', // Center align content
    marginBottom: 20,
  },
  headerTextContainer: { flex: 1, alignItems: 'center' },
  greeting: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginHorizontal: 20,
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
    marginHorizontal: 20,
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
