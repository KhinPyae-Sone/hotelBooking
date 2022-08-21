import React from 'react'
import {SafeAreaView,View,Text,ScrollView,TextInput,StyleSheet,FlatList,TouchableOpacity,Image,Dimensions} from 'react-native'
const width=Dimensions.get('screen').width
import colors from '../constants/colors'

const SearchBar=(props)=>{
    const {dataSource}=props
    
// console.log("Hotel Data from home",hotelList)
    return(
        <View style={{
            position:'absolute',top:'6.2%',
            left:0,
            right:0,
            backgroundColor:'gray',
            opacity:0.2,
            borderTopLeftRadius:4,
            borderTopRightRadius:4
        }}>
            <View style={{flexWrap:'wrap',
        marginHorizontal:20,backgroundColor:'#404040'}}>
              
                      
                        
                    <FlatList 
                    data={hotelList}
                    renderItem={({item,index})=>{
                        return(
                           
                        
                            
                            <TouchableOpacity style={{borderRadius:5,marginTop:18}} onPress={()=>navigation.navigate('Detail',
                            {hotel:item
                        })}>
                                <View style={{flex:1,borderRadius:10,backgroundColor:colors.primaryColor,borderBottomEndRadius:10}}>
                                    <Image style={{width:'100%',height:width/2,resizeMode:'cover',borderTopLeftRadius:5,borderTopRightRadius:5}} source={item.img}/>
                                    <View>
                                    <Text style={{fontSize:19,fontWeight:'bold',color:colors.blue}}>{item.hotelName}</Text>
    
                                   
    
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                                    <View>
                                    <View style={{flexDirection:'row',marginTop:3}}> 
                                        <Image style={styles.img} source={require('../../assets/icons/location.png')}/>
                                        <Text style={styles.text}>{item.map}</Text>
                                    
                                    </View>
                                        
                                        <Text style={styles.text}>{item.rating}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{item.price}</Text>
                                        <Text style={styles.text}>per night</Text>
                                    </View></View>
                                    </View>
                                   
                                 
                                </View>
                            </TouchableOpacity>)
                    }}
                    keyExtractor={(item,index)=>index.toString()}
                    showsVerticalScrollIndicator={false}/>
                    
              
            </View>

        </View>
    )

}
export default SearchBar
