import React from 'react'
import {View,Text,TouchableOpacity,Image,  Platform,StyleSheet} from 'react-native'
import colors from '../constants/colors'
 
const HeaderComponent=({navigation,title,iconName})=>{
    return(
        <View style={styles.container}>
            {iconName=='menu'?
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
                <Image  style={styles.icon} source={require('../../assets/icons/menu.png')}/>
                
            </TouchableOpacity>:
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }}>
                <Image  style={styles.icon}  source={require('../../assets/icons/backarrow.png')}/>
                
            </TouchableOpacity>}
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{marginTop:Platform.OS=='ios' ? 0:24 ,height:50,backgroundColor:'white',flexDirection:'row',paddingHorizontal:18,alignItems:'center'},
    icon:{width:20,height:20,tintColor:colors.blue},
    text:{fontSize:16,marginLeft:10,color:colors.blue}
})
export default HeaderComponent