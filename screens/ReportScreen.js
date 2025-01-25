import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const ReportScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const fetchBookingHistory = async (month) => {
    try {
      const response = await axios.get(`http://192.168.100.5/uas/getBookings.php?month=${month}`);
      if (response.data.success) {
        setBookingHistory(response.data.bookings);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while fetching booking history');
    }
  };

  const handleMonthPress = (index) => {
    setSelectedMonth(index + 1); // Months in JS Date API are 0-based, but we use 1-based for this
    fetchBookingHistory(index + 1);
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.nama_pembooking}</Text>
      <Text style={styles.tableCell}>{item.tanggal_booking}</Text>
      <Text style={styles.tableCell}>{item.jam_booking}</Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {selectedMonth && (
          <TouchableOpacity onPress={() => setSelectedMonth(null)} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>Report 2025</Text>
        </View>
      </View>
      {!selectedMonth ? (
        <View style={styles.monthGrid}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={styles.monthButton}
              onPress={() => handleMonthPress(index)}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.historyContainer}>
          <Text style={styles.subHeader}>Booking History - {months[selectedMonth - 1]}</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCellHeader}>Name</Text>
              <Text style={styles.tableCellHeader}>Date</Text>
              <Text style={styles.tableCellHeader}>Time</Text>
            </View>
            <FlatList
              data={bookingHistory}
              renderItem={renderBookingItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text style={styles.noData}>No bookings found for this month.</Text>}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 70,
  },
  headerTextContainer: { flex: 1, alignItems: 'center' }, // Center align text
  greeting: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  subHeader: { fontSize: 22, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 10 },
  monthGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
  monthButton: { width: '40%', padding: 15, marginVertical: 10, backgroundColor: '#007AFF', borderRadius: 10 },
  monthText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  historyContainer: { flex: 1 },
  table: { flex: 1, marginTop: 10, borderTopWidth: 1, borderTopColor: '#ccc' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5 },
  tableHeader: { backgroundColor: '#007AFF' },
  tableCell: { flex: 1, textAlign: 'center', color: '#000', fontWeight: 'bold' },
  tableCellHeader: { flex: 1, textAlign: 'center', color: '#fff', fontWeight: 'bold' },
  noData: { textAlign: 'center', color: '#aaa', marginTop: 20 },
});

export default ReportScreen;