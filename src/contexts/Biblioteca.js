import React, { useState, createContext, useEffect, useContext } from 'react'
import firebase from '../firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './auth';
export const BibliotecaContext = createContext({});

export default function BibliotecaProvider({ children }) {
  const [audiobooks, setaudioBooks] = useState([]);
  const { user, SignOut } = useContext(AuthContext);
  function carregaBiblioteca() {
    setaudioBooks([]);
    firebase.database().ref(`Votação/${user.uid}`).once('value', (snapshot) => {
      snapshot.forEach((chilItem) => {

        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
        };
        setaudioBooks(oldarray => [...oldarray, data]);
      }
      )

    })
  }

  return (
    <BibliotecaContext.Provider value={{ carregaBiblioteca, audiobooks }}>
      {children}
    </BibliotecaContext.Provider>
  );
}