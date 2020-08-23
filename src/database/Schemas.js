
export const users={
    name:'User',
    primaryKey:'email',
    properties:{
        firstName:'string',
        lastName:'string',
        email:'string',
        password:'string',
        phoneNo:'string',
        uri:'string'
    }
}
export const Cart={
    name:'cart',
    primaryKey:'id',
    properties:{
        name:'string',
        price:'string',
        id:'string',
        specialPrice:'string',
        uri:'string'
    }
}
export const Product={
    name:'Product',
    properties:{
        name:'string',
        price:'string',
        id:'string',
        specialPrice:'string',
        uri:'string'
    }
}
export const Customers={
    name:'Customers',
    primaryKey:'email',
        properties:{
            email:'string',
            products:{type:'list',objectType:'Product'}
        }
}