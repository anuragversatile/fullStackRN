import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Button,Card,CardSection,Input, Spinner} from'./common';

const urls='https://anurag-task-manager.herokuapp.com/users/logout'
class DetailForm extends Component{
  constructor(props) {
    super(props);
   ;
this.state={
  description:'',
  completed:'',
  updateCompleted:'',
  updateId:'',
  deleteId:''

}
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
  
  

  render(){
    const { navigation } = this.props;
    const token = navigation.getParam('token', 'NO-ID');
   console.log("parram wala token",token)
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
       
        <CardSection >
    <Button onPress={()=>{
            console.log("my token",token)
 this.props.navigation.navigate('Form',{
  title:'Tasks Detail ',
  
    token:token,
    
    apiTobeCalled:'get',
    method:'GET',
    completed:null,
    description:null,
    id:null
 
})
    }}>
GET All Task Details
  </Button>
  </CardSection>
  <CardSection >
    <Button onPress={()=>{
      console.log(token)
  this.props.navigation.navigate('Form',{
    title:' Created Task Detail ',
    
      token:token,
      description:this.state.description,
      completed:this.state.completed,
      
      apiTobeCalled:'create',
      method:'POST',
      completed:this.state.completed,
      description:this.state.description,
      id:null
   
  })
    }}>
CREATE TASKS
  </Button>
  </CardSection>
  <Card>
        <CardSection >
        <Input 
          value={this.state.description}
          onChangeText={description=>this.setState({description})}
          label="Description"
          placeholder=" Task description"
          secureTextEntry={false}
          />
          </CardSection>
        <CardSection >
        <Input 
          value={this.state.completed}
          onChangeText={completed=>this.setState({completed})}
          label="Completed"
          placeholder="false"
          secureTextEntry={false}
          />
          </CardSection>
          </Card>
          <CardSection >
          <Button onPress={()=>{
      console.log(token)
  this.props.navigation.navigate('Form',{
    title:' Updated Task Detail ',
    
      token:token,
      apiTobeCalled:'patch',
      method:'PATCH',
      completed:this.state.updateCompleted,
      description:null,
      id:this.state.updateId
   
  })
    }}>
Update TASKS
  </Button>
  </CardSection >
  <Card>
  <CardSection >
        <Input 
          value={this.state.updateCompleted}
          onChangeText={updateCompleted=>this.setState({updateCompleted})}
          label="Completed"
          placeholder="false"
          secureTextEntry={false}
          />
          </CardSection>
          <CardSection >
        <Input 
          value={this.state.updateId}
          onChangeText={updateId=>this.setState({updateId})}
          label="Id"
          placeholder="false"
          secureTextEntry={false}
          />
          </CardSection>
        
  
          </Card>
          <CardSection>
          <Button onPress={()=>{
      console.log(token)
  this.props.navigation.navigate('Form',{
    title:'Deleted Task Detail ',
    
      token:token,
     apiTobeCalled:'Delete',
     method:'DELETE',
      completed:null,
      description:null,
      id:this.state.deleteId
   
  })
    }}>
Delete Tasks
  </Button>
  </CardSection >
  <Card>
  <CardSection >
        <Input 
          value={this.state.deleteId}
          onChangeText={deleteId=>this.setState({deleteId})}
          label="Delete Id"
          placeholder="id"
          secureTextEntry={false}
          />
          </CardSection>
          </Card>
      </View>
    )
  }
}
export default DetailForm