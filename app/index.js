import { StyleSheet, Text, View,FlatList, Pressable} from 'react-native';
import { Link } from "expo-router";
import Item from "../Components/Item";
import Add from "../Components/Add";
import { Ionicons } from '@expo/vector-icons'; 
import { Modal, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ImportButton from '../Components/ImportButton';




export default function Page() {
  const [data,setData] = useState([]);
  const [modalVisible,setModalVisible] = useState(false);
  const [filledOut,setFilledOut] = useState(true)
  const[submitted,setSubmitted] = useState(false)

  const[itemName,setItemName] = useState('')
  const[itemDesc,setItemDesc] = useState('')

  const [clearMessage,setClearMessage] = useState('Clear Data')
  const [clearPressed,setClearPressed] = useState(false)



  function changeMessage(){
    if(!clearPressed){
    setClearMessage("Are you sure?")
    setClearPressed(true)
 
    setTimeout(() =>{
      console.log("Time is up")
      setClearMessage("Clear Data")
      setClearPressed(false)
    },10000)
    }else{
      setClearMessage("Clear Data")
      setClearPressed(false)
      setData([])
    }
  }

  const openModal = () =>{
    setModalVisible(true)
    setItemName('')
    setItemDesc('')
  }

  const addItem = () =>{
   setData([...data,{
    title:itemName,
    desc:itemDesc
   }])
  }

  const deleteItem =(id) =>{
    const newData = [...data]
    newData.splice(id,1)
    setData( newData)
  }

  useEffect(() =>{
    if(submitted  && itemName  && itemDesc ){
      addItem()
      setSubmitted(false)
    }
 
  },[submitted])



  const handleDataConverted = (jsonData) => {
    // Handle the parsed JSON data here
    console.log('Parsed JSON data:', jsonData);

  };
//      
  return (
    <View style={styles.container}>
      
      <View style = {styles.titleContainer}>
        <Text style = {styles.title}>Data Generator</Text>
      </View>
      <View style = {styles.dataContainer}>
      {data.length >0 ? null : 
            <Text style = {styles.add}>ADD DATA</Text> }
        <FlatList 
          data={data}
          renderItem={({item}) =>
          <Item
            title = {item.title} 
            desc = {item.desc}
            onPress ={() =>deleteItem(item.index)}
            />}
          keyExtractor={item =>item.title}
        />
      </View>
      
         <TouchableOpacity style = {styles.addButton} activeOpacity={0.7} onPress={openModal} > 
          <Ionicons name="add" size={25} color="white" />
        </TouchableOpacity>
  
     {data.length >0 ?
     <View style = {styles.bottomContainer}>
        <Link 
        href={{
          pathname:"output",
          params:{
            res:JSON.stringify(data)
          }}}asChild>
            <TouchableOpacity style = {styles.csvButton} activeOpacity={0.75}>
             <Text style = {styles.csvText}>Make CSV</Text>
            </TouchableOpacity>
         </Link>
          <TouchableOpacity style = {styles.cButton} activeOpacity={0.75} onPress={changeMessage}>
              <Text style = {styles.cText}>{clearMessage}</Text>
         </TouchableOpacity>

        </View>
    : null}

 
     <Modal animationType='fade' visible = {modalVisible} transparent >
        <Add 
        onPress = { () =>setModalVisible(false)}
        titleVal = {itemName}
        descVal = {itemDesc}
        filledOut = {filledOut}
        onChangeTextTitle={ text => setItemName(text)}
        onChangeTextDesc = { text =>setItemDesc(text)}
        submitForm = { () =>{
         if(itemName && itemDesc){
           setSubmitted(true)
           setFilledOut(true)
           setModalVisible(false)
           console.log("sumbitted")
         }else{
           console.log("please enter all fields")
           setFilledOut(false)
         }
  
        }}
        />
     </Modal>
 </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer:{
    borderBottomWidth:1,
    width:"60%",
    alignItems: 'center',
    marginTop:"2%"
  },
  title:{
    fontSize:27,
    fontWeight:'100',
  },
  add:{
    fontSize:23,
    opacity:0.3,
    alignSelf:"center",
    marginTop:"25%"
  },
  dataContainer:{
    width:"60%",
    height:"75%",
    flex:1,
  },
  addButton:{
    backgroundColor:"black",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:"flex-end",
    borderRadius:30,
    padding:"1%",
    position:"absolute",
    bottom:"1%",
    margin:"1%"
  },
  importContainer:{
    width:"5%",
    height:"10%",
    alignItems: 'center',
    justifyContent: 'center',
    left:"46%",
     bottom:"2%"
  },
  csvButton:{
      backgroundColor:"black",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:30,
      borderColor:"white",
      borderWidth:2,
      height:"75%",
      width:'35%',
      margin:'2%'
  },
  cText:{
    fontWeight:'bold',
    fontSize:20,
  },
  cButton:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    borderWidth:3,
    height:"75%",
    width:'35%',
    margin:'2%'
},
csvText:{
  fontWeight:'bold',
  fontSize:20,
  color:"white"
},
  bottomContainer:{
    flexDirection:"row",
    alignSelf:"center",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:"1%",
    width:'40%',
    height:"10%"
  }
});