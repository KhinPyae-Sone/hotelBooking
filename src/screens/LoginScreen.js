import React,{useEffect,useState} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity,StatusBar,ImageBackground,Dimensions,ToastAndroid} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/colors'
import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useDispatch } from 'react-redux';
import createUserAction from '../store/actions/createuser'

const width=Dimensions.get('screen').width
const LoginScreen=({navigation,route})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()

   const handleLogin=()=>{
  
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials=>{
        const user=userCredentials.user;

        console.log('Logged in with',user);
        AsyncStorage.getItem('createUser').then((res)=>{
            const createUserData=JSON.parse(res)

            if(createUserData == null){
                AsyncStorage.setItem('createUser',JSON.stringfy(user))
                dispatch(createUserAction.addToCreateUser(user))
            }
        })

        navigation.navigate('Drawer')
        successSignIn()
    })
    .catch(error=>alert(error.message))
    setEmail('')
    setPassword('') 

 } 
 
 const successSignIn=()=>{
    ToastAndroid.showWithGravityAndOffset(
        "Sign In Successful",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,50
    )
 }

 const unSucessSignIn=()=>{
    ToastAndroid.showWithGravityAndOffset(
        "Sign In UnSuccessful!!!!",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,50
    )

 }
 

    return(
        <View>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)'/>  
            <View style={{flex:0.001}}>
                 <ImageBackground  style={{width:width,height:width*2,opacity:0.7}} source={require('../../assets/icons/hotellogin.jpg')}/></View>
          {/* <HeaderComponent navigation={navigation} title='Log In' iconName='back'/> */}
          <View style={{width:'80%',height:60,borderWidth:1,borderRadius:5,borderColor:colors.blue,alignItems:'center',justifyContent:'center',marginLeft:30,marginTop:100,paddingHorizontal:20}}>
            <TextInput 
            placeholder="Email" 
            value={email}
            onChangeText={text=>setEmail(text)}/></View>
            <View style={{width:'80%',height:60,borderWidth:1,borderRadius:5,borderColor:colors.blue,alignItems:'center',justifyContent:'center',marginLeft:30,marginTop:20,paddingHorizontal:20}}>
            <TextInput  
            placeholder="password"
            value={password}
            onChangeText={text=>setPassword(text)}/></View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{backgroundColor:colors.blue,width:90,height:50,marginTop:20,borderRadius:10}} onPress={handleLogin}>
                <Text style={{color:colors.white,fontSize:16,paddingHorizontal:15,paddingVertical:10}}>Log In</Text>
            </TouchableOpacity></View>
            <View style={{flexDirection:'row',marginLeft:25}}>
     <Text style={{fontSize:16,marginTop:15,color:colors.blue}}>You don't have account?</Text>
     
      
            <TouchableOpacity style={{height:45,width:70,marginTop:5,alignItems:'center',justifyContent:'center',borderRadius:5}} 
            onPress={()=>navigation.navigate("SignUp")}>
                <Text style={{color:colors.blue,borderBottomWidth:1,borderColor:"#FF2600",fontWeight:'bold',fontSize:18}}>Sign Up</Text>
            </TouchableOpacity></View>
        </View>
    )
}

export default LoginScreen