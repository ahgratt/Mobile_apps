import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

const Carousel = ({ fields, navigation }) => {
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={fields}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { field: item })}
          >
            <Image source={require('../assets/fotolapangan.jpg')} style={styles.image} />
            <Text style={styles.name}>{item.nama_lapangan}</Text>
            <Text style={styles.details}>{item.alamat}</Text>
            <Text style={styles.price}>Rp.{item.harga}/Jam</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://192.168.100.5/uas/lapangan.php')
      .then((response) => {
        setFields(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Yakin ingin keluar aplikasi?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { 
          text: 'Yes',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>Halo, Admin</Text>
          <Text style={styles.question}>Mau main dimana kamu hari ini?</Text>
        </View>
        <Icon name="exit-outline" size={28} color="white" style={styles.bellIcon} onPress={handleLogout} />
      </View>

      {/* Introduction */}
      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          Nikmati keseruan bermain bola di <Text style={styles.highlight}>Go Futsal</Text>!{"\n"}
          Dengan fasilitas lengkap, semua kebutuhanmu terpenuhi di <Text style={styles.highlight}>Go Futsal</Text>
        </Text>
      </View>

      {/* Carousel */}
      <Carousel fields={fields} navigation={navigation} />
    </SafeAreaView>
  );
};

const DashboardScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Lapangan' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTextContainer: { flex: 1 },
  greeting: { fontSize: 28, color: '#fff' },
  question: { fontSize: 24, color: '#fff', marginTop: 5, fontWeight: 'bold' },
  bellIcon: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  introContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  introText: { fontSize: 16, color: '#666', lineHeight: 20, textAlign: 'center' },
  highlight: { color: '#007AFF', fontWeight: 'bold' },
  carouselContainer: { marginVertical: 20 },
  card: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 2,
  },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 14, color: '#666' },
  price: { fontSize: 14, color: '#007AFF', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default DashboardScreen;
