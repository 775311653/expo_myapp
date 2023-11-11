import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import {Button, Card} from 'react-native-paper';
import {useRoute} from "@react-navigation/native";

let api = require('./../api');

const ServiceScreen = observer(function () {

  let route = useRoute();

  const data = useLocalObservable(() => ({
    serviceName: '算命服务',
    remainingChances: 10,
    costPerService: 5,
    balance: 100,
    inputMessage: '',
    messages: [],
    isLoading: false,
    service_id: 1,
  }));

  React.useEffect(() => {
    data.service_id = route.params.service_id;
    get_service(data.service_id);
  }, []);

  async function get_service(service_id) {
    let res = await api.service.get_service_by_id(service_id);
    if (res.code !== 0) return;
    data.services = res.data;
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.serviceInfo}>
        <Text style={styles.header}>{data.serviceName}</Text>
        <Text>剩余次数: {data.remainingChances}</Text>
        <Text>每次费用: {data.costPerService} 元</Text>
        <Text>余额: {data.balance} 元</Text>
        <Button title="充值" onPress={() => { /* 充值逻辑 */
        }}/>
      </View>
      {/* 其他 UI 组件 */}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  serviceInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  // 其他样式...
});


export default ServiceScreen;
