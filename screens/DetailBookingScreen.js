import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DetailBookingScreen = ({ route, navigation }) => {
  const { field, selectedDate, selectedTimeSlots } = route.params;
  const [namaPembooking, setNamaPembooking] = useState('');
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!namaPembooking.trim()) {
      Alert.alert('Error', 'Nama pembooking harus diisi!');
      return;
    }

    const bookingData = {
      id_user: 3,
      id_lapangan: field.id,
      tanggal_booking: selectedDate.toISOString().split('T')[0],
      jam_booking: selectedTimeSlots.join(', '),
      nama_pembooking: namaPembooking,
      catatan,
      nama_lapangan: field.nama_lapangan,
    };

    console.log('Booking Data:', bookingData); // Log the booking data

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.5/uas/transaksi.php', bookingData);
      setLoading(false);

      console.log('Response:', response.data); // Log the response

      if (response.data.success) {
        navigation.navigate('BookingSuccessScreen', { bookingData });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error); // Log the error
      Alert.alert('Error', 'Gagal menyimpan booking. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Booking</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ringkasan Pesanan Lapangan Anda</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>
            {selectedDate.toLocaleDateString('id-ID', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </Text>
          <Text style={styles.detailText}>{field.nama_lapangan}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Ubah</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.label}>Nama Pembooking:</Text>
      <TextInput
        style={styles.input}
        placeholder="Example: Fulan Bin Fulan"
        value={namaPembooking}
        onChangeText={setNamaPembooking}
      />
      <Text style={styles.label}>Catatan:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Example: Bangku penonton minta tolong dipindahkan saja"
        value={catatan}
        onChangeText={setCatatan}
        multiline
      />
      <Text style={styles.totalPrice}>
        Total Harga Booking: Rp.{field.harga * selectedTimeSlots.length}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Bayar Booking</Text>
        </TouchableOpacity>
      )}
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