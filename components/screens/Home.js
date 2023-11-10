import { StyleSheet, Text, View } from 'react-native';

export default function Home({navigatetion, route}) {
  return (
    <View style={styles.container}>
     <Text>hello {route.params.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
