import React, { useEffect,useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen';
import BookNowScreen from '../screens/BookNowScreen'
import WishListScreen  from '../screens/WishListScreen';
import DrawerCustomComponent from './DrawerComponent'
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ProfileScreen from '../screens/ProfileScreen'
import HelpScreen from '../screens/HelpScreen';
import customerServiceScreen from '../screens/customerServiceScreen'
import BookingListScreen from '../screens/BookingListScreen'
import MapScreen from '../screens/MapScreen'
import ReviewScreen from '../screens/ReviewScreen'
import ModalScreen from '../screens/modalScreen'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import countSignAction from '../store/actions/count'




const Stack=createNativeStackNavigator();
const Drawer=createDrawerNavigator()

function DrawerNavigation(){
  return(
    <Drawer.Navigator
      screenOptions={{headerShown:false}}
        drawerContent={(props) => <DrawerCustomComponent {...props}/>}>
    
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Detail" component={DetailScreen} />
        <Drawer.Screen name="BookNow" component={BookNowScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="WishList" component={WishListScreen} />
        <Drawer.Screen name="About" component={AboutUsScreen} />
        <Drawer.Screen name="Contact" component={ContactUsScreen} />
        <Drawer.Screen name="Help" component={HelpScreen}/>
        <Drawer.Screen name="Customer" component={customerServiceScreen}/>
        <Drawer.Screen name="BookingList" component={BookingListScreen}/>
        <Drawer.Screen name="Map" component={MapScreen}/>
        <Drawer.Screen name="Review" component={ReviewScreen}/>
        <Drawer.Screen name="Modal" component={ModalScreen}/>
      
        


      </Drawer.Navigator>
  )
}

const Navigator=()=>{
  let [countSign,setCountSign]=useState(false)
  const dispatch=useDispatch()


  useEffect(()=>{
    const getCountSignData=async()=>{
      const countSignDataFromAsyns=await AsyncStorage.getItem('countSign')
      const countSignData=JSON.parse(countSignDataFromAsyns)

      if(countSignData==0){
        setCountSign(false)
        AsyncStorage.setItem('countSign',JSON.stringify(0))
        dispatch(countSignAction.addToCountSign(0))
      }else{
        setCountSign(true)
        AsyncStorage.setItem('countSign',JSON.stringify(countSignData))
        dispatch(countSignAction.addToCountSign(countSignData))
      }
    }
    getCountSignData()
  },[])

  

    return(
        <NavigationContainer> 
      <Stack.Navigator screenOptions={{headerShown :false}}>
        <Stack.Screen name="LogIn" component={LoginScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          {countSign && <Stack.Screen name='Drawer' component={DrawerNavigation}/>}
          
        
        

        </Stack.Navigator>
      </NavigationContainer>
    )
} 



export default Navigator