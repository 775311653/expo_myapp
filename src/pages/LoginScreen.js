import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, ToastAndroid, Text} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import {useNavigation} from "@react-navigation/native"; // 使用 useLocalObservable 代替 inject 和 observer
let api = require('./../api');


const LoginScreen = observer(function () {
  const navigation = useNavigation(); // 获取 navigation 对象

  const data = useLocalObservable(() => ({
    email: '775311664@qq.com',
    password: '123456',
  }));

  const handleLogin = async () => {
    // 登录逻辑
    let res = await api.user.login(data);
    if (res.code !== 0) return ToastAndroid.show(res.message, ToastAndroid.SHORT);
    ToastAndroid.show('登录成功', ToastAndroid.SHORT);
    // 导航逻辑到HomeLoginScreen
    navigation.navigate('HomeLoginScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={data.email}
        onChangeText={text => (data.email = text)}
      />
      {/*<Text>{data.email}</Text>*/}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={data.password}
        onChangeText={text => (data.password = text)}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#1e90ff"/>
      </View>
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

export default LoginScreen;
