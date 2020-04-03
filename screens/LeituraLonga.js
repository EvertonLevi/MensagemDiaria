import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Linking, Dimensions,
  Image, Platform, StyleSheet,
  Text, TouchableOpacity, FlatList,
  View, Alert
} from 'react-native';
import axios from 'axios'
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LeituraLonga() {

  const [dados, setDados] = useState([])

  function getBooks() {
    axios.get("https://bibleapi.co/api/books")
      .then(respone => setDados(respone.data))
      .catch(() => { Alert.alert('Erro ao recupar API') })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <View>
        <TouchableOpacity
          style={{ backgroundColor: '#FFF' }}
          onPress={getBooks} >
          <Text>Books</Text>
        </TouchableOpacity>
        <FlatList
          data={dados}
          keyExtractor={dados => String(dados.name)}
          renderItem={({ item }) => (
            <TouchableOpacity >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7D3FC',
    paddingHorizontal: 24,
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
