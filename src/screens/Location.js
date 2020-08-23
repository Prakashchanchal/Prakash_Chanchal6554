import React,{useState} from 'react';
import 'react-native-gesture-handler';
import {Text,View,Button,TextInput,Image,TouchableOpacity,ImageBackground} from 'react-native'
import Geocoder from 'react-native-geocoding';
const Picture=(props)=>{
   const getData=()=>{
    Geocoder.init('AIzaSyCFW56wGaLxmrcrwA8jS0kpSXwHhmR4NGo');
    Geocoder.from({latitude : 41.89, longitude : 12.49})
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log(addressComponent);
		})
		.catch(error => console.warn(error));
}
    return(
    <View style={{justifyContent:'center',alignItems:'center',margin:30}}>
    <View style={{backgroundColor:'pink',elevation:80,
    borderRadius:25,
    backgroundColor:'white',
    height:550,
    width:300,
    marginBottom:2}}>
  <TouchableOpacity onPress={()=>{getData()}}>
      <Text>Location</Text>
  </TouchableOpacity>
  </View>
  </View>
  )
}
export default Picture;