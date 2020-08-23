import {StyleSheet} from 'react-native'
export default StyleSheet.create(
    {
        TouchButton:{
            borderWidth:1,
            height:42,
            width:"60%",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
            backgroundColor:"skyblue",
            alignSelf:"center",

          },
        container:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'white'
            
            },
        text:{
            fontSize:16
        },
        textField: {
            color:'black', 
            height:50,
            width:300,
            backgroundColor:'white',
            paddingHorizontal:16,
             marginVertical:5,
             borderColor:'black',
             borderRadius:15,
             alignItems:"center",
             justifyContent:"center",
            borderWidth:1,
            elevation:5
                
          },
          textFieldName: {
            color:'black', 
            height:50,
            width:150,
            borderWidth:1,
            paddingHorizontal:16,
             marginVertical:10,
             borderRadius:15,
            backgroundColor:'white'
                
          },
          direction:{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center',
              elevation:5,
          },
            image:{
            width:"40%",
            borderRadius:100,
            height:"25%",
            marginVertical:10,
            alignItems: 'center',
            justifyContent: 'center'
          },
          headerImage:{
            borderRadius:60,
            width:100,
            height:100,
            backgroundColor:'grey',
          },
         headerDirection:{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'skyblue',
            marginBottom:20
        },
        headerText:{
            fontSize:16,
            color:'white',
            marginHorizontal:20

        },
        profileIcon:{
            fontSize:40,
            color:'white',
            alignSelf:'center',
            marginTop:20
        },
        userProfile:{
            fontSize:80,
            color:'purple',
            alignSelf:'center',
            marginTop:20
        },
        backgroundImage:{
            width:'100%',
            height:'100%',
            alignItems: 'center',
            justifyContent: 'center',
            
          },
          SplashScreen_RootView:  
    {  
        justifyContent: 'center',  
        flex:1,  
        margin: 10,  
        position: 'absolute',  
        width: '100%',  
        height: '100%',  
      },  
   
    SplashScreen_ChildView:  
    {  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#00BCD4',  
        flex:1,  
    },  
    mainContainer:{  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    }, 
        contain:{
            elevation:10,
            borderRadius:7,
            backgroundColor:'white',
            height:250,
            width:350,
            marginBottom:10,
            alignItems: 'center',
            justifyContent: 'center',
            margin:10 
        },
        uriImage:{
            width: "100%",
            borderRadius: 40,
            height: "100%"

        },
        cart:{
            flexDirection:'row',
            justifyContent:'space-between',
            elevation:3
        },
        updateText:{
            width:'60%',
            fontWeight:'bold'
        },
        updateImage:{
            height:'50%',
            width:'50%',
            alignSelf:'center'
        }

    }
)