import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Audios from '../components/audios';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from '../firebaseConnection'
import { AudioBooksContext } from '../contexts/AudiobooksContext';
import * as Animatable from 'react-native-animatable'
export default function Discover() {

  const { CarregaListaHarryPotter, ListaHarryPotter, CarregaListaClassicos, ListaClassicos, CarregaListaFicçãoCientifica, ListaFicçãoCientifica, CarregaColeções, ListaColeções, CarregaLiteraturaBrasileira, ListaLiteraturaBrasileira, animation1, animation2, animation3, loading } = useContext(AudioBooksContext);

  const animationlist1 = useRef(null)
  const animationlist2 = useRef(null)
  const animationlist3 = useRef(null)
  {/* Carrega as Seções de Audiobooks através de um UseState(()=>)  */
    useEffect(() => {
      CarregaListaClassicos();
      CarregaListaHarryPotter();
      CarregaColeções();
      CarregaLiteraturaBrasileira();

    }, []);
  }
  useEffect(() => {
    if (animation1 == false) {
      console.log('Animação Falsa')
    } else {
      animationlist1.current.bounceInLeft()
    }

  }, [animation1])

  useEffect(() => {
    if (animation2 == false) {
      console.log('Animação Falsa')
    } else {
      animationlist2.current.bounceInRight()
    }

  }, [animation2])

  useEffect(() => {
    if (animation3 == false) {
      console.log('Animação Falsa')
    } else {
      animationlist3.current.bounceInLeft()
    }
  }, [animation3])








  return (
    <View style={styles.container}>
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <Animatable.View animation="bounceIn" style={styles.bar}>
          <Text style={styles.titulo}>Discover</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon name="book" color="#00A0FC" size={30} />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <View style={{ height: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            loading &&
            <View style={styles.container}>
              <ActivityIndicator color="#00A0FC" size={40} />
            </View>
          }
          {!loading &&
            <View>
              <Animatable.View ref={animationlist1} style={styles.container}>
                <Text style={styles.tituloAudioBook}>Literatura Brasileira</Text>
                <FlatList showsHorizontalScrollIndicator={false} ScrollIndicator={false} horizontal={true} data={ListaLiteraturaBrasileira}
                  keyExtractor={(item) => item.nome}
                  renderItem={({ item }) => <Audios data={item} animation={() => ativaanimation()} />
                  }
                />
              </Animatable.View>
              <Animatable.View ref={animationlist2} style={styles.container}>
                <Text style={styles.tituloAudioBook}>Classicos</Text>
                <FlatList showsHorizontalScrollIndicator={false} ScrollIndicator={false} horizontal={true} data={ListaClassicos}
                  keyExtractor={(item) => item.nome}
                  renderItem={({ item }) => <Audios data={item} animation={() => ativaanimation()} />
                  }
                />
              </Animatable.View>

              <Animatable.View ref={animationlist3} style={styles.container}>
                <Text style={styles.tituloAudioBook}>Coleções</Text>
                <FlatList showsHorizontalScrollIndicator={false} ScrollIndicator={false} horizontal={true} data={ListaColeções}
                  keyExtractor={(item) => item.nome}
                  renderItem={({ item }) => <Audios data={item} animation={() => ativaanimation()} />
                  }
                />
              </Animatable.View>
            </View>
          }



          <View style={{ height: 100 }}></View>
        </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  tituloAudioBook: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10
  }
})