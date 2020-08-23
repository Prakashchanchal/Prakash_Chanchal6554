import 'react-native-gesture-handler';
import React, {useState, useContext, Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {addUser} from '../database/UserHandler';
import styles from '../stylesheet/style';
import {User, users, customer} from '../database/Schemas';
import {addCustomer, addproduct} from '../database/UserHandler';
import InputField from '../component/InputField';
import Realm from 'realm';
import {observable, action, values} from 'mobx';
import {observer, inject} from 'mobx-react';
import signUp from './SignUp';
import productOverview from './ProductOverview';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import UserDetails from './UserDetails';
const Login = (props) => {
  const {
    Email,
    Password,
    updateEmail,
    updateLastName,
    updatePassword,
    name,
    uri,
    updateUsername,
    updateUri,
    switchValue,
    updateSwitchValue,
  } = props.store;
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo });
      console.log(userInfo);
    } catch (error) {
      console.log({error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '371580634969-laeupeicl9uuvqipddh99k2hfj19d2p6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      forceConsentPrompt: true,
    });
  }, []);
  const validation = () => {
    console.log(Email);
    let realm;
    realm = new Realm({schema: [users]});
    var object = realm.objects('User');
    console.log(object);
    if (Email == '') {
      alert('fill the username');
      return false;
    } else if (Password == '') {
      alert('fill the password');
      return false;
    } else if (Email === Email || Password != null) {
      for (let arr of object) {
        if (arr.email == Email && arr.password == Password) {
          console.log(arr);
          updateUsername(arr.firstName);
          updateLastName(arr.lastName);
          updateUri(arr.uri);
          console.log(name);
          props.navigation.navigate('productOverview');
          return true;
        }
      }
      alert('enter the correct username and password');
      return false;
    }
  };
  const get_Response_Info = (error, result) => {
    if (error) {
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
      const userDetails = {
        firstName: result.name,
        lastName: '',
        email: result.id,
        password: '',
        phoneNo: '',
        uri: result.picture.data.url,
      };
      let realm;
      realm = new Realm({schema: [users]});
      var object = realm.objects('User');
      for (let arr of object) {
        if (arr.email == result.id) {
          var value = arr;
        }
      }
      if (value.email != result.id) {
        addUser(userDetails);
        updateUsername(result.name);
        updateUri(result.picture.data.url);
        props.navigation.navigate('productOverview');
      } else {
        //console.log(arr)
        updateUsername(value.firstName);
        updateLastName(value.lastName);
        updateUri(value.uri);
        props.navigation.navigate('productOverview');
      }
    }
  };
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('../../assests/cloud.jpg')}
        style={styles.backgroundImage}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../assests/white.jpg')}>
          <View style={styles.container}>
            <Image
              source={require('../../assests/veggie.png')}
              style={styles.image}
            />
            <View style={styles.contain}>
              <Text style={{marginStart: 30, alignSelf: 'flex-start'}}>
                {' '}
                Email Address
              </Text>
              <InputField
                value={Email}
                onChangeText={updateEmail}
                placeholder={'Enter Email id'}
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.textField}
              />
              <Text style={{marginStart: 30, alignSelf: 'flex-start'}}>
                {' '}
                Password
              </Text>
              <InputField
                value={Password}
                placeholder={' Enter Password'}
                secureTextEntry={true}
                underlineColorAndroid="rgba(0,0,0,0)"
                onChangeText={updatePassword}
                style={styles.textField}
              />
            </View>
            <TouchableOpacity style={styles.TouchButton} onPress={validation}>
              <Text>SIGNIN</Text>
            </TouchableOpacity>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />
            <LoginButton
              readPermissions={['public_profile', 'email']}
              onLoginFinished={(error, result) => {
                if (error) {
                  alert(error);
                  alert('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  alert('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    const processRequest = new GraphRequest(
                      '/me?fields=email,name,picture.type(large)',
                      null,
                      get_Response_Info,
                    );
                    new GraphRequestManager()
                      .addRequest(processRequest)
                      .start();
                  });
                }
              }}
            />
            <View style={styles.direction}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Create new account,{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('signUp')}>
                <Text
                  style={{fontWeight: 'bold', color: 'skyblue', fontSize: 16}}>
                  signUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};
export default inject('store')(observer(Login));
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});
