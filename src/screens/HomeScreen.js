import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,Image,FlatList, Dimensions,StyleSheet,TextInput,ScrollView} from 'react-native'

import BottomTabComponent from '../components/BottomTabComponent'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/colors'
import {SearchBar} from 'react-native-elements'

const width=Dimensions.get('screen').width
const hotelList=[
 {  _id:0,
    img:require('../../assets/icons/rosegarden.jpg'),
    hotelName:'Rose Garden Hotel',
    map:'Yangon',
    price:'$50',rating:'5-Star Hotel',
    perExe:'64%',
    perGood:'18%',
    perWorse:'2%',
    detailMap:'171 Upper Pansodan,Yangon',
    phone:'+951394853',

    detailImg:[
        {img1:require('../../assets/icons/rose.jpg')}
      
],
lat:16.790765,
long:96.162271,
backImg:require('../../assets/icons/rose.jpg')
},

{   _id:1,
    img:require('../../assets/icons/sedona.jpg'),
    hotelName:' Sedona  Hotel',
    map:'Yangon',
    price:'$48',rating:'5-Star Hotel',
    perExe:'62%',
    perGood:'17%',
    perWorse:'1%',
    detailMap:'No.1,Kaba Aye Pagoda,Yankin Township,Yangon',
    phone:'+9518605377',

    detailImg:[
        {img1:require('../../assets/icons/sedonadetail.jpg')}
      
],
lat:16.829286,
long:96.155036,
backImg:require('../../assets/icons/rose.jpg')
},



{   _id:2,
    img:require('../../assets/icons/strand.jpg'),
   hotelName:'Mawlamyaing Strand Hotel',
    map:'Mawlammyine',
    price:'$35',rating:'4-Star Hotel',
    perExe:'57%',
    perGood:'18%',
    perWorse:'2%',
    detailMap:'Between Lower Main Road and Strand Road Phat Tan Quarter,Mawlamyine,Mon State',
    phone:'+955725625',

    detailImg:[
        {img1:require('../../assets/icons/detail.jpg')}
      
],
lat:16.589109,
long:97.699134,backImg:require('../../assets/icons/rose.jpg')

},
 
    
{   _id:3,
    img:require('../../assets/icons/novotel.jpg'),
   hotelName:'Novotel Yangon Max Hotel',
    map:'Yangon',
    price:'$35',rating:'5-Star Hotel',
    perExe:'57%',
    perGood:'18%',
    perWorse:'2%',
    detailMap:'459 Pyay Road ,Kamayut Township,Yangon',
    phone:'+9512305858',

    detailImg:[
        {img1:require('../../assets/icons/novoteldetail.jpg')},
       
      
],
lat:16.81970,
long:96.131330,
backImg:require('../../assets/icons/rose.jpg')
},
{   _id:4,
    img:require('../../assets/icons/belmond.jpg'),
    hotelName:'Belmond Governar Residence Hotel',
    map:'Yangon',
    price:'$50',rating:'5-Star Hotel',
    perExe:'57%',
    perGood:'18%',
    perWorse:'2%',
    detailMap:'35 Taw Win Road,Dagon Township,Yangon',
    phone:'+9512302092',

    detailImg:[
        {img1:require('../../assets/icons/belmonddetail1.jpg')}
      
],
lat:16.762036,
long:96.149847,
backImg:require('../../assets/icons/rose.jpg')
},
{   _id:5,
    img:require('../../assets/icons/hotelperfect.jpg'),
    hotelName:'Hotel Perfect',
    map:'Hpa an',
    price:'$40',rating:'3-Star Hotel',
    perExe:'59%',
    perGood:'17%',
    perWorse:'2%',
    detailMap:'No.43,Yangon Hpa-an Road, Hpa-an,Kayin State, Hpa-an',
    phone:'+959776055552',

    detailImg:[
        {img1:require('../../assets/icons/hotelperfectdetail.jpg')}
      
],
lat:16.862008,
long:97.622736,backImg:require('../../assets/icons/rose.jpg')
},
{    _id:6,
    img:require('../../assets/icons/homehotel.jpg'),
   hotelName:'The Home Hotel',
    map:'Mandalay',
    price:'$40',rating:'3-Star Hotel',
    perExe:'60%',
    perGood:'15%',
    perWorse:'2%',
    detailMap:'82nd Street,Between 32nd and 33rd Street,Chan Aye Tharzan Township, Mandalay ',
    phone:'+95233702',

    detailImg:[
        {img1:require('../../assets/icons/home.jpg')}
      
],
lat:21.973869,
long:96.080794,
backImg:require('../../assets/icons/rose.jpg')
},
{   _id:7,
    img:require('../../assets/icons/baganthiri.jpg'),
   hotelName:'Bangan Thiripyitsaya Sancturary',
    map:'Bagan',
    price:'$40',rating:'4-Star Hotel',
    perExe:'59%',
    perGood:'17%',
    perWorse:'2%',
    detailMap:'Bangan Archaelogical Zon,Bangan Nyaung Oo,Bangan',
    phone:'+9561600048',

    detailImg:[
        {img1:require('../../assets/icons/bagan.jpg')}
      
],
lat:21.164527,
long:94.853992,
backImg:require('../../assets/icons/rose.jpg')
},
]


const HomeScreen=({navigation,route})=>{

const [filteredData,setFilteredData]=useState([])
const [searchText,setSearchText]=useState('')
const [isInSearchText,setIsInSearchText]=useState(true)
const [noMatch,setNoMatch]=useState('')




const searchFilterFunction=(text)=>{
    if (text){
        const newData=hotelList.filter(item=>{
            const itemData=item.map ? item.map.toUpperCase():''.toUpperCase()
            const textData=text.toUpperCase();
            return itemData.indexOf(textData)>-1;
        })
        setFilteredData(newData)
        setSearchText(text)
        setIsInSearchText(false)

        if(!newData.length){
            return setNoMatch("There is no matched hotel!")
        }

    }
    else{
        setFilteredData(hotelList)
        setSearchText(text)
        setIsInSearchText(true)

    }
}
    return(
      
        <SafeAreaView style={{flex:1}}>
           
           
           

           {/* <TextInput
              style={{borderRadius:5,marginTop:10,height:40,width:'80%',backgroundColor:'white',paddingHorizontal:20}}
              palceholder="Search Here"
              placeholderTextColor='black'
              onChangeText={searchFilterFunction}
              value={searchText}
             />     */}
            <View style={{flex:1,paddingHorizontal:18}}>
               
           
            <SearchBar
            placeholder={"Search with Location"}
            placeholderTextColor={colors.blue}
            containerStyle={{backgroundColor:colors.white,borderRadius:5,borderBottomWidth:0,marginTop:25,borderTopWidth:0}}
            inputContainerStyle={{backgroundColor:colors.white,borderWidth:1,borderBottomWidth:1,borderColor:colors.blue}}
            inputStyle={{backgroundColor:colors.white,borderRadius:5,paddingHorizontal:10}}
            onChangeText={searchFilterFunction}
            value={searchText}
            />
           
        
          {isInSearchText ?<FlatList 
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
                : noMatch == 'There is no matched hotel!'?
                <View style={{justifyContent:'center',alignItems:'center'}}><Text 
                style={{fontSize:18,fontWeight:'bold',color:colors.blue}}>There is No Matched hotel!</Text></View>
                :


                <FlatList 
                data={filteredData}
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity style={{borderRadius:5,marginTop:18}} onPress={()=>navigation.navigate('Detail',
                        {hotel:item
                    })}>
                        <View style={{flex:1,borderRadius:10,backgroundColor:colors.primaryColor,borderBottomEndRadius:10}}>
                            <Image style={{width:'100%',height:width/2,resizeMode:'cover',borderTopLeftRadius:5,borderTopRightRadius:5}} source={item.img}/>
                        </View>
                        <View>
                        <Text style={{fontSize:19,fontWeight:'bold',color:colors.blue}}>{item.hotelName}</Text>
                        <Text style={{fontSize:15,fontWeight:'bold',color:colors.blue}}>{item.map}</Text> 
                        </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item,index)=>index.toString()}
                showsVerticalScrollIndicator={false}
                />}
           </View>
           <BottomTabComponent navigation={navigation} screenName="Home"/>
        </SafeAreaView>
        
    )
}
export default HomeScreen
const styles=StyleSheet.create(
  {
      container:{fontSize:19,alignItems:'center',justifyContent:'center',flex:1,backgroundColor:colors.primaryColor},
          
      img:{width:20,height:20,tintColor:colors.blue},
      text:{fontSize:14,marginLeft:10,color:colors.blue}

      
  }
)