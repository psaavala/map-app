import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View, } from 'react-native';
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
import { addTodo, useFireTodos } from './firebase/FirestoreController'
import { Button, MD3LightTheme, PaperProvider, TextInput } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { FlatList } from 'react-native';




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

  const todos = useFireTodos();
  console.log("Todos from firestore:", todos);



  return (

    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TodoItem todoItem={item} />}
            contentContainerStyle={styles.list}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

function TodoItem({ todoItem }) {
  return (
    <View style={styles.card}>
      
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>{todoItem.todoText}</Text>
        <Entypo name="location-pin" size={24} color="red" />
      </View>

      
      <Text variant="bodyMedium" style={styles.review}>{todoItem.review}</Text>

      
      <StarRating rating={todoItem.stars} onChange={() => {}} starSize={24} color="gold" />
    </View>
  );
}

function AddLocationScreen() {

  const [todo, setTodo] = useState('');
  const [stars, setStars] = useState(0);
  const todos = useFireTodos();
  const [review, setReview] = useState('');

    function handleAddTodo(){

      addTodo(todo, stars, review)
      setTodo('');
      setStars(0);
      setReview('');

      Alert.alert("Success", "Location added successfully!");
  }
    


  return (

    <PaperProvider>
      <SafeAreaView style={styles.container}>
        
        <TextInput
          label={'Add new location'}
          value={todo}
          onChangeText={setTodo}
        />
        <TextInput
          label={'Add review text'}
          value={review}
          onChangeText={setReview}
          />
        <StarRating
          rating={stars}
          onChange={setStars}
          starSize={24}
          color="gold"
        />
        <Button
          mode="contained"
          icon={'plus-circle'}
          onPress={handleAddTodo}
          >
            Add location
          </Button>
          


      </SafeAreaView>
    </PaperProvider>

  );
}





function MapScreen() {



  const [loc, setLoc] = useState({ lat: 65.0800, lon: 25.4800 });
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

  async function search() {
    let coords = await Location.geocodeAsync(place);
    if (coords[0]) {
      setLoc({ lat: coords[0].latitude, lon: coords[0].longitude });
    } else {
      Alert.alert('Location not found!!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput value={place} onChangeText={setPlace} />
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
        {place !== '' &&
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
    padding: 10,
  },
  map: {
    flex: 1,
  },
  list: {
    paddingBottom:20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title:{
    fontWeight: 'bold',
  },
  review: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
