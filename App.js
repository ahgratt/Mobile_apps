import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import DashboardScreen from './screens/DashboardScreen';
import DetailScreen from './screens/DetailScreen';
import BookingScreen from './screens/BookingScreen';
import ReportScreen from './screens/ReportScreen';
import ListField from './screens/ListField';
import LoginScreen from './screens/LoginScreen';
import AddFieldScreen from './screens/AddFieldScreen';
import EditFieldScreen from './screens/EditFieldScreen';
import DetailBookingScreen from './screens/DetailBookingScreen';
import BookingSuccessScreen from './screens/BookingSuccessScreen';
import BookedLapangan from './screens/BookedLapangan';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardMain"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{ title: 'Detail Lapangan' }}
    />
    <Stack.Screen
      name="BookingScreen"
      component={BookingScreen}
      options={{ title: 'Pilih Jadwal Booking' }}
    />
    <Stack.Screen
      name="DetailBookingScreen"
      component={DetailBookingScreen}
      options={{ title: 'Detail Booking' }}
    />
    <Stack.Screen
      name="BookingSuccessScreen"
      component={BookingSuccessScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ListFieldStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ListFieldMain"
      component={ListField}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddFieldScreen"
      component={AddFieldScreen}
      options={{ title: 'Tambah Lapangan' }}
    />
    <Stack.Screen
      name="EditFieldScreen"
      component={EditFieldScreen}
      options={{ title: 'Edit Lapangan' }}
    />
  </Stack.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await getUserFromStorage();
      if (user) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const getUserFromStorage = async () => {
    return null; // Simulate user retrieval
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Report') {
                iconName = focused ? 'document' : 'document-outline';
              } else if (route.name === 'ListField') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'BookedLapangan') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#666',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardStack} />
          <Tab.Screen name="ListField" component={ListFieldStack} />
          <Tab.Screen name="BookedLapangan" component={BookedLapangan} />
          <Tab.Screen name="Report" component={ReportScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}
