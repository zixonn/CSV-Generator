import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRouter, useLocalSearchParams,router} from "expo-router"
import { OpenAIApi ,Configuration} from 'openai';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { CSVLink} from 'react-csv';
import { Feather } from '@expo/vector-icons'; 
import { Table, Rows,  } from 'react-native-table-component';
import { API_KEY } from '@env';

const output = () => {
    
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { res } = params;

  const [aiResponse,setAiResponse] = useState('')
  const [download,setDownload ] = useState(false)
  const configuration = new Configuration({
    apiKey:API_KEY
  })

  const openai = new OpenAIApi(configuration);
  const prompt = `I have this array ob objects: ${res}.
  Make a csv with headers of Item Name, and Descriptor.
  
  Here's the catch: Given the data from the array of objetcs, try
  to spit out as many descriptors as you can for each object.
  For example, lets say we had this object:
  {
    title: Cheeseburger,
    desc: A classic cheeseburger with a juicy beef patty and melted cheese.
  }
(Dont add quotes)
  This is how it could look like in the csv:

  Cheeseburger, Is classic and juicy
  Cheeseburger, has melted cheese
  Cheeseburger, includes beef patty

  Basically, take apart pieces fromm the desc and use it
  with other words to make multiple unique items. Use at least
  2 wordsm for each descriptor.Form full sentences. Be creative. Do This fro every menu item

  `
  const getCSV = async() =>{
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt:prompt,
      temperature:0.2,
      max_tokens:170,
   })
   setAiResponse(response.data.choices[0].text)
   console.log(aiResponse)
  }

  useEffect(() =>{
    getCSV()
    console.log(res);
  },[])


  const formatAiResponseForTable = (response) => {

    const rows = response.split('\n').map(line => {
      const [itemName, descriptor] = line.split(','); // Assuming your data is comma-separated
      return [itemName, descriptor];
    });

    return rows;
  };

  const table = {tableHead: ["Item Name","Descriptor"],
  tableData: formatAiResponseForTable(aiResponse)}


  return (
    <>
    <Pressable style = {styles.back} onPress={() =>router.back()}>
      <Ionicons name="arrow-back" size={40} color="black" />
    </Pressable> 
    <View style = {styles.container}> 
    {aiResponse ?
       <Table style = {styles.table}  borderStyle={{borderWidth: 2, borderColor: 'gray'}}>
          <Rows data={table.tableData} textStyle={styles.text}/>
        </Table> : null}
      {aiResponse ?
      <TouchableOpacity activeOpacity={0.75} style = {styles.download} onPress={() => setDownload(true)}>
          <CSVLink
          data={aiResponse}
          filename={"synthetic-file.csv"}
          className="btn btn-primary"
          target="_blank"
          style={{textDecoration:"none"}}>
        <Feather name="download" size={30} color="white" />
        </CSVLink>
      </TouchableOpacity>:<ActivityIndicator size={"large"} color={"black"}/>}
    </View>
    </>
  )
}

export default output

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    
  },
  back:{
    margin:"1%"
  },
  result:{
    fontWeight:"bold",
    fontSize:20,
    borderWidth:1
  },
  download:{
    backgroundColor:"black",
    padding:'1%',
    borderRadius:30,
    left:"94%",
    top:"87%",
    position:"absolute"

  },
 text:{
  margin:6,
  fontSize:17
 }, 
 table:{
  width:'75%',
 }

})
