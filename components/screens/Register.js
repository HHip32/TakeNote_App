import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';






export default function Register({ navigation }) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // fetch api

  const postUser = async () => {
    try {
      const response = await fetch('https://pwqz9y-8080.csb.app/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // handle Register

  const handleRegister = async () => {
    try {
      await postUser(); // Gửi yêu cầu đăng ký và đợi cho đến khi nó hoàn thành

      // Sau khi đăng ký thành công, thực hiện đăng nhập tự động
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text1}>SIGN UP</Text>
      <View style={styles.editEmail}>
        <Text style={styles.textEmail}>Name</Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={(text) => {
            setName(text)
          }}
        />
      </View>
      <View style={styles.editPassword}>
        <Text style={styles.textPassword}>Password</Text>
        <TextInput
          style={styles.inputPassword}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text)
          }}
        />
      </View>
      <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', top: 300 }}>
        <Pressable
          style={{ width: 150, height: 50, borderWidth: 1, borderColor: '#FFF', backgroundColor: '#ffe4e1', justifyContent: 'center', alignItems: 'center' }}
          onPress={handleRegister}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 24, color: '#f08080' }}>
            SIGN UP
          </Text>
        </Pressable>
        <Pressable
          style={{ width: 150, height: 50, borderWidth: 1, borderColor: '#FFF', backgroundColor: '#ffe4e1', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 24, color: '#f08080' }}>
            LOGIN
          </Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D8EFDF'
  },
  text1: {
    width: 130,
    height: 29,
    top: 80,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 29.3,
    textAlign: 'center',
    color: '#c71585'
  },
  editEmail: {
    top: 170,
    flexDirection: "row",
    width: 330,
    height: 54,
    backgroundColor: '#CAE1D1',
  },
  textEmail: {
    width: 80,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 18,
    textAlign: "center",
    top: '25%'
  },
  inputEmail: {
    flex: 1
  },
  editPassword: {
    top: 210,
    flexDirection: "row",
    width: 330,
    height: 54,
    backgroundColor: '#CAE1D1',
    paddingRight: 20
  },
  textPassword: {
    width: 85,
    height: 21,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 21.09,
    textAlign: "center",
    top: '25%'
  },
  inputPassword: {
    flex: 1
  }
});
