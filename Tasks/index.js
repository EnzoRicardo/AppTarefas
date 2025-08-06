import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/Navigator';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Navigator />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => App);
