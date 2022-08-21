import React,{useState,useEffect} from 'react'
import {Text,View,TouchableOpacity,Image,StyleSheet,Modal,Dimensions} from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import {useDispatch,useSelector} from 'react-redux'
import { auth } from '../../firebase'
import nameAction from '../store/actions/auth'
import colors from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
const width=Dimensions.get('screen').width
const DrawerCustomComponent=(props)=>{

    const [showDialog,setShowDialog]=useState(false)
    const userName=(state=>state.USERINFO)
   const dispatch=useDispatch()
    const handleSignOut=()=>{
        auth
        .signOut()
        .then(()=>{

            props.navigation.navigate("LogIn")
        })
        .catch(error=>alert(error.message))
    }
    useEffect(() => {

        const getUserName = async() => {
    
        const userNameFromAsync = await AsyncStorage.getItem('userInfo')
    
        const userInfo = JSON.parse(userNameFromAsync)
    
        if(userInfo == null){
    
            AsyncStorage.setItem('userInfo', JSON.stringify([]))
            dispatch(nameAction.addToAuth([]))
    
        }
    
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch(nameAction.addToAuth(userInfo))
    
    
        }
        getUserName()
    
    },[])


    return(
        <DrawerContentScrollView {...props}>
             <View style={{flex:1}}>
             
<View style={{alignItems:'center',justifyContent:'center',backgroundColor:colors.primaryColor,height:width/2}}>
        <Image style = {{width:50,height:70,borderRadius:70,tintColor:colors.blue}} source = {require('../../assets/icons/customer.png')}/>

            <Text style ={{fontWeight:'bold',fontSize:18,color:colors.blue}}>{userName}</Text></View>


            <TouchableOpacity onPress={()=>props.navigation.navigate('Home')} style={styles.touch}>
                <Image source={require('../../assets/icons/home.png')} style={styles.icon}/>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <View style={{width:230,height:1,backgroundColor:colors.primaryColor,marginLeft:8}}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate('About')} style={styles.touch}>
                <Image source={require('../../assets/icons/about_us.png')} style={styles.icon}/>
                <Text style={styles.text}>About Us</Text>
            </TouchableOpacity>
            <View style={{width:230,height:1,backgroundColor:colors.primaryColor,marginLeft:8}}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Contact')} style={styles.touch}>
                <Image source={require('../../assets/icons/contacts.png')} style={styles.icon}/>
                <Text style={styles.text}>Contact Us</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>props.navigation.navigate('BookNow')} style={styles.touch}>
                <Image source={require('../../assets/icons/contacts.png')} style={styles.icon}/>
                <Text style={styles.text}>Booking</Text> */}
            {/* </TouchableOpacity> */}
            <View style={{width:230,height:1,backgroundColor:colors.primaryColor,marginLeft:8}}/>
            <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()
            setShowDialog(true)}} style={styles.touch}>
                <Image source={require('../../assets/icons/logout.png')} style={styles.icon}/>
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
            <Modal animationType="none" transparent={true} visible={showDialog}>
                <View style={{justifyContent:'center',alignItems:'center',padding:20,flex:1,backgroundColor:'rgba(0,0,0,0.8)'}}>
                    <View style={{width:'95%',alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:colors.white}}>
                        <Text style={{fontSize:20,color:colors.blue,textAlign:'center'}}>Please Come Back Soon</Text>
                        <Text style={{fontSize:20,color:colors.blue,textAlign:'center'}}>Are You Sure Want To Exit?</Text>
                   
                    <View style={{marginTop:20,flexDirection:'row',backgroundColor:colors.white}}>

                   
                        <View style={{backgroundColor:colors.green,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',height:50}}>
                            <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{color:colors.white,fontSize:14}}>Yes</Text>
                        </TouchableOpacity></View>
                       
                        <View style={{backgroundColor:colors.green,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',height:50}}>
                        <TouchableOpacity onPress={()=>setShowDialog(false)}>
                        <Text style={{color:colors.white,fontSize:14}}>Cancel</Text>
                        </TouchableOpacity></View>
                    </View> 
                </View></View>

            </Modal>
           
          
            </View> 
            
         

        </DrawerContentScrollView>

    )

}
const styles=StyleSheet.create({
    touch:{flexDirection:'row',alignItems:'center',padding:8,marginTop:8},
    icon:{width:25,height:25,tintColor:colors.blue},
    text:{fontSize:16,color:colors.blue,marginLeft:5}

})
export default DrawerCustomComponent