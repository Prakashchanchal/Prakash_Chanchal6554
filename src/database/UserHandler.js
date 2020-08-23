import { users,Cart,Product,Customers } from './Schemas';

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
export const addProducts = userDetails=> new Promise((resolve, reject) => {
  Realm.open({ schema: [Customers,Product] })
    .then(realm => {
      realm.write(() => {
       let Customers = realm.objectForPrimaryKey('Customers',userDetails.email);
        if(Customers !=null)
        {
       Customers.products.push({
              name:userDetails.name,
              price:userDetails.price,
              id:userDetails.id,
              specialPrice:userDetails.specialPrice,
              uri:userDetails.uri
            })
            console.log(Customers)
          }
          else
          {
            let newAddShopping=realm.create('Customers',userDetails);
           newAddShopping.products.push({
              name:userDetails.name,
              price:userDetails.price,
              id:userDetails.id,
              specialPrice:userDetails.specialPrice,
              uri:userDetails.uri
          })
        resolve();
      };
    })
  }).catch(error => {
      reject(error);
    }); 

})
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
