import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import {inject, observer} from 'mobx-react';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Components from '../components/Components';
import Styles from '../styleSheet/Styles';
import productDetails from './ProductDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import shopingCart from './ShopingCart';
import {createDrawerNavigator} from 'react-navigation-drawer';
import LinearProductOverview from './LinearProductOverview';
import SortAsc from './SortAsc';
import SortDesc from './SortDesc';
import Modal from 'react-native-modal';
const ProductsOverview = (props) => {
  const {avilable, avilableItems, updateProductId, productId} = props.store;
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    initz();
  }, []);
  const initz = async () => {
    var raw = {
      category_id: 13,
      filter: '',
      page_num: 1,
      sort: '',
      customer_id: 96,
      wcode: 'DWK,HWH,S71',
    };

    const result = await Axios.post(
      'https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse',
      raw,
    );
    console.log(result.data);
    const newArray = result.data.data.items.map((item, index) => {
      console.log(item);
      return {
        id: item['product_id'],
        ownerId: 'u1',
        imageUrl: item['images'],
        productName: item.name,
        description: item.description,
        productPrice: item.price,
        specialPrice: item.special_price,
      };
    });
    avilableItems(newArray);
  };
  const toggleModel = () => {
    setModalVisible(true);
  };
  const toggle = () => {
    setDialogVisible(true);
  };
  const {navigate} = props.navigation;
  return (
    <View>
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          style={Styles.modal}>
          <View>
            <TouchableOpacity
              key={1}
              onPress={() => {
                navigate('ProductOverview'), setModalVisible(false);
              }}>
              <Text style={Styles.modalText}>Linear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                navigate('LinearProductOverview'), setModalVisible(false);
              }}>
              <Text style={Styles.modalText}>Grid</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={dialogVisible}
          style={Styles.modal}>
          <View>
            <TouchableOpacity
              key={3}
              onPress={() => {
                navigate('SortAsc'), setDialogVisible(false);
              }}>
              <Text style={Styles.modalText}>Asc-Desc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                navigate('SortDesc'), setDialogVisible(false);
              }}>
              <Text style={Styles.modalText}>Desc-Asc</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={Styles.cart}>
        <FontAwesome
          onPress={() => props.navigation.openDrawer()}
          name="bars"
          size={35}
          color="white"
        />
        <Text style={{fontSize: 26, color: 'white'}}>Grocery Shop</Text>
        <TouchableOpacity
        
          onPress={() => props.navigation.navigate('shopingCart')}>
          <FontAwesome name="shopping-cart" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{height: '94%'}}>
        <FlatList
          data={avilable}
          keyExtractor={(item) => item.key}
          renderItem={(itemData) => (
            <View>
              <ScrollView>
                <Components
                  image={itemData.item.imageUrl}
                  title={itemData.item.productName}
                  specialPrice={itemData.item.specialPrice}
                  result={
                    'save ₹' +
                    (itemData.item.productPrice - itemData.item.specialPrice)
                  }
                  price={'₹' + itemData.item.productPrice}
                  viewDetails={() => {
                    props.navigation.navigate('productDetails');
                    updateProductId(itemData.item.id);
                    console.log(productId);
                  }}
                  addCart={() => {
                    console.log('hello');
                  }}
                />
              </ScrollView>
            </View>
          )}
        />
        <View style={Styles.tabView}>
          <TouchableOpacity
            style={Styles.tabButton}
            onPress={() => toggleModel(true)}>
            <Text style={{fontSize: 28, color: 'purple'}}>Layout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.tabButton}
            onPress={() => toggle(true)}>
            <Text style={{fontSize: 28, color: 'purple'}}>Sorting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default inject('store')(observer(ProductsOverview));
