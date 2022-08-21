import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity,SafeAreaView,StatusBar,ImageBackground,Dimensions,ToastAndroid} from 'react-native'
import { auth } from '../../firebase';
import BottomTabComponent from '../components/BottomTabComponent';
import colors from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import countSignAction from '../store/actions/count'
import { useDispatch } from 'react-redux';
import createUserAction from '../store/actions/createuser'
import nameAction from '../store/actions/auth'
import wishlistAction from '../store/actions/wishlist'
import wListQtyAction from '../store/actions/wishqty'
import bookingAction from '../store/actions/booking'
import qtyAction from '../store/actions/qty'
import reviewAction from '../store/actions/reviewlist'
const width=Dimensions.get('screen').width
const SignUpScreen=({navigation,route})=>{
    const dispatch=useDispatch()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')

    const successRegister=()=>{
        ToastAndroid.showWithGravityAndOffset(
            "Completely Register!!",
    
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        )
     }

     const unSuccessRegister=()=>{
        ToastAndroid.showWithGravityAndOffset(
            "Register Unsuccessful!!",
    
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,50
        )
     }
    
     const emailValidation = (value) => {

        let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
        if(emailPattern.test(value) === false){
  
          setEmailValid('Please Enter Valid Email Address!')
    
        }else{
   
          setEmailValid('')
  
  
        }
  
      }
  
      const passwordValidation = (value) => {
  
        if(value.length < 6){
  
          setPassValid('Please Enter at least 6 characters')
  
  
        }else{
  
          setPassValid('')
  
  
        }
  
      }
  
   
const handleSignUp=()=>{
   

    AsyncStorage.removeItem('wishlist')
     dispatch(wishlistAction.addToWishList([]))

    AsyncStorage.removeItem('wishListQty')
    dispatch(wListQtyAction.setWishQty(0))

    AsyncStorage.removeItem('hotel')
    dispatch(bookingAction.addToBooking([]))

    AsyncStorage.removeItem('bookingQty')
    dispatch(qtyAction.setTotalQty(0))

    AsyncStorage.removeItem('reviewList')
    dispatch(reviewAction.addToReview([]))

    if(name != '' && email !='' && password != ''){
    AsyncStorage.getItem('userInfo').then((res)=>{
        const userData=JSON.parse(res)
        let userArr=[]
        if(userData == null){
            userArr.push(name)

            AsyncStorage.setItem('userInfo',JSON.stringify(userArr))
            dispatch(nameAction.addToAuth(userArr))
        }else{
            userData.push(name)
            AsyncStorage.setItem('userInfo',JSON.stringify(userData))
            dispatch(nameAction.addToAuth(userData))
        }
    })


    auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials=>{
        const user=userCredentials.user;

        console.log('Signed Up with',user.email);
        AsyncStorage.getItem('createUser').then((res)=>{
            const createUserData=JSON.parse(res)

            if (createUserData == null){
                AsyncStorage.setItem('createUser', JSON.stringify(user))
                dispatch(createUserAction.addToCreateUser(user))
            }
        })
        successRegister()
        navigation.navigate('Drawer')
        
        setEmail('')
        setPassword('')

    })
    .catch(error=>alert(error.message))
    setName('')
    setEmail('')
    setPassword('')
}else{
    unSuccessRegister()}
}



  
    return(
        <SafeAreaView style={{flex:1}}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>  
            <View style={{flex:0.001}}>
                 <ImageBackground  style={{width:width,height:width*2,opacity:1}} source={require('../../assets/icons/hotel.jpg')}/></View>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>

            <View   style={{width:'80%',height:60,borderWidth:1,borderRadius:5,marginTop:5,borderColor:colors.blue,alignItems:'center',justifyContent:'center'}}>
            <TextInput
            
            value={name}
            placeholder="Name"
            placeholderTextColor={colors.blue}
            onChangeText={text=>setName(text)}/></View>
                <View   style={{width:'80%',height:60,borderWidth:1,borderRadius:5,marginTop:5,borderColor:colors.blue,alignItems:'center',justifyContent:'center'}}>
            <TextInput
            
            value={email}
            placeholder="Email"
            placeholderTextColor={colors.blue}
            onChangeText={text=>setEmail(text)}/></View>

             <View   style={{width:'80%',height:60,borderWidth:1,borderRadius:5,marginTop:5,borderColor:colors.blue,alignItems:'center',justifyContent:'center'}}>
            <TextInput
            
            placeholder="Password"
            placeholderTextColor={colors.blue}
            value={password}
            onChangeText={text=>setPassword(text)}
            secureTextEntry={true}/>
            </View>
            
            <TouchableOpacity style={{backgroundColor:colors.blue,height:45,width:70,marginTop:5,alignItems:'center',justifyContent:'center',borderRadius:5}} 
            onPress={handleSignUp}>
                <Text style={{color:colors.white}}>SignUp</Text>
            </TouchableOpacity>
            

        

            </View>
            

            
        </SafeAreaView>
        
       
    )
}

export default SignUpScreen