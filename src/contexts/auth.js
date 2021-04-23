import React, { useState, createContext, useEffect } from 'react'
import firebase from '../firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  //Faz o carregamento para a verificação se já há um user logado no App
  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }
    loadStorage();
  }, [])


  //Executa o login via email
  async function SignIn(email, senha) {
    if (email.length > 0 && senha.length > 0) {
      await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(async (value) => {
          let uid = value.user.uid;
          await firebase.database().ref('usuarios').child(uid).once('value')
            .then((snapshot) => {
              let data = {
                uid: uid,
                nome: snapshot.val().nome,
                email: snapshot.val().email,
                nlivros: snapshot.val().nlivros

              };
              setUser(data);
              StorageUser(data);
            })
        })
        .catch((error) => {
          alert(error.code);
        })
    } else {
      alert('Digite todos os campos');
    }

  }

  //Cadastra o Usuário

  async function SignUp(email, nome, senha, confirmsenha) {
    if (senha.length > 0 && confirmsenha.length > 0 && email.length > 0 && confirmsenha === senha && nome.length > 3) {
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async (value) => {
          let uid = value.user.uid;

          await firebase.database().ref('usuarios').child(uid).set({
            nome: nome,
            foto: '',
            nlivros: 0,
            email: email
          })
            .then(() => {
              let data = {
                uid: uid,
                nome: nome,
                foto: '',
                nlivros: 0,
                email: email
              }
              setUser(data);
              StorageUser(data);
              alert('Usuario Cadastrado com sucesso');
            })

        })
    } else {
      alert('Preencha todos os campos corretamente');
    }

  }



  //Desloga o Usuário
  async function SignOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }

  //Armazena os dados do usuário localmente na váriavel Auth_user
  async function StorageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  //Retorna os objetos e as funções ao AuthProvider, onde poderá ser requisitado em outras páginas futuramente.
  return (
    <AuthContext.Provider value={{ signed: !!user, user, SignIn, SignOut, SignUp }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;