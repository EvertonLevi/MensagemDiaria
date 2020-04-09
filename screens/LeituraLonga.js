import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Linking, Dimensions,
  Image, Platform, StyleSheet,
  Text, TouchableOpacity, FlatList,
  View, Alert
} from 'react-native';
import Constants from 'expo-constants'
import { FontAwesome } from '@expo/vector-icons'

import brand from '../assets/images/icon.png'

import axios from 'axios'
import { RectButton, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBBcHIgMDYgMjAyMCAxOTowOTo0NCBHTVQrMDAwMC5ldmVydG9uLmxldmlAaG90bWFpbC5jb20iLCJpYXQiOjE1ODYyMDAxODR9.cz4Xc0gjq8gyIZJK998ZW7JJz3rad6s9GZSnO7umjWE"

export default function LeituraLonga() {

  const [dados, setDados] = useState([])
  const [test, setTest] = useState(0)

  const gerarRandom = () => {
    let numAleatorio = Math.random()
    numAleatorio = Math.floor(numAleatorio * 5)
    setTest(numAleatorio)

    const version = Array()
    version[0] = 1
    version[1] = 2
    version[2] = 3
    version[3] = 4
    version[4] = 5

    const abbrev = Array()
    abbrev[0] = 1
    abbrev[1] = 2
    abbrev[2] = 3
    abbrev[3] = 4
    abbrev[4] = 5

    const chapter = Array()
    chapter[0] = 1
    chapter[1] = 2
    chapter[2] = 3
    chapter[3] = 4
    chapter[4] = 5

    let escolhaVersion = version[numAleatorio]
    alert(escolhaVersion)

    let escolhaAbbrev = abbrev[0]
    alert(escolhaAbbrev)

    let escolhaChapter = chapter[0]
    alert(escolhaChapter)
  }



  // Get Chapter - returns all verses and details of a chapter
  // vou gerar um capítulo inteiro e aleatorio
  // https://bibleapi.co/api/verses/:version/:abbrev/:chapter

  function getChapter() {
    // passar assim ${varVersio} etc etc
    axios.get("https://bibleapi.co/api/verses/:version/:abbrev/:chapter", token)
      .then(respone => setDados(respone.data))
      .catch(() => { Alert.alert('Erro ao recupar API') })
  }

  return (
    <View style={styles.container}>
      <ScrollView >

        <View>
          <Image source={brand} style={{ alignSelf: "center", width: 100, height: 100 }} />
          <View>
            {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text> */}
            <Text style={styles.msmText}>"Teste tes tes tes"</Text>
            <Text style={styles.msmAuthor}>"dasdas sa as  "- TEste</Text>
          </View>

          <TouchableOpacity
            style={styles.socialButtonSearch}
          // onPress={getRandomVerse}
          >
            <Text style={{
              fontSize: 20,
            }}>Receba sua mensagem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.share}>
          <Text style={{
            fontSize: 20,
            alignSelf: "center",
          }}>Compartilhe esta mensagem de fé</Text>

          <View style={styles.containerShare}>
            <TouchableOpacity
              // onPress={sendFacebook}
              style={styles.socialButtonFB} >
              <FontAwesome name="facebook" color="#FFF" size={30} />
              {/* <Text>Facebook - n funciona ainda </Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={sendWhatsApp}
              style={styles.socialButtonWA} >
              <FontAwesome name="whatsapp" color="#FFF" size={30} />
            </TouchableOpacity>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7D3FC',
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight + 20
  },
  contentContainer: {
    paddingTop: 20,
  },
  containerShare: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  gradient: {
    width: 200,
    height: 200,
  },
  socialButtonSearch: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: width - 70,
    height: 60,
    backgroundColor: "#33A5FF",
    borderRadius: 10,
  },
  socialButtonFB: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3b5998',
    borderRadius: 50,
    marginHorizontal: 10,
    height: 70,
    width: 70,
    // shadowColor: 'rgba(46, 229, 157, 0.9)',
    // shadowOpacity: 1,
    // elevation: 10,
    // shadowRadius: 5,
    // shadowOffset: { width: 1, height: 10 },
    // color: '#FFFFFF'
  },
  socialButtonWA: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#34af23',
    borderRadius: 50,
    height: 70,
    width: 70,
    // shadowColor: 'rgba(46, 229, 157, 0.9)',
    // shadowOpacity: 1,
    // elevation: 10,
    // shadowRadius: 5,
    // shadowOffset: { width: 1, height: 10 },
    // color: '#FFFFFF'
  },
  msmText: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 30,
  },
  msmAuthor: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  share: {
    marginVertical: 30,
  },



  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
