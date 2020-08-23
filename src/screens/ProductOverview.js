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
import Components from '../component/Components';
import Styles from '../stylesheet/Styles';
import productDetails from './ProductDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import shopingCart from './ShopingCart';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {set} from 'mobx';
import Modal from 'react-native-modal';
const ProductsOverview = (props) => {
  const {avilable, avilableItems, updateProductId, productId} = props.store;
  const [dialogVisible, setDialogVisible] = useState('Grid');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
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
    let newData = newArray;
    setData(newData);
  };
  const productItem = (itemData) => {
    if (dialogVisible == 'Linear') {
      return (
        <View style={{width: 175, margin: 5}}>
          <View>
            <Components
              image={itemData.item.imageUrl}
              title={itemData.item.productName}
              specialPrice={itemData.item.productPrice}
              viewDetails={() => {
                props.navigation.navigate('productDetails');
                updateProductId(itemData.item.id);
                console.log(productId);
              }}
            />
          </View>
        </View>
      );
    }
    return (
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
    );
  };
  const toggle = () => {
    if (dialogVisible == 'Grid') {
      setDialogVisible('Linear');
    } else {
      setDialogVisible('Grid');
    }
  };
  const change = () => {
    if (dialogVisible == 'Grid' || dialogVisible == 'Linear') {
      return avilable;
    } else if (dialogVisible == 'SortDesc') {
      let value = data.sort(
        (High, Low) => parseInt(High.productPrice) - parseInt(Low.productPrice),
      );
      return value;
    } else {
      let values = data.sort(
        (High, Low) => parseInt(Low.productPrice) - parseInt(High.productPrice),
      );
      return values;
    }
  };
  const {navigate} = props.navigation;
  return (
    <View>
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
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={visible}
          style={Styles.modal}>
          <View>
            <TouchableOpacity
              key={1}
              onPress={() => {
                setDialogVisible('SortDesc'), setVisible(false);
              }}>
              <Text style={Styles.modalText}>Asc-Desc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                setDialogVisible('SortAsc'), setVisible(false);
              }}>
              <Text style={Styles.modalText}>Desc-Asc</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={{height: '94%'}}>
        <FlatList
          data={change()}
          keyExtractor={(item, index) => String(index)}
          numColumns={dialogVisible == 'Linear' ? 2 : null}
          key={dialogVisible == 'Linear' ? 2 : 1}
          renderItem={(itemData) => productItem(itemData)}
        />
        <View style={Styles.tabView}>
          <TouchableOpacity
            style={Styles.tabButton}
            onPress={() => {
              toggle();
            }}>
            {dialogVisible == 'Grid' || dialogVisible == 'Linear' ? (
              <Text style={{fontSize: 28, color: 'purple'}}>
                {dialogVisible}
              </Text>
            ) : (
              <Text style={{fontSize: 28, color: 'purple'}}>Linear</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.tabButton}
            onPress={() => {
              setVisible(true);
            }}>
            <Text style={{fontSize: 28, color: 'purple'}}>SortAsc</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default inject('store')(observer(ProductsOverview));
