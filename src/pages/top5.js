import { Picker } from '@react-native-community/picker';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Top5Component from '../components/top5component';
import { Top5Context } from '../contexts/Top5Context';
import firebase from '../firebaseConnection'
export default function Top5() {
  const [filtro, setfiltro] = useState('All');
  const { CarregaTop5, audiobookstop5, audios, filtrotop5 } = useContext(Top5Context)



  {/* Carrega novamente o top estrelas*/
    useEffect(() => {
      CarregaTop5();
    }, [])


    useEffect(() => {
      filtrotop5(filtro)
    }, [filtro])
  }




  useEffect(() => {

    firebase.database().ref(`audiobooks/Classicos`).once('value', (snapshot1) => {
      snapshot1.forEach((chilItem1) => {
        firebase.database().ref('top5').child(chilItem1.val().nome).set({
          nome: chilItem1.val().nome, linkimage: chilItem1.val().linkimage,
          linkaudio: chilItem1.val().linkaudio, descricao: chilItem1.val().descricao,
          categoria: chilItem1.val().categoria,
          id: chilItem1.val().id,
          nota: chilItem1.val().nota, notatotal: chilItem1.val().notatotal, npessoas: chilItem1.val().npessoas
        })
      }

      )

    })

    firebase.database().ref(`audiobooks/HarryPotterCollection`).once('value', (snapshot2) => {
      snapshot2.forEach((chilItem2) => {
        firebase.database().ref('top5').child(chilItem2.val().nome).once('value', (snapshot3) => {
          firebase.database().ref('top5').child(chilItem2.val().nome).update({
            nome: chilItem2.val().nome, linkimage: chilItem2.val().linkimage,
            linkaudio: chilItem2.val().linkaudio, descricao: chilItem2.val().descricao,
            categoria: chilItem2.val().categoria,
            id: chilItem2.val().id,
            nota: chilItem2.val().nota, notatotal: chilItem2.val().notatotal, npessoas: chilItem2.val().npessoas
          })
        })
      })
    })
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.titulo}>Top 5</Text>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Icon name="book" color="#00A0FC" size={30} />
        </TouchableOpacity>
      </View>
      <Picker mode="dropdown" style={{ marginTop: 10 }} selectedValue={filtro} onValueChange={(value) => setfiltro(value)}>
        <Picker.Item label="All" value={'All'} />
        <Picker.Item label="5 Estrelas" value="5" />
        <Picker.Item label="4 Estrelas" value="4" />
        <Picker.Item label="3 Estrelas" value="3" />
        <Picker.Item label="2 Estrelas" value="2" />
        <Picker.Item label="1 Estrelas" value="1" />
      </Picker>

      <FlatList showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} ScrollIndicator={false} data={audiobookstop5}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <Top5Component data={item} />
        }
      />

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
  }
})