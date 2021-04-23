import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, TabActions } from '@react-navigation/native';
import firebase from '../firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../contexts/auth';
import * as Animatable from 'react-native-animatable'
console.disableYellowBox = true;
export default function Login() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { SignIn } = useContext(AuthContext)

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false);
      return;
    }, 1500);
  }, []);

  function cadastrar() {
    navigation.navigate('Cadastro');
  }

  async function logar() {
    SignIn(email, senha);
  }

  return (
    <View style={styles.container}>
      {loading ? <View><Animatable.Image animation="pulse" fadeDuration={100} iterationCount="infinite" source={require('../assets/Kitabicon.png')}></Animatable.Image>
        <ActivityIndicator color='#00A0FC' size={40} />
      </View> :
        <View style={[styles.caixas, { padding: 7 }]}>
          <ScrollView showsVerticalScrollIndicator={false} style={{
            width: '100%'
          }}>
            <View style={{
              width: '100%',
              justifyContent: "center",
              alignItems: 'center'
            }}>
              <Animatable.Text fadeDuration={100} animation="bounceIn" style={styles.titulo}>Login</Animatable.Text>
              <Animatable.Image fadeDuration={100} animation="bounceIn" source={require('../assets/Kitabicon.png')} style={styles.logo} />


              <Animatable.View animation="bounceInLeft" style={styles.caixas}>
                <Text style={styles.textoinput}>Email</Text>
                <TextInput style={styles.input}
                  value={email}
                  onChangeText={(texto) => setEmail(texto)}
                  keyboardType="email-address" placeholder="Insira seu email" />
              </Animatable.View>


              <Animatable.View animation="bounceInLeft" style={styles.caixas}>
                <Text style={styles.textoinput}>Senha</Text>
                <TextInput style={styles.input}
                  value={senha}
                  onChangeText={(texto) => setSenha(texto)}
                  secureTextEntry={true} placeholder="Insira seu Senha" />
              </Animatable.View>
              <Animatable.View animation="bounceInUp" style={styles.areabtn}>
                <TouchableOpacity style={styles.btn} onPress={logar}>
                  <Text style={styles.btntext}>Logar</Text>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View animation="bounceInUp" style={styles.areabtn}>
                <TouchableOpacity style={styles.btn} onPress={cadastrar}>
                  <Text style={styles.btntext}>Cadastrar</Text>
                </TouchableOpacity>

              </Animatable.View>
            </View>
          </ScrollView>
        </View>

      }

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40
  },
  caixas: {
    width: '100%',
    justifyContent: "flex-start",
    padding: 15,
    alignItems: 'center'
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
  },
  btnlogo: {
    backgroundColor: '#00A0FC',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  }

})