import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import Realm from 'realm';
import {users} from '../../database/Schemas';
import {inject, observer} from 'mobx-react';
import {updateUser} from '../../database/UserHandler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styleSheet/style';
const UserDetails = (props) => {
  var value;
  const {Email, name, lastName, updateUsername, updateLastName} = props.store;
  const [display, SetDisplay] = useState();
  const [firstname, SetFirstName] = useState('');
  const [lastname, SetLastName] = useState('');
  const [phoneNo, SetPhoneNo] = useState('');
  const [editable, setEditable] = useState(false);
  realm = new Realm({schema: [users]});
  var object = realm.objects('User');
  console.log(object);
  for (let array of object) {
    if (array.email == Email) {
      value = array;
    }
  }
  console.log(value);

  return (
    <View>
        {(value.uri!='')?
      <Image style={styles.updateImage} source={{uri: value.uri}} />:
  <Text style={styles.userProfile}>{`${name[0]}${lastName[0]}`}</Text>}
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 13}}>firstName </Text>
        <TextInput
          style={styles.updateText}
          placeholder={value.firstName}
          value={firstname}
          onChangeText={(text) => {
            SetFirstName(text);
          }}
          editable={editable}
        />
        <TouchableOpacity
          style={{marginTop: 13}}
          onPress={() => {
            setEditable(true),
              SetFirstName(value.firstName),
              SetLastName(value.lastName),
              SetPhoneNo(value.phoneNo);
          }}>
          <FontAwesome name="edit" size={40} color="purple" />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 13}}>lastName: </Text>
        <TextInput
          style={styles.updateText}
          placeholder={value.lastName}
          value={lastname}
          onChangeText={(text) => {
            SetLastName(text);
          }}
          editable={editable}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 13}}>Email: </Text>
        <TextInput
          style={styles.updateText}
          placeholder={value.email}
          editable={false}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 13}}>phoneNo: </Text>
        <TextInput
          style={styles.updateText}
          placeholder={value.phoneNo}
          value={phoneNo}
          onChangeText={(text) => {
            SetPhoneNo(text);
          }}
          editable={editable}
        />
      </View>
      <Button
        title="save"
        onPress={() => {
          const UserDetails = {
            firstName: firstname,
            lastName: lastname,
            phoneNo: phoneNo,
            email: value.email,
            password: value.password,
          };
          updateUser(UserDetails);
          updateUsername(firstname);
          updateLastName(lastname);
        }}
      />
    </View>
  );
};
export default inject('store')(observer(UserDetails));
