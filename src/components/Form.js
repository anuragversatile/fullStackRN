import React,{Component} from 'react';
import {View,Text,FlatList,TextInput,StyleSheet,Alert} from 'react-native';
import {Button,Card,CardSection,Input, Spinner} from'./common';

const urls='https://anurag-task-manager.herokuapp.com/tasks'
var FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#000"
      }}
    />
  );
};
class Form extends Component{
  constructor(props) {
    super(props);
 
this.state={
 dataSource:[]

}
    // this.onButtonPress = this.onButtonPress.bind(this);
    this.update=this.update.bind(this);
    // this.onCreatePress=this.onCreatePress.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const tokens = navigation.getParam('token', 'NO-ID');
    return {
      headerTitleStyle: { textAlign: "center", flex: 1 },
      title: navigation.getParam("title", "Detail Screen"),
      
      
        
         
          headerRight: (
            <Button onPress={()=>{
              
              fetch(urls, {
                method: 'POST',
       
                headers: {
                  Authorization: "Bearer "+tokens,
                 
              
               
                }
              })
                .then(navigation.navigate('LoginForm'))
      
      }}>
      {"Logout     "}
      </Button>
          ),
        };
      };
        
    
    
  componentDidMount(){
    const { navigation } = this.props;
    const token = navigation.getParam('token','No')
   
    const id= navigation.getParam('id','')
    const completed= navigation.getParam('completed','')
    const description=navigation.getParam('description','')
    const apiTobeCalled= navigation.getParam('apiTobeCalled','')
    const method= navigation.getParam('method','')
    console.log("params inside",completed)
    this.update(token,id,completed,method,apiTobeCalled,description)
  }

update=(token,id,completed,method,apiTobeCalled,description)=>{
  let url=urls+`/${id}`
  console.log(url)
  if(method==='PATCH')
  {
let data = {
"completed":completed.toLowerCase()}
fetch(url, {
  method: method,
  body: JSON.stringify(data), 
  headers: {
    Authorization: "Bearer "+token,
   

      'Content-Type': 'application/json'
 
  }
})
  .then(function(response) {
    return response.json();
  })
  .then(myJson =>{
    let array=[]
    array.push(myJson)
this.setState({dataSource:array},()=>console.log("data is",this.state.dataSource))
    console.log("asd",myJson)
  }
  )
  .catch(error => {
    Alert.alert("Something went wrong Please try again")
    console.log("Error", error)});

}
if(method==='DELETE')
{

  fetch(url, {
    method: method,
 
    headers: {
      Authorization: "Bearer "+token,
     


   
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(myJson =>{
      let array=[]
      array.push(myJson)
  this.setState({dataSource:array},()=>console.log("data is",this.state.dataSource))
      console.log("asd",myJson)
    }
    )
    .catch(error => {
      Alert.alert("Something went wrong Please try again")
      console.log("Error", error)});
  }
  if(method==='GET'){
    fetch(urls, {
      method: 'GET',
      headers: {
        Authorization: "Bearer "+token
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(myJson =>{
    this.setState({dataSource:myJson})
        console.log(myJson)
      }
      )
      .catch(error => {
        Alert.alert("Something went wrong Please try again")
        console.log("Error", error)});
     
  }
  if(method==='POST'){
    var data = {
      description:description,
      completed:completed.toLowerCase()
    };
    fetch(urls, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: {
        Authorization: "Bearer "+token,
  
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(myJson =>{
        let ds=[]
        ds.push(myJson)
    this.setState({dataSource:ds})
        console.log(myJson)
      }
      )
      .catch(error => { Alert.alert("Something went wrong Please try again")
        console.log("Error", error)});
  }
   
}



  render(){
  
   const{textView}=styles;
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
       <Card>
         <CardSection>
         <FlatList
         data={this.state.dataSource}
         ItemSeparatorComponent={FlatListItemSeparator}
         renderItem={({ item }) => (
           <View style={styles.normalFlex}>
             <Text style={[textView, { fontWeight: "600", fontSize: 15 }]}>
             Description-{"  "+item.description}
             </Text>
             <Text style={[textView, { color: "#809dff" }]}>
               Completed-{"  "+item.completed}
             </Text>
             <TextInput   style={[textView, { fontWeight: "600", fontSize: 15 }]}>
             Task ID-{"  "+item._id}
             </TextInput>
             <Text style={[textView, { color: "#809dff" }]}>
              Owner ID-{"  "+item.owner}
             </Text>
            
           </View>
         )}
         keyExtractor={(item, index) => {index.toString()
        }}
       />
  </CardSection>
  </Card>

  
         
      </View>
    )
  }
}
export default Form
const styles = StyleSheet.create({
  textView: {
    textAlignVertical: "center",
    padding: 10,
    color: "#000"
  },
  normalFlex:{
    flex:1
  }
});