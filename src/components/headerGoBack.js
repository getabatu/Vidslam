import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity
} from 'react-native';
import { Icon, Left, Right } from 'native-base';

import Color from '../style/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class headerMenu extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };

    render() {
        let { pagetitle, onClose } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onClose} >
                        <View style={styles.hamburgerContainer}>
                            <Icon name='md-arrow-back' style={styles.icon} />
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title_text}>{pagetitle.toUpperCase()}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: Color.defaultColor,
        justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    hamburgerContainer: {
        flexDirection: 'row',
        height: 60, width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title_text: {
        width: width/1.67,
        fontFamily: "Roboto",
        fontSize: 16,
        letterSpacing: 0.5,
        color: 'white',
    },
    icon: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default headerMenu;    