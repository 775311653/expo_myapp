import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, ToastAndroid, Text} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import Toast from "react-native-root-toast";
import {Card} from "react-native-paper"; // 使用 useLocalObservable 代替 inject 和 observer
let api = require('./../api');

const HomeLoginScreen = observer(function () {
  const data = useLocalObservable(() => ({
    services: [],
  }));

  React.useEffect(() => {
    get_services();
  }, []);

  async function get_services() {
    let res = await api.service.get_services();
    if (res.code !== 0) return;
    data.services = res.data;
  }

  return (
    <View style={styles.container}>
      <Text>Select Service</Text>
      <View>
        {data.services.map((service) => {
          return (
            <Card key={service.id} onPress={() => {
            }}>
              <Card.Title title={service.name} subtitle={service.description}/>
            </Card>
          )
        })}
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
});

export default HomeLoginScreen;
