import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Switch, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../contexts/auth';
import firebase from '../firebaseConnection';
import * as Animatable from 'react-native-animatable'

export default function Perfil({ route }) {
  const { user, SignOut } = useContext(AuthContext);
  const [Notific, setnotific] = useState(true);
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [nlivros, setnlivros] = useState(0)
  const [editando, setEditando] = useState(false);
  const [novonome, setnovonome] = useState('');


  function mudanome(v) {
    setnovonome(v);

  }
  function Salvamudanome() {
    firebase.database().ref(`usuarios/${user.uid}`).update({
      nome: novonome
    })
    firebase.database().ref(`usuarios/${user.uid}`).once('value', (snapshot) => {
      setNome(snapshot.val().nome)
      setEditando(false)
    })
    alert('Salvo')
  }

  useEffect(() => {
    firebase.database().ref(`usuarios/${user.uid}`).once('value', (snapshot) => {
      setEmail(snapshot.val().email)
      setNome(snapshot.val().nome)
      setnlivros(snapshot.val().nlivros)
      setnovonome(snapshot.val().nome)
    })

  }, [])


  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceIn" style={styles.bar}>
        <Text style={styles.titulo}>{user && user.nome}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => SignOut()}>
            <Icon name="exit-outline" color="#00A0FC" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="book" color="#00A0FC" size={30} />
          </TouchableOpacity>
        </View>

      </Animatable.View>
      <Animatable.View animation="bounceInUp" style={{ height: '100%', width: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%' }}>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
            <Image source={require('../assets/User-Account-Person-PNG-File.png')} style={{ width: 150, height: 150, borderRadius: 75 }} />
          </View>

          <View style={{ height: 'auto', justifyContent: 'center', alignItems: "center", marginTop: 50 }}>
            <View style={{
              flex: 1, borderRadius: 10, borderWidth: 1, width: '80%', justifyContent: 'center', alignItems: "center", elevation: 3,
              shadowOffset: { width: 1, height: 1 },
              shadowColor: '#333',
              shadowOpacity: 0.3,
              shadowRadius: 2
            }}>
              <View style={styles.caixas}>
                <Text style={styles.textoinput}>Seu Email</Text>
                <Text style={styles.input} editable={false}  >{email}</Text>
              </View>
              <View style={styles.caixas}>
                <Text style={styles.textoinput}>Seu Nome</Text>
                <TextInput style={styles.input} editable={editando} value={nome} />
              </View>
              <View style={styles.caixas}>
                <Text style={styles.textoinput}>Número de livros lidos</Text>
                <Text style={styles.input} editable={false}  >{nlivros}</Text>
              </View>

              <View style={styles.caixas}>
                <TouchableOpacity onPress={() => { setEditando(true) }}>
                  <Text style={{ fontSize: 19, color: '#00A0FC' }}>Editar</Text>

                </TouchableOpacity>

                <Text style={styles.textoinput}>Editar nome de usuário</Text>
              </View>
              <Modal visible={editando}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", padding: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Digite o novo nome de usuário desejado</Text>
                  <TextInput style={styles.input} value={novonome} onChangeText={(v) => mudanome(v)} placeholder="Digite seu novo nome de Usuário" />
                  <TouchableOpacity style={styles.btn} onPress={Salvamudanome}>
                    <Text>Salvar</Text>
                  </TouchableOpacity>
                </View>

              </Modal>

              <View style={styles.caixas}></View>


            </View>
          </View>

        </ScrollView>

      </Animatable.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  bar: {
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },
  caixas: {
    width: '100%',
    height: 80,
    justifyContent: "flex-start",
    padding: 10,
    alignItems: 'center',
    textAlign: "center",

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
    shadowRadius: 2,
    margin: 20
  },
  input: {
    width: '85%',
    borderBottomWidth: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
})