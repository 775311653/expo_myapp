import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import {Card} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

let api = require('./../api');

const HomeLoginScreen = observer(function () {
  const navigation = useNavigation(); // 获取 navigation 对象

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select Service</Text>
      <View style={styles.cardContainer}>
        {data.services.map((service) => (
          <Card key={service.id} style={styles.card} onPress={() => {
            navigation.navigate('ServiceScreen', {service_id: service.id});
          }}>
            <Card.Title
              title={service.name}
              subtitle={service.description}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'column',
  },
  card: {
    marginBottom: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeLoginScreen;
