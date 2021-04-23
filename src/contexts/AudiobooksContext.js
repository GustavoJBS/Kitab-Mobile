import { View } from 'react-native';
import React, { useState, createContext, useEffect } from 'react'
import firebase from '../firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
export const AudioBooksContext = createContext({});

export default function AudioBooksProvider({ children }) {
  const [ListaHarryPotter, setListaHarryPotter] = useState([])
  const [ListaClassicos, setListaClassicos] = useState([])
  const [ListaFicçãoCientifica, setListaFicçãoCientifica] = useState([])
  const [ListaColeções, setListaColeções] = useState([])
  const [ListaLiteraturaBrasileira, setListaLiteraturaBrasileira] = useState([]);
  const [animation1, setAnimation1] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);
  const [loading, setLoading] = useState(true);
  {/*Função que Carrega a Lista do HarryPotter a Página Discover */ }
  function CarregaListaHarryPotter() {
    setListaHarryPotter([]);
    firebase.database().ref(`audiobooks/HarryPotterCollection`).once('value', (snapshot) => {
      snapshot.forEach((chilItem) => {

        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id
        };
        setListaHarryPotter(oldarray => [...oldarray, data]);
      }
      )
    })
  }

  {/*Função que Carrega a Lista dos Classicos a Página Discover */ }
  function CarregaListaClassicos() {
    setListaClassicos([]);
    firebase.database().ref(`audiobooks/Classicos`).once('value', (snapshot) => {
      snapshot.forEach((chilItem) => {

        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
          npessoas: chilItem.val().npessoas
        };
        setListaClassicos(oldarray => [...oldarray, data]);
      }
      )
      setLoading(false);
      setAnimation2(true);
    })
  }

  {/*Função que Carrega a Lista de Ficção a Página Discover */ }
  function CarregaListaFicçãoCientifica() {
    firebase.database().ref(`audiobooks/Coleções`).on('value', (snapshot) => {
      setListaFicçãoCientifica([]);
      snapshot.forEach((chilItem) => {
        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
          npessoas: chilItem.val().npessoas
        };
        setListaFicçãoCientifica(oldarray => [...oldarray, data]);
      }
      )
    })
  }

  function CarregaColeções() {
    firebase.database().ref(`audiobooks/Coleções`).on('value', (snapshot) => {
      setListaColeções([]);
      snapshot.forEach((chilItem) => {
        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
          npessoas: chilItem.val().npessoas
        };
        setListaColeções(oldarray => [...oldarray, data]);
      }
      )
      setLoading(false);
      setAnimation3(true);
    })
  }


  function CarregaLiteraturaBrasileira() {
    firebase.database().ref(`audiobooks/Literatura Brasileira`).on('value', (snapshot) => {
      setListaLiteraturaBrasileira([]);
      snapshot.forEach((chilItem) => {
        let data = {
          nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
          linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria,
          id: chilItem.val().id,
          npessoas: chilItem.val().npessoas
        };
        setListaLiteraturaBrasileira(oldarray => [...oldarray, data]);
      }
      )
      setLoading(false);
      setAnimation1(true);
    })
  }

  return (
    <AudioBooksContext.Provider value={{ CarregaListaHarryPotter, ListaHarryPotter, CarregaListaClassicos, ListaClassicos, CarregaListaFicçãoCientifica, ListaFicçãoCientifica, CarregaColeções, ListaColeções, CarregaLiteraturaBrasileira, ListaLiteraturaBrasileira, animation1, animation2, animation3, loading }}>
      {children}
    </AudioBooksContext.Provider>
  );
}