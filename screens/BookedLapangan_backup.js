import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import axios from "axios";

const BookedLapangan = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);

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
    <TouchableOpacity
      style={styles.card}
      onPress={async () => {
        try {
          const response = await axios.post(`http://192.168.100.5/uas/transaksi.php`, {
            id_user: 3, // Example user ID, replace with actual user ID
            id_lapangan: item.id, // Booking ID
            tanggal_booking: item.date, // Assuming this is the date
            jam_booking: item.timeSlots, // Assuming this is the time slots
            nama_pembooking: item.name, // Assuming this is the name
          });
          console.log("API Response:", response.data); // Log the response
          const bookingDetails = response.data; // Assuming the response contains the booking details

          if (bookingDetails.success) { // Check if the response indicates success
            navigation.navigate("BookedDetail", { booking: bookingDetails });
          } else {
            console.error("Error fetching booking details:", bookingDetails.message);
            Alert.alert("Error", bookingDetails.message);
          }
        } catch (error) {
          console.error("Error fetching booking details:", error);
          Alert.alert("Error", "Failed to fetch booking details.");
        }
      }}
    >
      <Image
        source={{
          uri: "https://via.placeholder.com/150", // Placeholder image for now
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.time}>{item.timeSlots}</Text>
      <Text style={styles.fieldName}>{item.fieldName}</Text>
      <Text style={styles.button}>Lihat Detail Booking</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
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
  button: {
    marginTop: 8,
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default BookedLapangan;
