import React,{Component}from 'react'
import {Text} from 'react-native';

import {Button,Card,CardSection,Input, Spinner} from'./common';


class LoginForm extends Component{
  state={email:'' , pass:'',  err:'' , resp:{},loading:false};
  onButtonPress()
  {
    const {email,pass}=this.state
    this.setState({
                   err:'',
                   loading:true
                  })
    

 
var url = 'https://anurag-task-manager.herokuapp.com/users/login';
var data = {"email":this.state.email,
"password":this.state.pass}

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data), 
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => {console.log('Success:', JSON.stringify(response))
this.setState({resp:response})
})
.then(this.onLoginSuccess.bind(this))
.catch(
  this.onLoginFail.bind(this)
)
 
  }
  static navigationOptions = ({ navigation }) => {
   
    return {
      headerTitleStyle: { textAlign: "center", flex: 1 },
      title: navigation.getParam("title", "CRUD APP")
      
      
        
         
      
        };
      };

  onLoginSuccess()
  { 
    this.setState({
email:'',
pass:'',
loading:false,
err:''
})

this.props.navigation.navigate('DetailForm',{
  title:'Detail Screen',
  
    token:this.state.resp.token,
 
})

};

onLoginFail(){
  console.log("error")
    this.setState({err:'Authentication failed',loading:false})
}
renderButton()
{
  if(this.state.loading)
  {return <Spinner size='small' />
}
 return ( 
  <Button onPress={this.onButtonPress.bind(this)}>
  {"Login     "}
  </Button>
 )
}
  render(){
    return(
      <Card>
        <CardSection >
        <Input 
          value={this.state.email}
          onChangeText={email=>this.setState({email})}
          label="Email"
          placeholder="Email"
          secureTextEntry={false}
          />
          </CardSection>
        <CardSection >
        <Input 
          value={this.state.pass}
          onChangeText={pass=>this.setState({pass})}
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.err}
            </Text>
        <CardSection >
   {this.renderButton()}
          </CardSection>
        </Card>
    )
  }
}
const styles={
  errorTextStyle:{
fontSize:20,
alignSelf:'center',
color:'red'
  }
}
export default LoginForm
