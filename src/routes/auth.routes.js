import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import playaudiobook from '../pages/playaudiobook';


function AuthRoutes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{
        headerShown: false
      }} />


    </Stack.Navigator>
  )
}
export default AuthRoutes;