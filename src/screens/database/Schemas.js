
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
    name:'product',
    primaryKey:'id',
    properties:{
        name:'string',
        price:'string',
        id:'string',
        specialPrice:'string',
        uri:'string'
    }
}
export const customer={
    name:'customer',
        properties:{
            email:'string',
            products:{type:'list',objectType:'product'}
        }
}

export const Customers={
    name:'customers',
        properties:{
            email:'string',
            products:{type:'list',objectType:'product'}
        }
}