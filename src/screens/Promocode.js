import React from 'react'
import {View,Text,Button} from 'react-native'
import styles from '../stylesheet/Styles'
import {inject,observer} from 'mobx-react'
import shopingCart from './ShopingCart'
const Promocode=props=>{
const {displayCart,updateDisplayCart,updatePromoValue}=props.store;
var display1=10, display2=20,display3=40,value=50,value1=100,value3=150
return(
    <View>
<View style={styles.viewPromo}>
<Text style={styles.promoText}>Get {display1} Rupees off in shopping of more than {value}</Text>
    <Button title='Apply' onPress={()=>{updateDisplayCart(display1),updatePromoValue(value),props.navigation.navigate('shopingCart')}}/>
</View>
<View style={styles.viewPromo}>
<Text style={styles.promoText}>Get {display2} Rupees off in shopping of more than {value1}</Text>
    <Button title='Apply' onPress={()=>{updateDisplayCart(display2),updatePromoValue(value1),props.navigation.navigate('shopingCart')}}/>
</View>
<View style={styles.viewPromo}>
<Text style={styles.promoText}>Get {display3} Rupees off in shopping of more than {value3}</Text>
    <Button title='Apply' onPress={()=>{updateDisplayCart(display3),updatePromoValue(value3),props.navigation.navigate('shopingCart')}}/>
</View>
</View>
)
}
export default inject('store')(observer(Promocode));