import React, { Component } from 'react';  
 import { Platform, StyleSheet, View, Text,Image, TouchableOpacity, Alert,StatusBar} from 'react-native';  
import { StackActions } from 'react-navigation';
import loginScreen from './loginScreen'
import styles from '../styleSheet/style'
 export default class splashscreen extends React.Component 
{  
   constructor(){  
     super();  
     this.state={  
     isVisible : true,  
    }  
  }  
   Hide_Splash_Screen=()=>{  
    this.setState({   
      isVisible : false   
    });  
  }  
  componentDidMount(){  
    StatusBar.setHidden(false);
    var that = this;  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 5000);  
   }  
    render()  
    {  
        let Splash_Screen = (  
             <View style={styles.SplashScreen_RootView}>  
                 <View style={styles.SplashScreen_ChildView}>  
                  <Image source={require('../../assests/splash.png')}  
                    style={{width:'100%', height: '100%'}} />  
                </View>  
             </View> )  
         return(  
             <View style = { styles.mainContainer }>  
               {  
                  (this.state.isVisible === true) ? Splash_Screen :  this.props.navigation.navigate('loginScreen')
                 
                 }
            </View> 
         );  
    }  
}  
