import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import AudioBooksProvider from './src/contexts/AudiobooksContext';
import Top5Provider from './src/contexts/Top5Context';
import BibliotecaProvider from './src/contexts/Biblioteca';


export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <AudioBooksProvider>
          <Top5Provider>
            <BibliotecaProvider>
              <Routes />
            </BibliotecaProvider>
          </Top5Provider>
        </AudioBooksProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

