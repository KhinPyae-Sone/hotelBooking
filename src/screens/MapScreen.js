import React from 'react'
import {View,Text,SafeAreaView,StyleSheet} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const MapScreen=({navigation,route})=>{
    const {lat,long}=route.params
    return(
        <SafeAreaView>
            <HeaderComponent navigation={navigation} title='MapView' icon='back'/>
            <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: lat,
         longitude: long,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
        </SafeAreaView>

    )
}

export default MapScreen
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 700,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });