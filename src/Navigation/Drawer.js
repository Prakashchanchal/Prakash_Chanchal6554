import React, {useState} from 'react';
import 'react-native-gesture-handler';
import signUp from '../screens/SignUp';
import UserDetails from '../screens/UserDetails'
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import login from '../screens/Login';
import styles from '../stylesheet/style';
import {User} from '../database/Schemas';
import {observer, inject} from 'mobx-react';
import Realm from 'realm';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import shopingCart from '../screens/ShopingCart';
import {deleteCart} from '../database/UserHandler';
import {createDrawerNavigator} from 'react-navigation-drawer';
const DrawerMenu = (props) => {
  const {
    Email,
    name,
    uri,
    updateFirstname,
    deleteUsername,
    lastName,
  } = props.store;

  let items = [
    {
      navOptionName: 'Logout',
      screenToNavigate: 'logout',
    },
  ];
  const handleClick = (index, screenToNavigate) => {
    let update = '';
    if (screenToNavigate == 'logout') {
      props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure? You want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              deleteUsername();
              props.navigation.navigate('login');
              console.log('logout');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      props.navigation.navigate(screenToNavigate);
    }
  };
  return (
    <View>
      <View style={styles.headerDirection}>
        {name != '' ? (
          <View>
            <TouchableOpacity  style={styles.headerImage} onPress={()=>props.navigation.navigate('UserDetails')}>
              {uri != '' ? (
                <Image source={{uri: uri}} style={styles.uriImage} />
              ) : (
                <Text
                  style={styles.profileIcon}>{`${name[0]}${lastName[0]}`}</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.headerText}>{'Welcome! ' + name}</Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.headerImage}
              onPress={() => props.navigation.navigate('login')}>
              <FontAwesome
                name="user"
                size={100}
                style={{alignSelf: 'center'}}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Login.SignUp</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{margin: 20}}
        onPress={() => props.navigation.navigate('shopingCart')}>
        <View style={styles.cart}>
          <Text style={{fontSize: 16}}>MyCart</Text>
          <FontAwesome name="shopping-cart" size={30} color="maroon" />
        </View>
      </TouchableOpacity>
      <View style={{width: '100%', flex: 1, marginStart: 20}}>
        {items.map((item, key) => (
          <View
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }>
            <Text style={{fontSize: 15}}>{item.navOptionName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default inject('store')(observer(DrawerMenu));
