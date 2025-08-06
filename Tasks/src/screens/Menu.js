import React from 'react';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles';
import {Gravatar} from 'react-native-gravatar'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Menu(props) {

  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('AuthOrApp')
  }

  return (
    <DrawerContentScrollView {...props}>
          <View style={styles.container}>
            <View style={styles.header} >
                <Gravatar style={styles.avatar} options={{
                  email: props.route?.params?.email,
                  secure: true
                }} />
                <TouchableOpacity onPress={logout}>
                  <View style={styles.logoutIcon}>
                    <Icon name='sign-out' size={30} color='#800' /> 
                  </View>
                </TouchableOpacity>
          </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  avatar: {
    width: 60,
    height: 60,
    border: 3,
    borderRadius: 30,
    margin: 10,
    marginTop: 10
  },
    userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10
  }
});
