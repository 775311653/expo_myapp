import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import {ActivityIndicator, Button, Card, TextInput} from 'react-native-paper';
import {useRoute} from "@react-navigation/native";
import Toast from "react-native-root-toast";

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
    message_group_id: null,
    service: null,
  }));

  React.useEffect(() => {
    data.service_id = route.params.service_id;
    get_user_info();
  }, []);

  async function get_user_info() {
    let resUserInfo = await api.user.get_user_info();
    if (resUserInfo.code !== 0) return;
    let userInfo = resUserInfo.data;
    let transaction = userInfo.transactions.find((transaction) => transaction.service_id === route.params.service_id);
    console.log(transaction);
    if (transaction) {
      data.balance = transaction.amount;

      let service = transaction.service;
      data.service = service;
      data.serviceName = service.name;
      data.costPerService = service.price;
      data.remainingChances = Number.parseInt(data.balance / data.costPerService);
    } else {
      data.balance = 0;
    }

  }

  async function send_message() {
    if (data.inputMessage === '') return;
    data.messages.push({
      sender: 'user',
      content: data.inputMessage,
    });
    let res = await api.message.send_message({
      service_id: data.service_id,
      message: data.inputMessage,
      message_group_id: data.message_group_id,
    });
    if (res.code !== 0) return;
    let resData = res.data;
    data.message_group_id = resData.message_group_id;
    data.inputMessage = '';
    data.messages.push({
      sender: 'server',
      content: resData.response,
    });
    get_user_info();

  }

  if (!data.service) return <ActivityIndicator animating={true}/>

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.serviceInfo}>
        <Text style={styles.header}>{data.serviceName}</Text>
        <Text>剩余次数: {data.remainingChances}</Text>
        <Text>每次费用: {data.costPerService} 元</Text>
        <Text>余额: {data.balance} 元</Text>
        <Button mode={'elevated'} onPress={() => { /* 充值逻辑 */
        }}>充值</Button>
      </View>
      {/* 其他 UI 组件 */}
      <View style={styles.chatContainer}>
        <View style={styles.chatMessages}>
          {data.messages.map((message, index) => (
            <Text
              key={index}>{message.sender === 'user' ? `我: ${message.content}` : `${message.sender}: ${message.content}`}</Text>
          ))}
        </View>
        <TextInput
          style={styles.chatInput}
          value={data.inputMessage}
          onChangeText={(text) => data.inputMessage = text}
          placeholder="输入你的问题"
          onSubmitEditing={send_message}
        />
        <Button mode={'elevated'} onPress={send_message}>发送</Button>
      </View>
      {/* 充值对话框逻辑 */}
      {/*{showRechargeDialog && (*/}
      {/*  <View style={styles.rechargeDialog}>*/}
      {/*    <TextInput*/}
      {/*      style={styles.rechargeInput}*/}
      {/*      value={rechargeAmount.toString()}*/}
      {/*      onChangeText={setRechargeAmount}*/}
      {/*      placeholder="输入充值金额"*/}
      {/*      keyboardType="numeric"*/}
      {/*    />*/}
      {/*    <Button title="取消" onPress={() => setShowRechargeDialog(false)} />*/}
      {/*    <Button title="确定" onPress={recharge} />*/}
      {/*  </View>*/}
      {/*)}*/}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', // 轻微灰色背景
  },
  serviceInfo: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // 白色背景突出服务信息区域
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000', // 添加阴影效果
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // 增加标题下的间距
    color: '#333', // 深色文字
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  chatMessages: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // 白色背景突出聊天区域
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000', // 添加阴影效果
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  chatInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd', // 边框颜色
  },
  // ...其他样式
});


export default ServiceScreen;
