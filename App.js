import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import react from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen name="Locations" component={LocationsScreen} />
        <Stack.Screen name="Add location" component={AddLocationScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Capitals" component={CapitalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function LocationsScreen() {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Locations')}>
    <Text variant='displayMedium'>Locations</Text>
    </Pressable>
  );
}

function AddLocationScreen() {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Add location')}>
    <Text variant='displayMedium'>Add Locations</Text>
    </Pressable>
  );
}

function MapScreen() {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Map')}>
    <Text variant='displayMedium'>Map screen will be shown here</Text>
    </Pressable>
  );
}

function CapitalScreen() {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Capitals')}>
    <Text variant='displayMedium'>This page shows capitals</Text>
    </Pressable>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
