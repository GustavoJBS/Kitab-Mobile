import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function Audios({ data }) {
  const navigation = useNavigation();
  function irplayer() {
    navigation.navigate('PlayerAudioBook', { nome: data.nome, linkimage: data.linkimage, descricao: data.descricao, linkaudio: data.linkaudio, categoria: data.categoria, id: data.id, nota: 0 });
  }
  return (

    <TouchableOpacity onPress={irplayer}>
      <View style={styles.arealivro} >
        <Image source={{
          uri: `${data.linkimage}`,
        }} style={styles.imglivro} />
        <View >
          <Text numberOfLines={1} style={styles.titulolivro}>{data.nome}</Text>
          <Text style={styles.nReviews}>NºReviews: {data.npessoas}</Text>
        </View>
      </View>
    </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
  imglivro: {
    width: 120, height: 130, borderRadius: 18,
    borderWidth: 1,
    resizeMode: "stretch"
  },
  titulolivro: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "justify",
    width: 120,
  },
  arealivro: {
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 130,
  },
  nReviews: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.55)'
  }
})