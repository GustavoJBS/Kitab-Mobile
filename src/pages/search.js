import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import firebase from '../firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-community/picker';
import Bibliotecacomponent from '../components/biblioteca';
import PesquisaComponent from '../components/pesquisa';

export default function Pesquisa() {
  const [filtro, setfiltro] = useState(null);
  const [audiobooks, setaudioBooks] = useState([]);


  useEffect(() => {
    if (filtro !== null) {
      firebase.database().ref(`audiobooks/${filtro}`).on('value', (snapshot) => {
        setaudioBooks([]);
        snapshot.forEach((chilItem) => {
          let data = {
            nome: chilItem.val().nome, linkimage: chilItem.val().linkimage,
            linkaudio: chilItem.val().linkaudio, descricao: chilItem.val().descricao,
            categoria: chilItem.val().categoria,
            id: chilItem.val().id,
            nota: chilItem.val().nota, notatotal: chilItem.val().notatotal, npessoas: chilItem.val().npessoas

          };
          setaudioBooks(oldarray => [...oldarray, data]);
        }
        )

      })
    } else {
      setaudioBooks([]);
    }

  }, [filtro]);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.titulo}>Pesquisa</Text>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Icon name="book" color="#00A0FC" size={30} />
        </TouchableOpacity>
      </View>
      <Picker mode="dropdown" style={{ marginTop: 10 }} selectedValue={filtro} onValueChange={(value) => setfiltro(value)}>
        <Picker.Item label="Selecione a Categoria" value={null} />
        <Picker.Item label="HarryPotterCollection" value="HarryPotterCollection" />
        <Picker.Item label="Classicos" value="Classicos" />
        <Picker.Item label="Critica Literaria" value="Critica Literaria" />
        <Picker.Item label="Folclore" value="Folclore" />
        <Picker.Item label="Humor" value="Humor" />
        <Picker.Item label="Jogos" value="Jogos" />
        <Picker.Item label="Literatura Brasileira" value="Literatura Brasileira" />
        <Picker.Item label="Poesia" value="Poesia" />
        <Picker.Item label="Coleções" value="Coleções" />
        <Picker.Item label="Contos" value="Contos" />
        <Picker.Item label="Ficção Científica" value="Ficção Científica" />
        <Picker.Item label="Genealogia" value="Genealogia" />
        <Picker.Item label="Jornais" value="Jornais" />
        <Picker.Item label="infantojuvenis" value="infantojuvenis" />
        <Picker.Item label="Outros Livros" value="Outros Livros" />
      </Picker>
      <FlatList style={{}} showsHorizontalScrollIndicator={false} ScrollIndicator={false} showsVerticalScrollIndicator={false} data={audiobooks}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <PesquisaComponent data={item} />
        }
      />
    </View >
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
  picker: {
    borderRadius: 10
  }
})