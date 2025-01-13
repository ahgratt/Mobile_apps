import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddFieldScreen = ({ navigation }) => {
  const [fieldData, setFieldData] = useState({
    nama_lapangan: '',
    alamat: '',
    deskripsi: '',
    ukuran: '',
    kapasitas: '',
    harga: '',
  });

  const handleSave = async () => {
    const response = await fetch(`http://192.168.1.12/uas/lapangan.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldData),
    });

    if (response.ok) {
      alert('Lapangan berhasil ditambahkan!');
      navigation.goBack();
    } else {
      alert('Gagal menambahkan lapangan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tambah Lapangan</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Lapangan"
        value={fieldData.nama_lapangan}
        onChangeText={(text) => setFieldData({ ...fieldData, nama_lapangan: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={fieldData.alamat}
        onChangeText={(text) => setFieldData({ ...fieldData, alamat: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={fieldData.deskripsi}
        onChangeText={(text) => setFieldData({ ...fieldData, deskripsi: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ukuran"
        value={fieldData.ukuran}
        onChangeText={(text) => setFieldData({ ...fieldData, ukuran: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Kapasitas"
        value={fieldData.kapasitas}
        onChangeText={(text) => setFieldData({ ...fieldData, kapasitas: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga"
        value={fieldData.harga}
        onChangeText={(text) => setFieldData({ ...fieldData, harga: text })}
      />
      <Button title="Simpan" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15 },
});

export default AddFieldScreen;
