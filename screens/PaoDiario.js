import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
	Linking, Dimensions,
	Image, Platform, StyleSheet,
	Text, TouchableOpacity, FlatList,
	View, Alert
} from 'react-native';
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
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

	useEffect(() => {
		axios.get('https://bibleapi.co/api/verses/nvi/random', token)
			.then(respone => {
				setMensagem(respone.data),
					console.log(mensagem)
			}
			)
			.catch(
				() => { Alert.alert('Erro no useEffect') }
			)
	}, [])


	function getRandomVerse() {
		// setRandom(random + Math.random(1, 20))
		axios.get('https://bibleapi.co/api/verses/nvi/random', token)
			.then(respone => setMensagem(respone.data),
				console.log(mensagem))
			.catch(
				() => { Alert.alert('Erro ao recupar API') }
			)
	}

	let [fontsLoaded] = useFonts({
		// "AveriaSansLibre-Bold": require('../assets/fonts/AveriaSansLibre-Bold.ttf'),
		// "AveriaSansLibre-BoldItalic": require('../assets/fonts/AveriaSansLibre-BoldItalic.ttf'),
		// "AveriaSansLibre-Italic": require('../assets/fonts/AveriaSansLibre-Italic.ttf'),
		"AveriaSansLibre-Light": require('../assets/fonts/AveriaSansLibre-Light.ttf'),
		// "AveriaSansLibre": require('../assets/fonts/AveriaSansLibre-Regular.ttf'),
	})

	function sendWhatsApp() {
		Linking.openURL(`whatsapp://send?text=${mensagem.text}`)
	}
	function sendFacebook() {
		// fazer if caso n esteja logado no fb
		Linking.openURL(`https://www.facebook.com/${mensagem.book.name}`)
		// Linking.openURL(`facebook://send?text=${mensagem}`)
	}


	if (!fontsLoaded) {
		return <AppLoading />
	} else {
		if (mensagem <= 0) {
			return (
				<View style={styles.container}			>
					<ScrollView   >
						<View>
							<Image source={brand} style={{ alignSelf: "center", width: 100, height: 100 }} />
							<View>
								{/* <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text> */}
								<Text style={styles.msmLoading}>Carregando sua mensagem...</Text>
								{/* <Text style={styles.msmAuthor}>{mensagem.book.author} - {mensagem.chapter} - {mensagem.number}</Text> */}
							</View>
							<TouchableOpacity
								style={styles.socialButtonSearch}
								onPress={getRandomVerse} >
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
									onPress={sendFacebook}
									style={styles.socialButtonFB} >
									<FontAwesome name="facebook" color="#FFF" size={30} />
									{/* <Text>Facebook - n funciona ainda </Text> */}
								</TouchableOpacity>
								<TouchableOpacity
									onPress={sendWhatsApp}
									style={styles.socialButtonWA} >
									<FontAwesome name="whatsapp" color="#FFF" size={30} />
								</TouchableOpacity>
							</View>
						</View>

					</ScrollView>

				</View >
			);
		} else {
			return (
				<View style={styles.container}			>
					<ScrollView   >
						<View>
							<Image source={brand} style={{ alignSelf: "center", width: 100, height: 100 }} />
							<View>
								<Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Livro: {mensagem.book.name}</Text>
								<Text style={styles.msmText}>"{mensagem.text}"</Text>
								<Text style={styles.msmAuthor}>{mensagem.book.author} - {mensagem.chapter} - {mensagem.number}</Text>
							</View>
							<TouchableOpacity
								style={styles.socialButtonSearch}
								onPress={getRandomVerse} >
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
									onPress={sendFacebook}
									style={styles.socialButtonFB} >
									<FontAwesome name="facebook" color="#FFF" size={30} />
									{/* <Text>Facebook - n funciona ainda </Text> */}
								</TouchableOpacity>
								<TouchableOpacity
									onPress={sendWhatsApp}
									style={styles.socialButtonWA} >
									<FontAwesome name="whatsapp" color="#FFF" size={30} />
								</TouchableOpacity>
							</View>
						</View>

					</ScrollView>

				</View >
			);
		}

	}
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
	msmLoading: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 40,
		marginVertical: 30,
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

});
