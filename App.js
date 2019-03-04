import React,{Component} from 'react';
import {View} from 'react-native';

import {Header, Button, Spinner, Card, CardSection} from './src/components/common'
import LoginForm from './src/components/LoginForm';
import DetailForm from './src/components/DetailForm';

import Form from './src/components/Form'
import {  createAppContainer ,createStackNavigator} from 'react-navigation';

class App extends Component
{
  state={loggedIn:false}

  

  renderContent(){

switch (this.state.loggedIn){
  case true:
return (
<Card>
  <CardSection>
<Button onPress={()=>{}} >
  Log Out 
  </Button>
  </CardSection>
  </Card>
)
case false:
return  <LoginForm />
default:
return <Spinner size='large' />
}
    
    
  }


  render()
{ return(
    <View style={{flex:1,backgroundColor:'white'}}> 
<Header headerText='Authentication'/>
{this.renderContent()}

    </View>
  )
}
}
const FullStack=createStackNavigator({
  LoginForm:LoginForm,
 DetailForm:DetailForm,
Form:Form
 
  
})
export default createAppContainer(FullStack);