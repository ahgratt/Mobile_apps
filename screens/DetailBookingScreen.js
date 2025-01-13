import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const DetailBookingScreen = ({ route, navigation }) => {
  const { field, selectedDate, selectedTimeSlots } = route.params; // Data yang diterima dari BookingScreen
  const [namaPembooking, setNamaPembooking] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleBooking = async () => {
    if (!namaPembooking.trim()) {
      Alert.alert('Error', 'Nama pembooking harus diisi!');
      return;
    }
  
    const bookingData = {
      id_user: 1, // ID pengguna yang login
      id_lapangan: field.id,
      tanggal_booking: selectedDate.toISOString().split('T')[0],
      jam_booking: selectedTimeSlots.join(', '), // Gabungkan slot waktu
      nama_pembooking: namaPembooking,
      catatan,
    };
  
    try {
      // Kirim data ke backend untuk disimpan
      const response = await axios.post('http://192.168.1.12/uas/transaksi.php', bookingData);
  
      if (response.data.success) {
        // Jika berhasil, pindah ke halaman BookingSuccessScreen
        navigation.navigate('BookingSuccessScreen', { bookingData });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menyimpan booking. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Booking</Text>

      {/* Informasi Booking */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ringkasan Pesanan Lapangan Anda</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>
            {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
          <Text style={styles.detailText}>{field.nama_lapangan}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Ubah</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Nama Pembooking */}
      <Text style={styles.label}>Nama Pembooking:</Text>
      <TextInput
        style={styles.input}
        placeholder="Example: Fulan Bin Fulan"
        value={namaPembooking}
        onChangeText={setNamaPembooking}
      />

      {/* Input Catatan */}
      <Text style={styles.label}>Catatan:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Example: Bangku penonton minta tolong dipindahkan saja"
        value={catatan}
        onChangeText={setCatatan}
        multiline
      />

      {/* Total Harga */}
      <Text style={styles.totalPrice}>
        Total Harga Booking: Rp.{field.harga * selectedTimeSlots.length}
      </Text>

      {/* Tombol Bayar Booking */}
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Bayar Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
  infoContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  detailContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  detailText: { fontSize: 16, color: '#666' },
  editButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  editButtonText: { color: '#fff', fontSize: 14 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 15 },
  textArea: { height: 100 },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DetailBookingScreen;