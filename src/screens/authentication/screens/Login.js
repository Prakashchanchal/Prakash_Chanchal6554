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
import styles from '../styleSheet/style';
import {User, users, customer} from '../../database/Schemas';
import {addCustomer,addproduct} from '../../database/UserHandler';
import InputField from '../components/InputField';
import Realm from 'realm';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import signUp from './SignUp';
import productOverview from '../../myShop/screens/ProductOverview';
import splashSwitch from './splashSwitch'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
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
    updateSwitchValue
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
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
          updateUsername(arr.firstName);
          updateLastName(arr.lastName);
          updateUri(arr.uri);
          const userDetail = {
            username: arr.password,
            email: arr.email,
          };
          props.navigation.navigate('productOverview');
          return true;
        }
      }
      alert('enter the correct username and password');
      return false;
    }
  };
  toggleSwitch=(value) => {updateSwitchValue(value)
  }
  return (
    <View style={styles.container}>
       <ImageBackground source={require('../../../../assests/cloud.jpg')} style={styles.backgroundImage}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../../../assests/white.jpg')}>
        <View style={styles.container}>
          <Image
            source={require('../../../../assests/veggie.png')}
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
