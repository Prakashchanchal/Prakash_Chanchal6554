import 'react-native-gesture-handler';
import * as React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator,NavigationStackOptions } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import gmailLogin from '../screens/gmailLogin'
import signUp from '../screens/SignUp'
import login from '../screens/Login'
import drawer from './Drawer'
import productOverview from '../screens/ProductOverview'
import ProductDetails from '../screens/ProductDetails';
 import shopingCart from '../screens/ShopingCart'
import promocode from '../screens/Promocode'
import UserDetails from '../screens/UserDetails'
import Location from '../screens/Location'
const AppRouter=createStackNavigator(
    {    
        login:{screen:login,navigationOptions:{header:false}},
        UserDetails:UserDetails, 
        signUp:{screen:signUp,navigationOptions:{header:false}},
    },
)
const AppDashboard=createStackNavigator(
   { productOverview:{screen:productOverview,navigationOptions:{header:false}},
    shopingCart:{screen:shopingCart,navigationOptions:{title:'ShoppingCart',headerTintColor:'white',headerStyle:{backgroundColor:'blue'}}},
    productDetails:{screen:ProductDetails,navigationOptions:{header:false}},
    promocode:promocode,
    Location:Location
   })
const AppDrawer=createDrawerNavigator(
    {
        dashboard:{
            screen:AppDashboard
        }
    },
    {
        contentComponent:drawer,
    },    
)
const switchNavgator= createSwitchNavigator(
    {
        Login:{
            screen:AppRouter
        },
        Dashboard:{
            screen:AppDrawer
        }
    }
)
export default createAppContainer(switchNavgator);