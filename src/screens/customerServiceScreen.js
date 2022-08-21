import React from 'react'
import {View,Text,TouchableOpacity,Image,Dimensions,SafeAreaView,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import HeaderComponent from '../components/HeaderComponent'
import TopTabComponent from '../components/TopTabComponent'





import colors from '../constants/colors'



const width=Dimensions.get('screen').width

const CustomerServiceScreen=({navigation,route})=>{
    return(
      

        <SafeAreaView>
             <HeaderComponent navigation={navigation} iconName='back' title='Customer Service Help'/>
          <ScrollView> 
        
     

{/*         
     <TopTabComponent navigation={navigation}/> */}
<View>
   <Text style={{fontSize:20,fontWeight:'bold',color:colors.blue,marginLeft:5}}>Accommodation</Text>
</View>
     <View>
         <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Coronavirus-related support</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Cancellations</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Payment</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Booking Details</Text>
           <Image  style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Room Types</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Pricing</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Credit cards</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           
           <Text style={styles.text} >Property policies</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>

        <View style={styles.container}>
           <Text style={styles.text}>Extra Facilities</Text>
           <Image  style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
        <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Security and awareness</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
        <View style={{width:'95%',height:2,backgroundColor:colors.blue,marginLeft:5}}/>
       
      <TouchableOpacity>
        <View style={styles.container}>
           <Text style={styles.text}>Contact us</Text>
           <Image style={styles.img} source={require('../../assets/icons/forward.png')}/>
        </View></TouchableOpacity>
     
     </View>
     </ScrollView>
        </SafeAreaView>
    )
}

export default CustomerServiceScreen

const styles=StyleSheet.create({
    container:{flexDirection:'row',justifyContent:'space-between',marginTop:7,marginLeft:5},
    text:{fontSize:16,marginTop:10,color:colors.blue},
    img:{width:20,height:20,tintColor:colors.blue}

})