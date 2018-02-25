import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as firebase from 'firebase';

import Color from '../style/color';

const config = {
    apiKey: "AIzaSyBAZOxGajdcvBas8eVgSNCE9d6SSZ61SuQ",
    authDomain: "vidslam-31fb9.firebaseapp.com",
    databaseURL: "https://vidslam-31fb9.firebaseio.com",
    projectId: "vidslam-31fb9",
    storageBucket: "vidslam-31fb9.appspot.com",
    messagingSenderId: "862700358266"
};
const firebaseApp = firebase.initializeApp(config);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            splash: 'bounceIn'
        };
    }

    render() {

        return (
            <View style={styles.container}>
                <Animatable.Image animation={this.state.splash} onAnimationEnd={this.goToHome} source={require('../img/vislam_logo.png')} style={styles.logo} />
            </View>
        );
    }

    goToHome = () => {
        firebase.auth().signInWithEmailAndPassword('anis@najib.com', 'qwqwqw').then((user) => {
            setTimeout(() => {
                const { navigate } = this.props.navigation;
                navigate("DrawerNav");
            }, 1300)
        }).catch(function (e) {
            alert(e);
        })
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.defaultColor,
    },
    logo: {
        alignSelf: "center",
        height: 150,
        width: 150,
        paddingLeft: 10
    },
});
