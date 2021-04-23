import { View } from 'react-native';
import React, { useState, createContext, useEffect } from 'react'
import firebase from '../firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

export const Top5Context = createContext({});

export default function Top5Provider({ children }) {
  const [audiobookstop5, setaudioBooksTop5] = useState([]);
  const [audios, setaudios] = useState([]);
  function CarregaTop5() {

    firebase.database().ref(`audiobooks`).once('value', (snapshot1) => {
      snapshot1.forEach((chilItem) => {
        chilItem.forEach((chilItem2) => {
          firebase.database().ref('top5').child(chilItem2.val().nome).set({
            nome: chilItem2.val().nome, linkimage: chilItem2.val().linkimage,
            linkaudio: chilItem2.val().linkaudio, descricao: chilItem2.val().descricao,
            categoria: chilItem2.val().categoria,
            id: chilItem2.val().id,
            nota: chilItem2.val().nota, notatotal: chilItem2.val().notatotal, npessoas: chilItem2.val().npessoas
          })
        })
      })
    })
  }
  {/*Carrega a lista de top5 do banco de dados para o App */ }
  useEffect(() => {
    CarregaTop5();
    firebase.database().ref('top5').once('value', (snapshot) => {
      setaudios([])
      snapshot.forEach((chilItem) => {

        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
          nota: chilItem.val().nota, notatotal: chilItem.val().notatotal, npessoas: chilItem.val().npessoas
        };
        setaudios(oldarray => [...oldarray, data]);
        setaudioBooksTop5(oldarray => [...oldarray, data])
      })

    })
  }, [])

  function filtrotop5(filtro) {
    if (filtro == 'All') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios)
    }
    if (filtro == '5') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios.filter(audiobookstop5 => audiobookstop5.nota >= 4.5))
    }
    if (filtro == '4') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios.filter(audiobookstop5 => audiobookstop5.nota < 4.5 && audiobookstop5.nota >= 3.5))

    }
    if (filtro == '3') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios.filter(audiobookstop5 => audiobookstop5.nota < 3.5 && audiobookstop5.nota >= 2.5))
    }
    if (filtro == '2') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios.filter(audiobookstop5 => audiobookstop5.nota < 2.5 && audiobookstop5.nota >= 1.5))
    }
    if (filtro == '1') {
      setaudioBooksTop5([])
      setaudioBooksTop5(audios.filter(audiobookstop5 => audiobookstop5.nota < 1.5))
    }

  }


  return (
    <Top5Context.Provider value={{ CarregaTop5, audiobookstop5, audios, filtrotop5 }}>
      {children}
    </Top5Context.Provider>
  );
}