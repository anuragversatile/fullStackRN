import React from 'react';
import { View,Text,TextInput} from 'react-native';

const Input=({label,value,onChangeText,placeholder,secureTextEntry})=>{
  const{inputStyle,containerStyle,labelStyle}=styles
  return (
    <View style={containerStyle}> 
      <Text style={labelStyle}>
        {label}
        </Text>
        <TextInput  
        
        value={value} 
        onChangeText={onChangeText}
      autoCorrect={false}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
        style={inputStyle}/>

      </View>

  );
}
const styles={
inputStyle:{
color:'#000',
paddingRight:5,
paddingLeft:5,
fontSize:18,
lineHeight:23,
flex:2

},
containerStyle:{
height:40,
flex:1,
flexDirection:'row',
alignItems:'center'
},
labelStyle:{
  fontSize:18,
  paddingLeft:20,
  flex:1

}


}
export {Input}