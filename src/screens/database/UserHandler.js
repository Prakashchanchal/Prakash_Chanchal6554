import { users,Cart,customer,Product,Customers } from './Schemas';

const Realm = require('realm');
import {} from 'mobx-react'
export const addUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [users] })
    .then(realm => {
      realm.write(() => {
        const add = realm.create('User', userDetails);
        resolve();
        console.log(add)
      });
    })
    .catch(error => {
      reject(error);
    });;
});
export const addCart = async (userDetail) => new Promise((resolve, reject) => {
  Realm.open({ schema: [Cart] })
    .then(realm => {
      realm.write(() => {
        const add = realm.create('cart', userDetail);
        resolve();
        console.log(add)
      });
    })
    .catch(error => {
      reject(error);
    });;
});
export const addproduct = async (userEmail,userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [Customers,Product] })
    .then(realm => {
      realm.write(() => {
        const addProduct = realm.create('customers',{email:`${userEmail}`,products:[]});
        addProduct.products.push({name:userDetails.name,id:userDetails.id})
        resolve();
        console.log(addProduct)
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const updateUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [users] })
    .then(realm => {
      realm.write(() => {
        realm.create('User',{firstName:userDetails.firstName,lastName:userDetails.lastName,phoneNo:userDetails.phoneNo,email:userDetails.email,password:userDetails.password},'modified' );
        resolve();
        console.log('done')
      });
    })
    .catch(error => {
      reject(error);
    });;
});
