import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import AddNote from './components/screens/AddNote';
import EditNote from './components/screens/EditNote';



const Stack = createNativeStackNavigator();

function HomeHeaderRight() {
  const name = global.appName;
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={require('./components/images/Frame6.png')}
        style={{ width: 50, height: 50 }}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ width: 101, height: 30, fontFamily: 'Epilogue', fontWeight: 700, fontSize: 20, lineHeight: 30, textAlign: 'center' }}>
          Hi {name}
        </Text>
        <Text style={{ width: 168, height: 22, fontFamily: 'Epilogue', fontWeight: 700, fontSize: 14, lineHeight: 22, textAlign: 'center', color: '#696B6F' }}>
          Have agrate day ahead
        </Text>
      </View>
    </View>
  );
}
function AddNoteHeaderRight({ navigation }) {
  return (
    <Pressable onPress={() => { navigation.goBack() }}>
      <View style={{ width: 36, height: 36 }}>
        <Image
          source={require('./components/images/Frame7.png')}
          style={{ width: 22, height: 22 }}
        />
      </View>
    </Pressable>

  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerTitle: null,
            headerRight: () => <HomeHeaderRight />
          }} />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={({ navigation }) => ({
              headerTitle: null,
              header: () => (
                <View style={{ width: '100%', height: 70, backgroundColor: '#FFFFFF', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                  <HomeHeaderRight />
                  <AddNoteHeaderRight navigation={navigation} /> {/* Truyền navigation vào Index3HeaderRight */}
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="EditNote"
            component={EditNote}
            options={({ navigation }) => ({
              headerTitle: null,
              header: () => (
                <View style={{ width: '100%', height: 70, backgroundColor: '#FFFFFF', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                  <HomeHeaderRight />
                  <AddNoteHeaderRight navigation={navigation} /> {/* Truyền navigation vào Index3HeaderRight */}
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
