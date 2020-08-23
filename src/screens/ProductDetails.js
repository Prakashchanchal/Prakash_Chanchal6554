import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Axios from 'axios';
import {observer, inject} from 'mobx-react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addCart, addProducts} from '../database/UserHandler';
import shopingCart from './ShopingCart';
import Share from 'react-native-share';
const ProductDetail = (props) => {
  var count, item;
  const [des, setDes] = useState('');
  const [image, setImage] = useState('');
  const [review, setReview] = useState();
  const {
    avilable,
    productId,
    updateAppImage,
    appImage,
    productReview,
    updateProductReview,
    updateShopingCart,
    Email,
  } = props.store;
  let value, arr;
  for (let arr of avilable) {
    if (arr.id == productId) {
      value = arr;
    }
  }
  const results = value.productPrice - value.specialPrice;
  useEffect(() => {
    initz();
    initzi();
  }, []);
  const initz = async () => {
    var raw = {
      product_id: productId,
      customer_id: 96,
      wcode: 'DWK,HWH,S71',
    };

    const result = await Axios.post(
      'https://preprod.vestigebestdeals.com/api/rest/productdetails',
      raw,
    );
    setDes(result.data.data.descriptions);
    updateAppImage(value.imageUrl);
    console.log(result.data.data.app_image);
    updateAppImage(result.data.data.app_image);
    setImage(value.imageUrl);
  };
  const initzi = async () => {
    var raw = {
      product_id: productId,
      customer_id: 96,
      wcode: 'DWK,HWH,S71',
    };
    const reviews = await Axios.get(
      `https://preprod.vestigebestdeals.com/api/rest/getreview/productId/${value.id}`,
    );
    updateProductReview(reviews.data.data.reviewlist);
    console.log(reviews.data);
    console.log(reviews.data.data.reviewlist);
    console.log(productReview);
  };
  const shareData = async () => {
    const shareOptions = {
      message: value.productName,
      url: value.imageUrl,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
  };
  return (
    <View>
      <View style={styles.cart}>
        <FontAwesome
          onPress={() => props.navigation.openDrawer()}
          name="bars"
          size={35}
          color="white"
        />
        <Text style={{fontSize: 20, color: 'white'}}>Grocery Shop</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('shopingCart')}>
          <FontAwesome name="shopping-cart" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={shareData}>
          <View style={{flexDirection: 'row'}}>
            <Text>Share</Text>
            <FontAwesome name="share" size={30} color="skyblue" />
          </View>
        </TouchableOpacity>
        <Image style={styles.image} source={{uri: image}} />
        <FlatList
          data={appImage}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{flexDirection: 'row'}}
          renderItem={(itemData) => (
            <View>
              <TouchableOpacity
                style={styles.buttonImage}
                onPress={() => setImage(itemData.item)}>
                <Image style={styles.imageIcon} source={{uri: itemData.item}} />
              </TouchableOpacity>
            </View>
          )}
        />
        <Button
          color="red"
          title="Add to Cart"
          onPress={() => {
            const userDetails = {
              email: Email,
              name: value.productName,
              price: value.productPrice,
              id: value.id,
              specialPrice: value.specialPrice,
              uri: value.imageUrl,
            };
            // addproduct(userDetails)
            addProducts(userDetails);
            // addCart(userDetails);
            alert('added');
          }}
        />
        <Text style={{fontSize: 16}}>{value.productName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.specialPrice}>₹{value.specialPrice}</Text>
          <Text style={styles.price}>₹{value.productPrice}</Text>
          <Text style={styles.save}>Save ₹{results}</Text>
        </View>
        <View style={styles.viewProducts}>
          <Text style={styles.specialPrice}>Description:</Text>
          <Text style={styles.description}>{des}</Text>
        </View>
        <View>
          <Text style={styles.specialPrice}>Review</Text>
          <FlatList
            data={productReview}
            keyExtractor={(item, index) => String(index)}
            renderItem={(itemData) => (
              <View style={styles.viewProducts}>
                <Text style={{alignSelf: 'flex-end'}}>
                  {itemData.item.date}
                </Text>
                <Text style={styles.save}>Name:{itemData.item.nickname}</Text>
                <Text style={styles.save}>{itemData.item.detail}</Text>
                <Text style={styles.save}>{itemData.item.title}</Text>
                <Text style={styles.save}>
                  <FontAwesome name="star" size={20} color="green" />:{' '}
                  {itemData.item.vote}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    margin: 5,
  },
  imageIcon: {
    width: '100%',
    height: '100%',
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
  price: {
    flexDirection: 'row',
    fontSize: 16,
    color: '#888',
    margin: 3,
    textDecorationLine: 'line-through',
  },
  specialPrice: {
    flexDirection: 'row',
    fontSize: 20,
    color: 'maroon',
    margin: 5,
  },
  save: {
    flexDirection: 'row',
    fontSize: 15,
    margin: 5,
    color: 'maroon',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  viewProducts: {
    elevation: 7,
    borderRadius: 15,
    backgroundColor: 'white',
    height: 150,
    marginBottom: 2,
  },
  cart: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    justifyContent: 'space-between',
    elevation: 5,
  },
});
export default inject('store')(observer(ProductDetail));
