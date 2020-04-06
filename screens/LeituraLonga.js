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
import brand from '../assets/images/icon.png'

import axios from 'axios'
import { RectButton, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBBcHIgMDYgMjAyMCAxOTowOTo0NCBHTVQrMDAwMC5ldmVydG9uLmxldmlAaG90bWFpbC5jb20iLCJpYXQiOjE1ODYyMDAxODR9.cz4Xc0gjq8gyIZJK998ZW7JJz3rad6s9GZSnO7umjWE"

export default function LeituraLonga() {

  const [dados, setDados] = useState([])

  function getBooks() {
    axios.get("https://bibleapi.co/api/books", token)
      .then(respone => setDados(respone.data))
      .catch(() => { Alert.alert('Erro ao recupar API') })
  }

  return (
    <View style={styles.container}    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View>
          <View>
            <Image source={brand}
              style={{
                alignSelf: "center",
                width: 100, height: 100
              }} />
            <View>
              {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text> */}
              <Text style={{
                textAlign: "center",
                fontSize: 20, marginVertical: 10
              }}>""</Text>
            </View>

            <TouchableOpacity
              style={styles.socialButtonSearch}
            // onPress={getRandomVerse}
            >
              <Text>Receba sua mensagem</Text>
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
  socialButtonSearch: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: 40,
    backgroundColor: "#06d4c4"
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
