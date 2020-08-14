import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Components from '../components/Components';
import styles from '../styleSheet/Styles';
import Axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductDetails from './ProductDetails';
import {inject, observer} from 'mobx-react';
import Modal from 'react-native-modal';
import ProductOverview from './ProductOverview';
import LinearProductOverview from './LinearProductOverview';
import SortDesc from './SortDesc';
const SortAsc = (props) => {
  const {avilable, avilableItems, updateProductId, productId} = props.store;
  const [data, setData] = useState([]);
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
    let newData = newArray;
    newData.sort(
      (High, Low) => parseInt(Low.productPrice) - parseInt(High.productPrice),
    );
    setData(newData);
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
          style={styles.modal}>
          <View>
            <TouchableOpacity
              key={1}
              onPress={() => {
                navigate('ProductOverview'), setModalVisible(false);
              }}>
              <Text style={styles.modalText}>Linear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={2}
              onPress={() => {
                navigate('LinearProductOverview'), setModalVisible(false);
              }}>
              <Text style={styles.modalText}>Grid</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={dialogVisible}
          style={styles.modal}>
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
      <View style={styles.sortingcontainer}>
        <Text style={styles.item}>GroceryShop</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            props.navigation.navigate('Cart');
          }}>
          <FontAwesome name="shopping-cart" color="white" size={35} />
        </TouchableOpacity>
      </View>
      <View style={{height:'87%'}}>
        <FlatList
          data={data}
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
      </View>
      <View style={styles.tabView}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => toggleModel(true)}>
          <Text style={{fontSize: 28, color: 'purple'}}>Layout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => toggle(true)}>
          <Text style={{fontSize: 28, color: 'purple'}}>Sorting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default inject('store')(observer(SortAsc));
