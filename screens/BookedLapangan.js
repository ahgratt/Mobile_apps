import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";

const BookedLapangan = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.post("http://192.168.100.5/uas/bookedlapangan.php", {
          // Include any necessary parameters here
        });
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const filteredBookings = response.data.filter(booking => booking.date === currentDate);
        setBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const renderBookingItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nama Pembooking:</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.label}>Tanggal:</Text>
      <Text style={styles.value}>{item.date}</Text>
      <Text style={styles.label}>Nama Lapangan:</Text>
      <Text style={styles.value}>{item.fieldName}</Text>
      <Text style={styles.label}>Jam Booking:</Text>
      <Text style={styles.value}>{item.timeSlots}</Text>
      <Text style={styles.label}>Metode Pembayaran:</Text>
      <Text style={styles.value}>Cash</Text>
      <Text style={styles.label}>Catatan:</Text>
      <Text style={styles.value}>{item.notes}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>List booking</Text>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
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
  headerTextContainer: { flex: 1, alignItems: 'center' }, // Center align text
  greeting: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  dateText: { fontSize: 24, color: '#fff', paddingTop: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 14,
    color: "#007AFF",
  },
  fieldName: {
    fontSize: 14,
    color: "#444",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginBottom: 10,
  },
});

export default BookedLapangan;
