import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { field } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: field.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{field.nama_lapangan}</Text>
        <Text style={styles.location}>{field.alamat}</Text>
        <Text style={styles.description}>{field.deskripsi}</Text>
        <Text style={styles.price}>Harga per jam: Rp.{field.harga}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BookingScreen', { field })}
        >
          <Text style={styles.buttonText}>Booking Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200 },
  infoContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 16, color: '#007AFF', marginBottom: 15 },
  description: { fontSize: 14, color: '#666', marginBottom: 15 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', marginVertical: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DetailScreen;