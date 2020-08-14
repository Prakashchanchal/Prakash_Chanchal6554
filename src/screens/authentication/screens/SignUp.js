import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button,
  TouchableHighlightBase,
} from 'react-native';
import Realm from 'realm';
import styles from '../styleSheet/style';
import InputFiled from '../components/InputField';
import ImagePicker from 'react-native-image-picker';
import {addUser} from '../../database/UserHandler';
import {TextInput} from 'react-native-gesture-handler';
import login from './Login';
export default class signUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNo: '',
      filePath: {},
      uri: '',
      isNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
    };
  }
  validateName = () => {
    const nameFormat = /^[a-zA-Z]+$/;
    nameFormat.test(this.state.username)
      ? this.setState({isNameValid: true})
      : this.setState({isNameValid: false});
  };
  validateEmail = () => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    emailFormat.test(this.state.email)
      ? this.setState({isEmailValid: true})
      : this.setState({isEmailValid: false});
  };
  validatePassword = () => {
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    passwordFormat.test(this.state.password)
      ? this.setState({isPasswordValid: true})
      : this.setState({isPasswordValid: false});
  };
  validation = () => {
    const emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernamereg = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (
      this.state.firstName == '' ||
      this.state.email == '' ||
      this.state.password == null ||
      this.state.phoneNo == '' ||
      this.state.lastName == ''
    ) {
      alert('Enter value in all fields');
    } else {
      const userDetails = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        phoneNo: this.state.phoneNo,
        uri: this.state.uri,
      };
      addUser(userDetails);
      alert('sucessfully registered');
    }
  };
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
        this.setState({uri: this.state.filePath.uri});
      }
      console.log(this.state.uri);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.chooseFile.bind(this)}
          style={styles.image}>
          {this.state.uri != '' ? (
            <Image
              source={{uri: this.state.uri}}
              style={{width: '100%', borderRadius: 100, height: '100%'}}
            />
          ) : (
            <Image
              style={{width: '100%', borderRadius: 100, height: '100%'}}
              source={require('../../../../assests/addprofile.jpg')}
            />
          )}
        </TouchableOpacity>
        <View style={styles.direction}>
          <TextInput
            placeholder="firstname"
            style={styles.textFieldName}
            value={this.state.firstName}
            onChangeText={(data) => {
              this.validateName();
              this.setState({firstName: data});
            }}
          />
          <TextInput
            placeholder="lastName"
            style={styles.textFieldName}
            value={this.state.lastName}
            onChangeText={(data) => {
              this.validateName();
              this.setState({lastName: data});
            }}
          />
        </View>
        <InputFiled
          placeholder="Email"
          style={styles.textField}
          value={this.state.email}
          onChangeText={(data) => {
            this.validateEmail();
            this.setState({email: data});
          }}
        />
        {!this.state.isEmailValid && (
          <Text style={styles.title}>Enter Valid Email</Text>
        )}
        <InputFiled
          placeholder="Password"
          style={styles.textField}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(data) => {
            this.validatePassword();
            this.setState({password: data});
          }}
        />
        {!this.state.isPasswordValid && (
          <Text style={styles.title}>Enter Valid Password</Text>
        )}
        <InputFiled
          placeholder="Mobile Number"
          style={styles.textField}
          value={this.state.phoneNo}
          onChangeText={(data) => this.setState({phoneNo: data})}
        />
        <TouchableOpacity
          style={styles.TouchButton}
          onPress={() => {
            this.validation();
          }}>
          <Text>Register</Text>
        </TouchableOpacity>
        <View style={styles.direction}>
          <Text>already account, </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={{color: 'skyblue'}}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
