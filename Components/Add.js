import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { BlurView } from 'expo-blur';



const Add = (props) => {

    const filled = props. filledOut
  return (
    <BlurView intensity={10} tint="dark" style = {styles.blur}>
        <View style = {styles.container}>
            <View style = {styles.topRow}>
               <Text style = {styles.title}>Create Item</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={props.onPress} style = {styles.x}>
                    <AntDesign name="close" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {filled ? null :
              <Text style = {styles.warning}>*Please fill in all fields*</Text>}
            <TextInput
             style = {styles.input} placeholder='Name'
             value = {props.titleVal}
             onChangeText={props.onChangeTextTitle}
             />
            <TextInput
             style = {styles.inputDesc}
              placeholder='Description' 
              multiline
              value={props.descVal}
              onChangeText={props.onChangeTextDesc}
              />
              <TouchableOpacity style = {styles.submitButton} activeOpacity={0.7} onPress={props.submitForm}>
                    <Text style = {styles.submitText}>Submit</Text>
              </TouchableOpacity>
        </View>
    </BlurView>
  )
}

export default Add

const styles = StyleSheet.create({
    container:{
        width:"50%",
        height:"80%",
        alignSelf:"center",
        marginTop:"5%",
        backgroundColor:"white",
        borderRadius:10,
        borderWidth:2,
        padding:"1%"
    },
    blur:{
      flex:1
    },
    topRow:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        fontSize:30,
        fontWeight:"bold"
    },
    x:{
      justifyContent:"center",
      alignItems:"flex-end"
    },
    input:{
        width:"95%",
        height:"10%",
        borderWidth:2,
        borderRadius:30,
        paddingLeft:"2%",
        margin:10
    },
    inputDesc:{
        width:"95%",
        height:"70%",
        borderWidth:2,
        borderRadius:30,
        padding:"2%",
        margin:10
    },
    submitButton:{
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",
        width:"10%",
        height:"7%",
        borderRadius:20,
        alignSelf:"flex-end",
    },
    submitText:{
        color:"white",
        fontWeight:"bold"
    },
    warning:{
        color:"red"
    }

})