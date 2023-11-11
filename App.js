import { StatusBar } from 'expo-status-bar';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import './src/utils/px_util';
import AppNavigator from "./src/pages/AppNavigator";
import {PaperProvider} from "react-native-paper";
import appConfig from './app.json';
import theme from "./src/assets/theme";

export default function App() {
  return (
    <PaperProvider theme={theme.darkTheme}>
      <AppNavigator/>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appConfig.expo.name, () => App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
