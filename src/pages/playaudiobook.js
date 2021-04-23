import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundPlayer from 'react-native-sound-player'
import Slider from '@react-native-community/slider';
import firebase from '../firebaseConnection';
import { AuthContext } from '../contexts/auth';
import { BibliotecaContext } from '../contexts/Biblioteca';
export default function playaudiobook({ route }) {
  const [nestrelas, setnestrelas] = useState(0)
  const [estrela1, setEstrela1] = useState('#ddd');
  const [estrela2, setEstrela2] = useState('#ddd');
  const [estrela3, setEstrela3] = useState('#ddd');
  const [estrela4, setEstrela4] = useState('#ddd');
  const [estrela5, setEstrela5] = useState('#ddd');
  const { user, SignOut } = useContext(AuthContext);
  const { carregaBiblioteca } = useContext(BibliotecaContext)
  {/*Carrega o link do áudio para que possa ser escutado ao se apertar o botão play */
    useEffect(() => {
      if (route.params?.linkaudio) {
        async function loadaudio() {

          await SoundPlayer.loadUrl(route.params?.linkaudio);
          console.log(route.params?.linkaudio)


        }

        loadaudio();
      }
      carregaBiblioteca();
    }, []);

    {/* Para o áudiobook caso o usuario saia da página*/
      useEffect(() => {

        return () => { SoundPlayer.stop(); }
      }, [])
    }
  }

  {/* Carrega a nota dada pelo User e com isso insere o numero de estrelas que ele deu.  */

    useEffect(() => {
      function carregadados() {
        firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).once('value', (snapshot) => {
          {/*Caso haja algum erro ele retornará inserindo nota: 0 para a tabela User AudioBook, casoi não retorne erro ele irá inserir a avaliação que o usuario fez */ }
          try {
            setnestrelas(snapshot.val().nota)

            firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).set({
              nota: nestrelas,
              nome: route.params?.nome,
              categoria: route.params?.categoria,
              descricao: route.params?.descricao,
              id: route.params?.id,
              linkimage: route.params?.linkimage,
              linkaudio: route.params?.linkaudio
            })
            if (snapshot.val().nota >= 0) {
              firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).update({
                nota: snapshot.val().nota,

              })
            }
          } catch (error) {
            setnestrelas(0)
            firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).set({
              nota: nestrelas,
              nome: route.params?.nome,
              categoria: route.params?.categoria,
              descricao: route.params?.descricao,
              id: route.params?.id,
              linkimage: route.params?.linkimage,
              linkaudio: route.params?.linkaudio
            })
          }





          {/*Insere a avaliação do User as estrelas */
            firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).once('value', (snapshot2) => {
              try {
                if (snapshot2.val().nota == 1) {
                  setEstrela1('#ff0');
                  setEstrela2('#ddd');
                  setEstrela3('#ddd');
                  setEstrela4('#ddd');
                  setEstrela5('#ddd');

                }
                if (snapshot2.val().nota == 2) {
                  setEstrela1('#ff0');
                  setEstrela2('#ff0');
                  setEstrela3('#ddd');
                  setEstrela4('#ddd');
                  setEstrela5('#ddd');
                }
                if (snapshot2.val().nota == 3) {
                  setEstrela1('#ff0');
                  setEstrela2('#ff0');
                  setEstrela3('#ff0');
                  setEstrela4('#ddd');
                  setEstrela5('#ddd');
                }
                if (snapshot2.val().nota == 4) {
                  setEstrela1('#ff0');
                  setEstrela2('#ff0');
                  setEstrela3('#ff0');
                  setEstrela4('#ff0');
                  setEstrela5('#ddd');

                }
                if (snapshot2.val().nota == 5) {
                  setEstrela1('#ff0');
                  setEstrela2('#ff0');
                  setEstrela3('#ff0');
                  setEstrela4('#ff0');
                  setEstrela5('#ff0');
                }
              } catch (error) {

              }

            })
          }
        })
      }
      carregadados();
    }, []);
  }

  function play() {
    {/* Inicia o audiobook */ }
    SoundPlayer.play();
  }
  function paro() {
    {/* Da Pause no audiobook */ }
    SoundPlayer.pause();
  }

  async function votacaobanco(nestrelas) {
    const categoria = route.params?.categoria;
    const id = route.params.id;

    await firebase.database().ref(`audiobooks/${categoria}/${id}`).once('value', (snapshot1) => {
      {/*Adiciona a nova avaliação ao "nó" user Audiobook */ }

      firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).once('value', (snapshot2) => {
        firebase.database().ref(`usuarios/${user.uid}`).once('value', (snapshot) => {
          const nlivros = (snapshot2.val().nota > 0) ? snapshot.val().nlivros : snapshot.val().nlivros + 1
          firebase.database().ref(`usuarios/${user.uid}`).update({
            nlivros: nlivros
          })
        })


        {/* soma a avaliação de todos os usuarios a esse audiobook  */ }
        const notatotal = (snapshot2.val().nota == 0) ? snapshot1.val().notatotal + nestrelas : snapshot1.val().notatotal - snapshot2.val().nota + nestrelas
        {/* adquire a quantidade de pessoas que avaliaram esse audiobook e adiciona 1 caso seja um novo avaliador */ }
        const npessoas = (snapshot2.val().nota == 0) ? snapshot1.val().npessoas + 1 : snapshot1.val().npessoas;
        {/* Divide a média de todos os avaliadores pelo numero de pessoas que avaliaram esse audiobook */ }
        const nota = (notatotal / (npessoas));
        {/*Adiciona a nota total,numero de pessoas e a média de nota ao Banco de dados */ }
        firebase.database().ref(`audiobooks/${categoria}/${id}`).set({
          notatotal: notatotal,
          npessoas: npessoas,
          nota: parseFloat(nota.toFixed(2)),
          nome: route.params?.nome,
          categoria: route.params?.categoria,
          descricao: route.params?.descricao,
          id: route.params?.id,
          linkimage: route.params?.linkimage,
          linkaudio: route.params?.linkaudio

        })
        firebase.database().ref(`Votação/${user.uid}/${route.params?.nome}`).set({
          nota: nestrelas,
          nome: route.params?.nome,
          categoria: route.params?.categoria,
          descricao: route.params?.descricao,
          id: route.params?.id,
          linkimage: route.params?.linkimage,
          linkaudio: route.params?.linkaudio
        })

      })

    })
    carregaBiblioteca();
  }
  function votação(estrela) {
    {/*setar estrelas no banco */
      if (estrela == 1) {
        setEstrela1('#ff0');
        setEstrela2('#ddd');
        setEstrela3('#ddd');
        setEstrela4('#ddd');
        setEstrela5('#ddd');

      }
      if (estrela == 2) {
        setEstrela1('#ff0');
        setEstrela2('#ff0');
        setEstrela3('#ddd');
        setEstrela4('#ddd');
        setEstrela5('#ddd');
      }
      if (estrela == 3) {
        setEstrela1('#ff0');
        setEstrela2('#ff0');
        setEstrela3('#ff0');
        setEstrela4('#ddd');
        setEstrela5('#ddd');
      }
      if (estrela == 4) {
        setEstrela1('#ff0');
        setEstrela2('#ff0');
        setEstrela3('#ff0');
        setEstrela4('#ff0');
        setEstrela5('#ddd');

      }
      if (estrela == 5) {
        setEstrela1('#ff0');
        setEstrela2('#ff0');
        setEstrela3('#ff0');
        setEstrela4('#ff0');
        setEstrela5('#ff0');
      }
    }
    votacaobanco(estrela);
  }
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text  style={styles.titulo}>{route.params?.nome} </Text>
        <TouchableOpacity style={{ marginRight: 10 }} >

          <Icon name="book" color="#00A0FC" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.caixa}>
            <View style={styles.caixaimg}>
              <Image source={{
                uri: `${route.params?.linkimage}`
              }} style={styles.image} />

              <View style={{ height: '50%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 20, paddingTop: 30 }}>
                <TouchableOpacity onPress={() => votação(1)}>
                  <Icon name="ios-star-sharp" size={28} color={estrela1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => votação(2)}>
                  <Icon name="ios-star-sharp" size={28} color={estrela2} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => votação(3)}>
                  <Icon name="ios-star-sharp" size={28} color={estrela3} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => votação(4)}>
                  <Icon name="ios-star-sharp" size={28} color={estrela4} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => votação(5)}>
                  <Icon name="ios-star-sharp" size={28} color={estrela5} />
                </TouchableOpacity>

              </View>

            </View>
            <View style={styles.caixatexto}>
              <Text style={[styles.titulo, { marginTop: 50, textAlign: "center" }]}>{route.params?.nome}</Text>
              <Text style={{ width: '80%' }}>{route.params?.descricao}</Text>

            </View>

          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: "row" }}>
            <View style={{ height: 100 }}>

              {/* Espaço inferior*/}
            </View>
            <TouchableOpacity onPress={play}>
              <Icon name="md-play" color="#00A0FC" size={30} />
            </TouchableOpacity>

            <Slider
              thumbTintColor="#00A0FC"
              minimumTrackTintColor="#00A0FC" maximumTrackTintColor="#111"
              style={{ width: '70%' }} />
            <TouchableOpacity onPress={paro}>
              <Icon name="md-stop" color="#00A0FC" size={30} />
            </TouchableOpacity>
            <View style={{ height: 50 }}>
              {/* Espaço inferior*/}
            </View>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
    textAlign:"left",
    width: "80%"
  },
  image: {
    width: 180, height: 190,
    resizeMode: "stretch",
    backgroundColor: '#222',
    marginTop: 50,
  },
  caixaimg: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%'
  },
  caixa: {
    flexDirection: "row",
  },
  caixatexto: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%'
  }
})
