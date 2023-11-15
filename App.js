import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Register from './components/screens/Register';



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


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{
            headerTitle: null,
            headerRight: () => <HomeHeaderRight />
          }} />
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
