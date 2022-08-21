import React from 'react'
import {View} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AccommodationScreen from '../screens/AccommodationScreen'
import HelpScreen from '../screens/HelpScreen'


const Tab=createMaterialTopTabNavigator()

const TopTabComponent=({navigation})=>{
    return(
        <View style={{flexDirection:'row'}}>
        <Tab.Navigator>
            <Tab.Screen name='Accommodation'  component={AccommodationScreen}/>
            <Tab.Screen name='Help'  component={HelpScreen}/>
        
            
        </Tab.Navigator></View>
    )
}
export default TopTabComponent