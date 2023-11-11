import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid, Text} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import {useNavigation} from "@react-navigation/native";
import {Button, TextInput} from "react-native-paper";
import Toast from "react-native-root-toast";
import storage from "../utils/storage";
let api = require('./../api');
let store = require('./../store');


const LoginScreen = observer(function () {
  const navigation = useNavigation(); // 获取 navigation 对象

  const data = useLocalObservable(() => ({
    email: '775311664@qq.com',
    password: '123456',
  }));

  const handleLogin = async () => {
    // 登录逻辑
    let res = await api.user.login(data);
    if (res.code !== 0) return Toast.show(res.message);
    storage.setItem('token', res.data?.token);
    storage.setItem('user', res.data?.user);
    Toast.show('login success');
    // 导航逻辑到HomeLoginScreen
    navigation.navigate('HomeLoginScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="email"
        value={data.email}
        onChangeText={text => (data.email = text)}
      />
      {/*<Text>{data.email}</Text>*/}

      <TextInput
        style={styles.input}
        label="password"
        value={data.password}
        onChangeText={text => (data.password = text)}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button mode={'elevated'} onPress={handleLogin} style={styles.buttonContainer.button}>Login</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: px(20),
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: px(20),
    padding: px(10),
    fontSize: px(18),
  },
  buttonContainer: {
    marginTop: px(10),
    button: {
      alignSelf: 'center',
      width: px(100),
      fontSize: px(30),
    }
  },
});

export default LoginScreen;
