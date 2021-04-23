import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Top5Component({ data }) {
  const navigation = useNavigation();
  function irplayer() {
    navigation.navigate('PlayerAudioBook', { nome: data.nome, linkimage: data.linkimage, descricao: data.descricao, linkaudio: data.linkaudio, categoria: data.categoria, id: data.id, nota: 0 });
  }
  const [estrela1, setestrela1] = useState(false)
  const [estrela2, setestrela2] = useState(false)
  const [estrela3, setestrela3] = useState(false)
  const [estrela4, setestrela4] = useState(false)
  const [estrela5, setestrela5] = useState(false)

  useEffect(() => {
    console.log(data.nota)
    if (data.nota >= 4.5) {
      setestrela1(true)
      setestrela2(true)
      setestrela3(true)
      setestrela4(true)
      setestrela5(true)
    } else if (data.nota < 4.5 && data.nota >= 3.5) {
      setestrela1(true)
      setestrela2(true)
      setestrela3(true)
      setestrela4(true)
      setestrela5(false)
    } else if (data.nota < 3.5 && data.nota >= 2.5) {
      setestrela1(true)
      setestrela2(true)
      setestrela3(true)
      setestrela4(false)
      setestrela5(false)
    } else if (data.nota < 2.5 && data.nota >= 1.5) {
      setestrela1(true)
      setestrela2(true)
      setestrela3(false)
      setestrela4(false)
      setestrela5(false)
    }
    else if (data.nota < 1.5 && data.nota >= 0.5) {
      setestrela1(true)
      setestrela2(false)
      setestrela3(false)
      setestrela4(false)
      setestrela5(false)
    } else {
      setestrela1(false)
      setestrela2(false)
      setestrela3(false)
      setestrela4(false)
      setestrela5(false)
    }
  }, []);


  return (
    <TouchableOpacity onPress={irplayer}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
          <Image style={styles.imagem} source={{
            uri: `${data.linkimage}`,
          }} />
          <View style={{ flexDirection: 'column', padding: 10 }}>
            <Text numberOfLines={3} style={styles.titulo}>{data.nome}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 15, paddingRight: 20 }}>
              <Icon name="ios-star-sharp" size={28} color={estrela1 ? '#ff0' : '#ddd'} />
              <Icon name="ios-star-sharp" size={28} color={estrela2 ? '#ff0' : '#ddd'} />
              <Icon name="ios-star-sharp" size={28} color={estrela3 ? '#ff0' : '#ddd'} />
              <Icon name="ios-star-sharp" size={28} color={estrela4 ? '#ff0' : '#ddd'} />
              <Icon name="ios-star-sharp" size={28} color={estrela5 ? '#ff0' : '#ddd'} />
            </View>
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
    paddingLeft: 30,
  },
  imagem: {
    width: 140,
    height: 140,
    resizeMode: "stretch",
    borderRadius: 18
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    width: 170
  }
})