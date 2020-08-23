import React from 'react';
import {Text,View,TouchableOpacity,Image, Button} from 'react-native'
import { PropTypes } from 'mobx-react';
import styles from '../stylesheet/Styles'
const Components=props=>{
    return(
         <TouchableOpacity onPress={props.viewDetails}> 
          <View style={styles.viewProducts}> 
          <View style={{flexDirection:'row'}}>
            <Image style={styles.viewImage} source={{uri:props.image}}/>
            <View style={styles.details}>
            <Text style={styles.title} numberOfLines={5}>{props.title}</Text>
            <View style={{flexDirection:"row",alignItems:'flex-start'}}>
            <Text style={styles.price}>₹{props.specialPrice}</Text>
            <Text style={styles.priceTag} >{props.price}</Text>
            <Text style={styles.save}>{props.result}</Text>
            </View>
            </View>
            </View>
            </View>
            
            </TouchableOpacity>
    )
}
export default Components;