import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditFieldScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [fieldData, setFieldData] = useState({
    id: id,
    nama_lapangan: '',
    alamat: '',
    deskripsi: '',
    ukuran: '',
    kapasitas: '',
    harga: '',
  });

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await fetch(`http://192.168.1.12/uas/lapangan.php?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setFieldData({ ...data, id });
        } else {
          alert('Gagal memuat data lapangan.');
        }
      } catch (error) {
        alert('Terjadi kesalahan saat memuat data lapangan.');
      }
    };

    fetchFieldData();
  }, [id]);

  const handleSave = async () => {
    if (!fieldData.nama_lapangan || !fieldData.alamat || !fieldData.deskripsi || !fieldData.ukuran || !fieldData.kapasitas || !fieldData.harga) {
      alert('Semua data harus diisi!');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.12/uas/lapangan.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldData),
      });

      const responseData = await response.json(); // Menangkap respons JSON dari server

      // Cek apakah respons berhasil
      if (response.ok && responseData.message === "Lapangan berhasil diperbarui") {
        alert('Lapangan berhasil diperbarui!');
        navigation.goBack(); // Kembali ke halaman sebelumnya setelah update berhasil
      } else {
        alert('Gagal memperbarui lapangan. ' + (responseData.error || ''));
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan perubahan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Lapangan</Text>
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
        keyboardType="numeric"
      />
      <Button title="Simpan" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 5 },
});

export default EditFieldScreen;
