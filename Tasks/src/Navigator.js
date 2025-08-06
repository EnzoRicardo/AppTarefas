import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from './screens/Auth';
import AuthOrApp from './screens/AuthOrApp';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu'
import commonStyles from './commonStyles';

const menuConfig = {
  initialRouteName : 'Today',
  contentComponent : Menu,
  contentOptions : {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: '20'
    },
    activeLabelStyle: {
      fontWeight: 'bold',
      color: '#080',
    }
  }
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function MenuDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#333',
        drawerInactiveTintColor: '#000',
        drawerLabelStyle: {
          fontFamily: commonStyles.fontFamily,
          fontWeight: 'normal',
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen name="Hoje">
        {props => <TaskList title="Hoje" daysAhead={0} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Amanhã">
        {props => <TaskList title="Amanhã" daysAhead={1} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Semana">
        {props => <TaskList title="Semana" daysAhead={7} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Mês">
        {props => <TaskList title="Mês" daysAhead={30} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthOrApp">
        <Stack.Screen name="AuthOrApp" component={AuthOrApp} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MenuDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
