import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function PesquisaComponent({ data }) {
  const navigation = useNavigation();
  function irplayer() {
    navigation.navigate('PlayerAudioBook', { nome: data.nome, linkimage: data.linkimage, descricao: data.descricao, linkaudio: data.linkaudio, categoria: data.categoria, id: data.id });
  }
  return (
    <TouchableOpacity onPress={irplayer}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Image source={{
            uri: `${data.linkimage}`,
          }} style={styles.imglivro} />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titulolivro}>{data.nome}</Text>
            <Text style={styles.nreviews}>Nº de Reviews: {data.npessoas}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

    width: '98%',
    height: 180,
    justifyContent: 'center',
    margin: 5,
    elevation: 2,
    borderWidth: 0,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 15,


  },
  imglivro: {
    width: 140, height: 145, borderRadius: 18,
    borderWidth: 1,
    resizeMode: "stretch"
  },
  titulolivro: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    width: 120,
    fontStyle: "italic"
  },
  arealivro: {
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 130,
    height: 200
  },
  nreviews: {
    fontSize: 15,
    fontStyle: "italic",
    marginTop: 10
  }
})