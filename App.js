import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import react, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen name="Locations"
          component={LocationsScreen}
          options={{ tabBarIcon: () => <Entypo name="location" size={24} color="black" /> }} />
        <Stack.Screen name="Add location"
          component={AddLocationScreen}
          options={{ tabBarIcon: () => <AntDesign name="plus" size={26} /> }} />
        <Stack.Screen name="Map"
          component={MapScreen}
          options={{ tabBarIcon: () => <Entypo name="map" size={24} color="black" /> }} />

        <Stack.Screen name="Capitals"
          component={CapitalScreen}
          options={{ tabBarIcon: () => <FontAwesome5 name="city" size={24} color="black" /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function LocationsScreen() {



  return (

    <Text variant='displayMedium'>Locations</Text>

  );
}

function AddLocationScreen() {



  return (

    <Text variant='displayMedium'>Add Locations</Text>

  );
}


function MapScreen() {



  const [loc, setLoc] = useState({lat:65.0800, lon:25.4800});
  const [place, setPlace] = useState('');

  useEffect(() => {
    getLocation();
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      setLoc({ lat: location.coords.latitude, lon: location.coords.longitude });
    }
  }, []);

  async function search(){
    let coords = await Location.geocodeAsync(place);
    if(coords[0]){
      setLoc({lat: coords[0].latitude, lon: coords[0].longitude});
    }else{
      Alert.alert('Location not found!!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput value={place} onChangeText={setPlace}/>
      <Button onPress={search}>Search</Button>
      <MapView
       style={styles.map}
        region={{
           latitude: loc.lat,
            longitude: loc.lon,
             latitudeDelta: 0.0922,
              longitudeDelta: 0.0421 
        }}
      >
        { place  !== '' &&
          <Marker
            title={place}
            coordinate={{ latitude: loc.lat, longitude: loc.lon }}
          />
          }
      </MapView>
      </SafeAreaView>
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

  },
  map: {
    flex: 1,
  }
});
