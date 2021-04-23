import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, ActivityIndicator, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebaseConnection'
import { AuthContext } from '../contexts/auth';
import * as Animatable from 'react-native-animatable'
export default function Cadastro() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const emailInput = useRef(null);
  const { SignUp } = useContext(AuthContext);

  function irlogin() {
    navigation.goBack();
  }

  async function cadastrar() {
    SignUp(email, nome, senha, confirmsenha);
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container} >
        <Animatable.Text fadeDuration={100} animation="bounceIn" style={styles.titulo}>Cadastrar  User</Animatable.Text>
        <Animatable.Image fadeDuration={100} animation="bounceIn" source={require('../assets/Kitabicon.png')} style={styles.logo} />

        <Animatable.View animation="bounceInLeft" style={styles.caixas}>
          <Text style={styles.textoinput}>Nome</Text>
          <TextInput style={styles.input}
            value={nome}
            onChangeText={(texto) => setNome(texto)}
            keyboardType="default" placeholder="Insira seu Nome" />
        </Animatable.View>



        <Animatable.View animation="bounceInLeft" style={styles.caixas}>
          <Text style={styles.textoinput}>Email</Text>
          <TextInput style={styles.input}
            ref={emailInput}
            value={email}
            onChangeText={(texto) => setEmail(texto)}
            keyboardType="email-address" placeholder="Insira seu email" />
        </Animatable.View>


        <Animatable.View animation="bounceInLeft" style={styles.caixas}>
          <Text style={styles.textoinput}>Senha</Text>
          <TextInput style={styles.input}
            value={senha}
            onChangeText={(texto) => setSenha(texto)}
            secureTextEntry={true} placeholder="Insira sua Senha" />
        </Animatable.View>

        <Animatable.View animation="bounceInLeft" style={styles.caixas}>
          <Text style={styles.textoinput}>Confirmar Senha</Text>
          <TextInput style={styles.input}
            value={confirmsenha}
            onChangeText={(texto) => setConfirmsenha(texto)}
            secureTextEntry={true} placeholder="Insira sua Senha novamente" />
        </Animatable.View>
        <Animatable.View animation="bounceInUp" style={styles.areabtn}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext} onPress={cadastrar}>Cadastrar</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounceInUp" style={styles.areabtn}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext} onPress={irlogin}>Login</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    padding: 10
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: ''
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  caixas: {
    width: '100%',
    justifyContent: "flex-start",
    padding: 15,
    alignItems: 'center',

  },
  input: {
    width: '85%',
    borderBottomWidth: 1
  },
  textoinput: {
    width: '82%',
    textAlign: "left",
    fontSize: 18,
    fontWeight: "800"
  },
  btn: {
    backgroundColor: '#00A0FC',
    width: '100%',
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  btntext: {
    fontSize: 20,
    textAlign: "center"

  },
  areabtn: {
    width: '80%',
    margin: 15
  }

})