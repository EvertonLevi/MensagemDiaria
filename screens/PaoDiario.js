import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
	Linking, Dimensions,
	Image, Platform, StyleSheet,
	Text, TouchableOpacity, FlatList,
	View, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import { FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import brand from '../assets/images/icon.png'

const { width, height } = Dimensions.get('window')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBBcHIgMDYgMjAyMCAxOTowOTo0NCBHTVQrMDAwMC5ldmVydG9uLmxldmlAaG90bWFpbC5jb20iLCJpYXQiOjE1ODYyMDAxODR9.cz4Xc0gjq8gyIZJK998ZW7JJz3rad6s9GZSnO7umjWE"

// share Linking => https://medium.com/@ahmed_aly/sharing-to-whatsapp-from-a-react-native-application-6d242a427667
export default function PaoDiario() {

	const [mensagem, setMensagem] = useState([])
	const [book, setBook] = useState('')
	const [dados, setDados] = useState([])
	const [random, setRandom] = useState(Number)
	const [loading, setLoading] = useState(false)

	const navigation = useNavigation()

	function sendWhatsApp() {
		Linking.openURL(`whatsapp://send?text=${mensagem}`)
	}
	function sendFacebook() {
		// fazer if caso n esteja logado no fb
		Linking.openURL(`https://www.facebook.com/${mensagem.book.name}`)
		// Linking.openURL(`facebook://send?text=${mensagem}`)
	}

	function getRandomVerse() {
		// setRandom(random + Math.random(1, 20))
		axios.get('https://bibleapi.co/api/verses/nvi/random', token)
			.then(respone => setMensagem(respone.data))
			// .then(response => setBook(response.data))
			.catch(
				() => { Alert.alert('Erro ao recupar API') }
			)
	}

	return (
		<View
			style={styles.container}
		>

			<ScrollView   >
				<View>
					<Image source={brand} style={{ alignSelf: "center", width: 100, height: 100 }} />
					<View>
						{/* <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text> */}
						<Text style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}>"{mensagem.text}"</Text>
					</View>

					<TouchableOpacity
						style={styles.socialButtonSearch}
						onPress={getRandomVerse} >
						<Text>Receba sua mensagem</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text style={{ fontSize: 20, alignSelf: "center" }}>Compartilhe esta mensagem de fé</Text>

					<View style={styles.containerShare}>
						<TouchableOpacity
							onPress={sendFacebook}
							style={styles.socialButtonFB} >
							<FontAwesome name="facebook" color="#FFF" size={30} />
							{/* <Text>Facebook - n funciona ainda </Text> */}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={sendWhatsApp}
							style={styles.socialButtonWA} >
							<FontAwesome name="whatsapp" color="#FFF" size={30} />
							{/* <Text>WhatsApp</Text> */}
						</TouchableOpacity>
					</View>
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
		justifyContent: "center",
		alignItems: "center",
		width: width,
		height: 40,
		backgroundColor: "#06d4c4"
	},
	socialButtonFB: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#3b5998',
		borderRadius: 50,
		marginHorizontal: 10,
		height: 70,
		width: 70,
	},
	socialButtonWA: {
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#34af23',
		borderRadius: 50,
		height: 70,
		width: 70,
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
