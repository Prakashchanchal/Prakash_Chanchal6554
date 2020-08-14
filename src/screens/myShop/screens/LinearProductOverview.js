import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, Image, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {inject, observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import Components from '../components/Components';
import Styles from '../styleSheet/Styles';
import productDetails from './ProductDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styleSheet/Styles';
import Modal from 'react-native-modal';
const LinearProductsOverview = (props) => {
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
  const toggleModel = (visible) => {
    setModalVisible(visible);
  };
  const toggle = () => {
    setDialogVisible(true);
  };
  const {navigate} = props.navigation;
  return (
    <View>
      <View>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalVisible}
          style={styles.modal}>
          <View>
            <TouchableOpacity
              key={3}
              onPress={() => {
                navigate('productOverview'), setModalVisible(false);
              }}>
              <Text style={styles.modalText}>Linear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={4}
              onPress={() => {
                navigate('linearProductOverview'), setModalVisible(false);
              }}>
              <Text style={styles.modalText}>Grid</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
                <Text style={styles.modalText}>Asc-Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                key={4}
                onPress={() => {
                  navigate('SortDesc'), setDialogVisible(false);
                }}>
                <Text style={styles.modalText}>Desc-Asc</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={styles.cart}>
          <FontAwesome
            onPress={() => props.navigation.openDrawer()}
            name="bars"
            size={35}
            color="white"
          />
          <Text style={{fontSize: 26, color: 'white'}}>Grocery Shop</Text>
          <TouchableOpacity>
            <FontAwesome name="shopping-cart" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{height: '87%'}}>
          <FlatList
            data={avilable}
            keyExtractor={(item) => item.key}
            numColumns={2}
            renderItem={(itemData) => (
              <View style={{width: 175, margin: 5}}>
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
            )}
          />
        </View>
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
export default inject('store')(observer(LinearProductsOverview));
