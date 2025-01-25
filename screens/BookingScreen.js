import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const BookingScreen = ({ route, navigation }) => {
  const { field } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeSlots = [
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 01 PM',
    '01 PM - 02 PM',
    '02 PM - 03 PM',
    '03 PM - 04 PM',
    '04 PM - 05 PM',
    '05 PM - 06 PM',
    '06 PM - 07 PM',
  ];

  const fetchUnavailableSlots = async (date) => {
    try {
      const response = await axios.get('http://192.168.100.5/uas/cekslot.php', {
        params: {
          id_lapangan: field.id,
          tanggal_booking: date.toISOString().split('T')[0],
        },
      });

      if (response.data.success) {
        setUnavailableSlots(response.data.bookedSlots);
      } else {
        Alert.alert('Error', response.data.message || 'Gagal mengambil data slot waktu.');
      }
    } catch (error) {
      console.error('Error fetching unavailable slots:', error);
      Alert.alert('Error', `Terjadi kesalahan saat memuat slot waktu: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUnavailableSlots(selectedDate);
  }, [selectedDate]);

  const toggleTimeSlot = (timeSlot) => {
    if (unavailableSlots.includes(timeSlot)) {
      return; // Do nothing if the slot is unavailable
    }

    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot)
        ? prev.filter((slot) => slot !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleConfirmBooking = async () => {
    if (selectedTimeSlots.length === 0) {
      Alert.alert('Error', 'Silakan pilih setidaknya satu slot waktu.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.5/uas/cekslot.php', {
        id_lapangan: field.id,
        tanggal_booking: selectedDate.toISOString().split('T')[0],
        jam_booking: selectedTimeSlots.join(', '),
      });

      if (response.data.success) {
        navigation.navigate('DetailBookingScreen', {
          field,
          selectedDate,
          selectedTimeSlots,
        });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      Alert.alert('Error', `Gagal memproses booking: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Jadwal Booking</Text>

      {/* Tanggal Booking */}
      <View style={styles.section}>
        <Text style={styles.label}>Tanggal Booking:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
      </View>

      {/* Slot Waktu */}
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={unavailableSlots.includes(item)}
            style={[
              styles.timeSlot,
              unavailableSlots.includes(item) ? styles.unavailableTimeSlot : null,
              selectedTimeSlots.includes(item) ? styles.selectedTimeSlot : null,
            ]}
            onPress={() => toggleTimeSlot(item)}
          >
            <Text style={styles.timeSlotText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Total Harga */}
      <Text style={styles.totalPrice}>
        Total Harga Booking: Rp.{field.harga * selectedTimeSlots.length}
      </Text>

      {/* Tombol Konfirmasi */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
        <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
  section: { marginBottom: 20 },
  datePickerButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  dateText: { fontSize: 16 },
  timeSlot: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  unavailableTimeSlot: { backgroundColor: '#ccc', borderColor: '#ccc' },
  selectedTimeSlot: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  timeSlotText: { color: '#000' },
  totalPrice: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  confirmButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BookingScreen;
