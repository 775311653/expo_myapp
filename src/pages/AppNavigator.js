import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import {StyleSheet, Text, View} from 'react-native';
import HomeLoginScreen from "./HomeLoginScreen";
import ServiceScreen from "./ServiceScreen";

// 如果你有其他屏幕，也需要导入它们
// import HomeScreen from './screens/HomeScreen';
// import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        {/* 如果其他屏幕的代码也准备好了，可以取消这些注释 */}
        <Stack.Screen name="HomeLoginScreen" component={HomeLoginScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="ServiceScreen" component={ServiceScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
