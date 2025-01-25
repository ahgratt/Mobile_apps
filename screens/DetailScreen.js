import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailScreen = ({ route, navigation }) => {
  const { field } = route.params;

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{field.nama_lapangan}</Text>
      </View>
      <Image source={require('../assets/fotolapangan.jpg')} style={styles.image} />
      <Text style={styles.location}>{field.alamat}</Text>
      <Text style={styles.descriptionTitle}>Deskripsi</Text>
      <Text style={styles.description}>{field.deskripsi}</Text>

      <Text style={styles.facilitiesTitle}>Fasilitas</Text>
      <Text style={styles.facility}>Ukuran : {field.ukuran_lapangan}</Text>
      <Text style={styles.facility}>Full CCTV</Text>
      <Text style={styles.facility}>Ruang Ganti</Text>
      <Text style={styles.facility}>Tempat Parkir</Text>
      <Text style={styles.facility}>Musholla</Text>
      <Text style={styles.facility}>Ruang Tunggu</Text>

    <View style={styles.buttonContainer}>
    <Text style={styles.price}>Harga per jam: Rp.{field.harga}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookingScreen', { field })}
      >
        <Text style={styles.buttonText}>Booking Sekarang</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  image: { width: '100%', height: 200 },
  location: { fontSize: 20, color: '#007AFF', marginVertical: 10, fontWeight: 'bold' },
  descriptionTitle: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
  description: { fontSize: 14, color: '#666', margin: 10, textAlign: 'justify' },
  price: { fontSize: 18, fontWeight: 'bold', margin: 10 },
  facilitiesTitle: {fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom:10},
  facility: { fontSize: 14, color: '#666' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', margin: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonContainer: {backgroundColor: '#fff', borderRadius: 8, marginTop: 20},
});

export default DetailScreen;
