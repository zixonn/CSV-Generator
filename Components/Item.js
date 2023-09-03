import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';

const Item = (props) => {

  return (
    <View style = {styles.container}>
    <View style = {styles.topHalf}>
        <Text style = {styles.itemName}>{props.title}</Text>
        <TouchableOpacity style = {styles.icon} activeOpacity={0.7} onPress={props.onPress}>
             <AntDesign name="delete" size={"150%"}color="white" />
        </TouchableOpacity>
    </View>
       <Text numberOfLines={3} style = {styles.desc}>{props.desc}</Text>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
    container:{
        width:"75%",
        height:124,
        borderWidth:2,
        borderRadius:5,
        margin:"1%",
        padding:"1.5%",
        backgroundColor:"black",
        alignSelf:"center"
    },
    topHalf:{
        flexDirection:"row",
    },
    itemName:{
        color:"white",
        fontWeight:"bold",
        fontSize:25,
        paddingBottom:"1%",
    },
    icon:{
        position:"absolute",
        left:"95%"
    },
    desc:{
        color:"white",

    }
})