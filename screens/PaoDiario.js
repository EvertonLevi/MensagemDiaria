import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
  Linking, Dimensions,
  Image, Platform, StyleSheet,
  Text, TouchableOpacity, FlatList,
  View, Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import brand from '../assets/images/icon.png'
import { MonoText } from '../components/StyledText';

const { width, height } = Dimensions.get('window')

// share Linking => https://medium.com/@ahmed_aly/sharing-to-whatsapp-from-a-react-native-application-6d242a427667
export default function PaoDiario() {

  const [mensagem, setMensagem] = useState('')
  const [dados, setDados] = useState([])
  const [random, setRandom] = useState(Number)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?text=${mensagem}`)
  }
  function sendFacebook() {
    // fazer if caso n esteja logado no fb
    Linking.openURL(`https://www.facebook.com/${mensagem}`)
    // Linking.openURL(`facebook://send?text=${mensagem}`)
  }

  function getRandomVerse() {
    // setRandom(random + Math.random(1, 20))
    axios.get('https://bibleapi.co/api/verses/nvi/random')
      .then(respone => setMensagem(respone.data))
      .catch(() => { Alert.alert('Erro ao recupar API') })
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View>

          <Image source={brand} style={{ alignSelf: "center", width: 100, height: 100 }} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text>
            <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}>"{mensagem.text}"</Text>
          </View>

          <TouchableOpacity
            style={styles.socialButtonFB}
            onPress={getRandomVerse} >
            <Text>Books</Text>
          </TouchableOpacity>
          <Text>{dados.length}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={sendFacebook}
            style={styles.socialButtonFB} >
            <Text>Facebook - n funciona ainda </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendWhatsApp}
            style={styles.socialButtonWA} >
            <Text>WhatsApp</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View >
  );
}

PaoDiario.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7D3FC',
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: 20,
  },
  socialButtonFB: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3b5998',
    height: 50,
    width: width,
  },
  socialButtonWA: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#34af23',
    height: 50,
    width: width

  },




  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  PaoDiarioFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
