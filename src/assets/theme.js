import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3', // Material Design 默认蓝色
    secondary: '#FF9800', // 其他颜色
    // 可以继续添加或修改颜色
  },
};

let theme = {
  darkTheme: darkTheme,
}

export default theme;
