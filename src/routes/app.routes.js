import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from '../pages/discover';
import Perfil from '../pages/Perfil';
import Pesquisa from '../pages/search';
import Top5 from '../pages/top5';
import Biblioteca from '../pages/biblioteca';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import playaudiobook from '../pages/playaudiobook';

export default function AppRoutes() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  function Tabs() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: '#fff',
          },
          activeTintColor: '#000',
          activeBackgroundColor: '#00000030',
          inactiveTintColor: '#888',
          tabStyle: {
            paddingTop: 15,
          },
        }
        }>

        <Tab.Screen options={{

          tabBarLabel: '',
          tabBarIcon: () => <Icon name="home-outline" color="#00A0FC" size={34} />,
        }} name="Discover" component={Discover} />
        <Tab.Screen options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="person-circle-outline" color="#00A0FC" size={34} />,
        }} name="Perfil" component={Perfil} />

        <Tab.Screen options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="search-circle-outline" color="#00A0FC" size={34} />,
        }} name="Pesquisa" component={Pesquisa} />
        <Tab.Screen options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="star-half-outline" color="#00A0FC" size={34} />,
        }} name="top5" component={Top5} />
        <Tab.Screen options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="library-outline" color="#00A0FC" size={34} />
        }} name="Biblioteca" component={Biblioteca} />
      </Tab.Navigator >
    )
  }
  return (

    <Stack.Navigator initialRouteName="Discover">

      <Stack.Screen name="Discover" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Perfil" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="top5" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Biblioteca" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Pesquisa" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="PlayerAudioBook" component={playaudiobook} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  )
}

