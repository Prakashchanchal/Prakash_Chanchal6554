import 'react-native-gesture-handler';
import * as React from 'react';
import {Picker,View,TouchableOpacity} from 'react-native'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator,NavigationStackOptions } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import gmailLogin from '../authentication/screens/gmailLogin'
import signUp from '../authentication/screens/SignUp'
import login from '../authentication/screens/Login'
import drawer from '../navigation/Drawer'
import productOverview from '../myShop/screens/ProductOverview'
import ProductDetails from '../myShop/screens/ProductDetails';
import LinearProductOverview from '../myShop/screens/LinearProductOverview'
import {createBottomTabNavigator} from 'react-navigation-tabs'
 import shopingCart from '../myShop/screens/ShopingCart'
import promocode from '../myShop/screens/Promocode'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SortAsc from '../myShop/screens/SortAsc'
import SortDesc from '../myShop/screens/SortDesc'
import UserDetails from '../authentication/screens/UserDetails'
const AppRouter=createStackNavigator(
    {    
        login:{screen:login,navigationOptions:{header:false}},
        UserDetails:UserDetails, 
        productOverview:{screen:productOverview,navigationOptions:{header:false}},
       SortDesc:{screen:SortDesc,navigationOptions:{header:false}},
       SortAsc:{screen:SortAsc,navigationOptions:{header:false}},
      //  productOverview:{screen:productOverview,navigationOptions:{header:false}},
        shopingCart:{screen:shopingCart,navigationOptions:{title:'ShoppingCart',headerTintColor:'white',headerStyle:{backgroundColor:'blue'}}},
        signUp:{screen:signUp,navigationOptions:{header:false}},
        gmailLogin:gmailLogin,
        //login:{screen:login,navigationOptions:{header:false}},
        productDetails:{screen:ProductDetails,navigationOptions:{header:false}},
        LinearProductOverview:{screen:LinearProductOverview,navigationOptions:{header:false}},
        promocode:promocode
    },
    
)
const AppDrawer=createDrawerNavigator(
    {
        dashboard:{
            screen:AppRouter
        }
    },

    {
        contentComponent:drawer,
    },
    
    
)
export default createAppContainer(AppDrawer);