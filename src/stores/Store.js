import {observable,action,decorate} from 'mobx';
import Realm from 'realm'
class Store{
     Email=''
     Password=''
     name=''
     uri=''
     lastName=''
     avilable=[]
     productId=''
     appImage
     productReview
     shopingCart=[]
     displayCart=''
     promoValue=''
     switchValue=false
updateEmail=(text)=>{
    this.Email=text
}
updatePassword=(text)=>{
    this.Password=text
}
updateUsername=(text)=>{
    this.name=text
}
updateUri=(text)=>{
    this.uri=text
} 
updateLastName=(text)=>{
    this.lastName=text
}
deleteUsername=()=>{
    this.name=''
    this.Password=''
    this.Email=''
    this.uri=''
}
avilableItems=(text)=>{
    this.avilable=text
}
updateProductId=(text)=>{
    this.productId=text
}
updateAppImage=(text)=>{
    this.appImage=text
}
updateProductReview=(text)=>{
    this.productReview=text
}
updateShopingCart=(text)=>{
    this.shopingCart=text
}
updateDisplayCart=(text)=>{
    this.displayCart=text
}
updatePromoValue=(text)=>{
    this.promoValue=text
}
updateSwitchValue=(text)=>{
    this.switchValue=text
}
}
decorate(Store,{
    Email:observable,
    Password:observable,
    updatePassword:action,
    updateEmail:action,
    uri:observable,
    lastName:observable,
    name:observable,
    avilable:observable,
    productId:observable,
    appImage:observable,
    productReview:observable,
    shopingCart:observable,
    displayCart:observable,
    promoValue:observable,
    switchValue:observable,
    updateSwitchValue:action,
    updatePromoValue:action,
    updateDisplayCart:action,
    updateShopingCart:action,
    updateProductReview:action,
    updateAppImage:action,
    updateProductId:action,
    updateLastName:action,
    updateUsername:action,
    updateUri:action,
    deleteUsername:action,
    avilableItems:action
})
export default new Store();