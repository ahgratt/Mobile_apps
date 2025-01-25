import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EditFieldScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [fieldData, setFieldData] = useState({
    nama_lapangan: '',
    alamat: '',
    deskripsi: '',
    ukuran: '',
    kapasitas: '',
    harga: '',
  });

  const fetchFieldData = async () => {
    try {
      const response = await fetch(`http://192.168.100.5/uas/edit_lapangan.php?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFieldData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch field data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchFieldData();
  }, [id]);

  const validateFields = () => {
    const { nama_lapangan, alamat, deskripsi, ukuran, kapasitas, harga } = fieldData;
    if (!nama_lapangan || !alamat || !deskripsi || !ukuran || !kapasitas || !harga) {
      Alert.alert('Validation Error', 'All fields must be filled!');
      return false;
    }
    if (isNaN(kapasitas) || isNaN(harga)) {
      Alert.alert('Validation Error', 'Capacity and Price must be numeric values!');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    // Log the data being sent to the backend
    console.log('Sending data to backend:', { id, ...fieldData });

    try {
      const response = await fetch(`http://192.168.100.5/uas/edit_lapangan.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...fieldData }),
      });
      const responseData = await response.json();

      // Log the response data
      console.log('Response from backend:', responseData);

      if (response.ok && responseData.message === "Field successfully updated.") {
        Alert.alert('Success', 'Field updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        throw new Error(responseData.error || 'Unknown error occurred.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to update field: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nama Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : Lapangan 1"
        value={fieldData.nama_lapangan}
        onChangeText={(text) => setFieldData({ ...fieldData, nama_lapangan: text })}
      />
      <Text style={styles.title}>Alamat Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : Jl. Raya No. 1"
        value={fieldData.alamat}
        onChangeText={(text) => setFieldData({ ...fieldData, alamat: text })}
      />
      <Text style={styles.title}>Deskripsi Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : Lapangan Futsal Luas Berlapangan Rumput"
        value={fieldData.deskripsi}
        onChangeText={(text) => setFieldData({ ...fieldData, deskripsi: text })}
      />
      <Text style={styles.title}>Ukuran Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : 20 x 40 m"
        value={fieldData.ukuran}
        onChangeText={(text) => setFieldData({ ...fieldData, ukuran: text })}
      />
      <Text style={styles.title}>Kapasitas Orang</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : 16 Orang"
        keyboardType="numeric"
        value={fieldData.kapasitas}
        onChangeText={(text) => setFieldData({ ...fieldData, kapasitas: text })}
      />
      <Text style={styles.title}>Harga Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Example : 40000"
        keyboardType="numeric"
        value={fieldData.harga}
        onChangeText={(text) => setFieldData({ ...fieldData, harga: text })}
      />
      <Button title="Simpan" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default EditFieldScreen;
