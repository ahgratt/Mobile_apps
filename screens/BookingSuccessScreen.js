import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingSuccessScreen = ({ route, navigation }) => {
  const { bookingData } = route.params; // Data booking yang diterima dari DetailBookingScreen

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Booking Berhasil!</Text>
      <Text style={styles.detailsTitle}>Detail Booking Anda:</Text>

      {/* Tampilkan Detail Booking */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Nama Lapangan: </Text>
          {bookingData.field.nama_lapangan}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Tanggal Booking: </Text>
          {bookingData.tanggal_booking}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Jam Booking: </Text>
          {bookingData.jam_booking}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Nama Pembooking: </Text>
          {bookingData.nama_pembooking}
        </Text>
        {bookingData.catatan && (
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Catatan: </Text>
            {bookingData.catatan}
          </Text>
        )}
      </View>

      {/* Tombol untuk kembali ke halaman utama */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DashboardMain')}
      >
        <Text style={styles.buttonText}>Kembali ke Dashboard</Text>
      </TouchableOpacity>

      {/* Tombol untuk melihat detail lagi */}
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('DetailBookingScreen', { bookingData })}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Lihat Detail Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  successText: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  detailsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  detailsContainer: { width: '100%', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 20 },
  detailItem: { fontSize: 16, marginBottom: 8, color: '#666' },
  label: { fontWeight: 'bold', color: '#333' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 5, width: '100%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#007AFF' },
  secondaryButtonText: { color: '#007AFF' },
});

export default BookingSuccessScreen;