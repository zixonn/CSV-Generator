
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Papa from 'papaparse';
import { useState } from 'react';


const ImportButton = ({ onFileSelect },props) => {
    const fileInputRef = useRef(null);
    const [csvFile, setCsvFile] = useState(null);
    const [jsonResult, setJsonResult] = useState(null);

    
    const handleFileSelect = (e) => {
      const file = e.target.files[0];
 

      setCsvFile(file);

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: handleCsvParsed,
      });
    };

    const handleCsvParsed = (result) => {
        const jsonData = result.data;
        setJsonResult(jsonData);
    
        // Pass the parsed JSON data to the provided callback
        if (typeof onDataConverted === 'function') {
          onDataConverted(jsonData);
          
        }

      };

  return (
    <div style={styles.container}>
    <input type="file" onChange={handleFileSelect} />
      {jsonResult && (
        console.log(JSON.stringify(jsonResult, null, 2)),
        console.log('don')
      )}
  </div>
  );
};

const styles = StyleSheet.create({
    container:{
      alignSelf:"flex-start",
      margin:"1%",
      position:"absolute",
      bottom:"1%",
    }
})
export default ImportButton;
