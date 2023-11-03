import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, ToastAndroid, Text} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react'; // 使用 useLocalObservable 代替 inject 和 observer
let api = require('./../api');


const HomeLoginScreen = observer(function () {
  const data = useLocalObservable(() => ({
    email: '',
    password: '',
  }));

  const handleLogin = async () => {
    // 登录逻辑
    let res = await api.user.login(data);
    if (res.code !== 0) return ToastAndroid.show(res.message, ToastAndroid.SHORT);
    return ToastAndroid.show('登录成功', ToastAndroid.SHORT);
    // 导航逻辑
  };

  return (
    <View style={styles.container}>

      <Text>hello login home</Text>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default HomeLoginScreen;
