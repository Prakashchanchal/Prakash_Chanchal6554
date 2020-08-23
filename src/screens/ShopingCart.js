import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
  Button,
} from 'react-native';
import {Cart, ShoppingCart, Customers, Product} from '../database/Schemas';
import Realm from 'realm';
import styles from '../stylesheet/Styles';
import Components from '../component/Components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import productDetails from './ProductDetails';
import promocode from './Promocode';
import {inject, observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import {addCart} from '../database/UserHandler';
const ShopingCart = (props) => {
  const {displayCart, promoValue, Email} = props.store;
  const [product, setProduct] = useState('');
  let realm,
    realms,
    total = '0',
    Save = '0',
    Price = '0',
    specialprice = '0',
    totalPrice;

  //realm = new Realm({ schema: [Cart] })
  // var object = realm.objects('cart')
  // console.log(object)
  // const getcart=async(email)=>{
  //   let realm;
  realm = new Realm({schema: [Customers, Product]});
  let allproduct = realm.objects('Customers');
  console.log(allproduct[0].products);
  for (let arr of allproduct) {
    if (arr.email == Email) {
      realms = arr.products;
    }
  }

  // }
  const deleteMovie = async () => {
    Realm.open({schema: [Customers, Product]}).then((realm) => {
      realm.write(() => {
        const user = realm.delete(
          realm.objects('Product').filtered(`id='${product}'`),
        );
      });
    });
  };
  for (let arr of realms) {
    total = parseInt(total) + parseInt(arr.specialPrice);
    Price = parseInt(Price) + parseInt(arr.price);
    specialprice = parseInt(specialprice) + parseInt(arr.specialPrice);
    totalPrice = parseInt(total) - parseInt(displayCart);
  }
  Save = parseInt(Price) - parseInt(total);
  console.log(displayCart);
  return (
    <View>
      <ScrollView>
        <FlatList
          data={realms}
          keyExtractor={(item) => item.key}
          renderItem={(itemData) => (
            <View>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  deleteMovie();
                }}>
                <FontAwesome name="close" size={30} />
              </TouchableOpacity>
              {setProduct(itemData.item.id)}

              <Text>{setProduct(itemData.item.id)}</Text>

              <Components
                image={itemData.item.uri}
                title={itemData.item.name}
                specialPrice={itemData.item.specialPrice}
                result={
                  'save ₹' + (itemData.item.price - itemData.item.specialPrice)
                }
                price={'₹' + itemData.item.price}
                addCart={() => {
                  console.log('hello');
                }}
              />
            </View>
          )}
        />
        {realms != '' ? (
          <View style={styles.Products}>
            <Button
              title="Apply Promocode"
              onPress={() => props.navigation.navigate('promocode')}
            />
            {promoValue != '' ? (
              total >= promoValue ? (
                <Text>Promocode Applied off of ₹{displayCart}</Text>
              ) : (
                <Text>enter valied promocode</Text>
              )
            ) : (
              <Text></Text>
            )}
            <View style={styles.ValueAdd}>
              <Text>price:</Text>
              <Text>₹{Price}</Text>
            </View>
            <View style={styles.ValueAdd}>
              <Text>SpecialPrice:</Text>
              <Text>₹{specialprice}</Text>
            </View>
            <View style={styles.ValueAdd}>
              <Text>save:</Text>
              <Text>₹{Save}</Text>
            </View>
            {promoValue != '' ? (
              total >= promoValue ? (
                <View>
                  <View style={styles.ValueAdd}>
                    <Text>discount:</Text>
                    <Text>₹{displayCart}</Text>
                  </View>
                  <View style={styles.ValueAdd}>
                    <Text>Total:</Text>
                    <Text>₹{totalPrice}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.ValueAdd}>
                  <Text>Total:</Text>
                  <Text>₹{total}</Text>
                </View>
              )
            ) : (
              <View style={styles.ValueAdd}>
                <Text>Total:</Text>
                <Text>₹{total}</Text>
              </View>
            )}
          </View>
        ) : (
          <Text>add items</Text>
        )}
        <Button title="BUY NOW" onPress={() => getcart()} />
      </ScrollView>
    </View>
  );
};
export default inject('store')(observer(ShopingCart));
