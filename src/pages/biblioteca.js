import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../firebaseConnection';
import Bibliotecacomponent from '../components/biblioteca';
import { AuthContext } from '../contexts/auth';
import { BibliotecaContext } from '../contexts/Biblioteca';

export default function Biblioteca() {
  const { carregaBiblioteca, audiobooks } = useContext(BibliotecaContext)

  useEffect(() => {
    carregaBiblioteca();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.titulo}>Biblioteca</Text>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Icon name="book" color="#00A0FC" size={30} />
        </TouchableOpacity>
      </View>
      <FlatList style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false} ScrollIndicator={false} showsVerticalScrollIndicator={false} data={audiobooks}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <Bibliotecacomponent data={item} />
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