import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { Icon, Content, Text, List, ListItem, Container, Button, View } from 'native-base';

import Color from '../style/color';

class drawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressStatus: 'Home',
        };
    }

    _homePage() {
        this.props.navigation.navigate('Home')
        this.setState({ pressStatus: 'Home' })
    }

    lenteraIslam() {
        this.props.navigation.navigate('LenteraIslam')
        this.setState({ pressStatus: 'LenteraIslam' })
    }

    yufid() {
        this.props.navigation.navigate('Yufid')
        this.setState({ pressStatus: 'Yufid' })
    }

    ustadz() {
        this.props.navigation.navigate('Ustadz')
        this.setState({ pressStatus: 'Ustadz' })
    }

    rodja() {
        this.props.navigation.navigate('Rodja')
        this.setState({ pressStatus: 'Rodja' })
    }

    zakirNaikIndonesia() {
        this.props.navigation.navigate('ZakirNaikIndonesia')
        this.setState({ pressStatus: 'Dr. Zakir Naik (English)' })
    }

    render() {
        let { title } = this.props
        return (
            <Container>
                <View bounces={false} style={styles.sidebar}>
                    <View style={styles.viewLogo}>
                        <Image source={require('../img/vislam_logo.png')} style={styles.logo} />
                    </View>


                    <ScrollView>
                        <TouchableOpacity
                            style={[this.state.pressStatus == 'Home' ? styles.listItem_selected : styles.listItem]}
                            onPress={this._homePage.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'Home' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'Home' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-home-outline' />   Welcome Screen </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[this.state.pressStatus == 'Ustadz' ? styles.listItem_selected : styles.listItem]}
                            onPress={this.ustadz.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'Ustadz' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'Ustadz' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-man-outline' />   Pilih Ustadz </Text>
                        </TouchableOpacity>
                        
                        <Text note style={{ color:'white', margin: 10, }} >Channel List</Text>

                        <TouchableOpacity
                            style={[this.state.pressStatus == 'LenteraIslam' ? styles.listItem_selected : styles.listItem]}
                            onPress={this.lenteraIslam.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'LenteraIslam' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'LenteraIslam' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-book-outline' />   Lentera Islam </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[this.state.pressStatus == 'Rodja' ? styles.listItem_selected : styles.listItem]}
                            onPress={this.rodja.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'Rodja' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'Rodja' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-easel-outline' />   Rodja TV </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[this.state.pressStatus == 'Yufid' ? styles.listItem_selected : styles.listItem]}
                            onPress={this.yufid.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'Yufid' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'Yufid' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-desktop-outline' />   Yufid TV </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[this.state.pressStatus == 'Dr. Zakir Naik (English)' ? styles.listItem_selected : styles.listItem]}
                            onPress={this.zakirNaikIndonesia.bind(this)}>
                            
                            <Text style={this.state.pressStatus == 'Dr. Zakir Naik (English)' ? styles.pressTextItemList : [styles.textItemList]}> <Icon style={this.state.pressStatus == 'Dr. Zakir Naik (English)' ? styles.pressIconItemList : [styles.iconItemList]} name='ios-person-outline' />   Dr. Zakir Naik (English) </Text>
                        </TouchableOpacity>

                    </ScrollView>
                    <Text style={{ color:'white', fontSize: 10, marginTop: 10, marginBottom: 10 }} note > Version 0.0.6 </Text>                    
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    sidebar: {
        flex: 1, backgroundColor: Color.defaultColor,
    },
    viewLogo: {
        alignItems: 'center',

    },
    pressTextItemList: {
        marginLeft: 30,
        color: Color.defaultDark,
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        fontWeight: "500",
    },
    pressIconItemList: {
        marginLeft: 30,
        color: Color.defaultDark,
        fontSize: 18,
        fontFamily: 'Roboto-Light',
        fontWeight: "500",
    },
    logo: {
        alignSelf: "center",
        height: 150,
        width: 150,
        margin: 20
    },
    listItem: {
        height: 56,
        backgroundColor: Color.defaultColor,
        alignItems: 'flex-start',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    listItem_selected: {
        height: 56,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderLeftColor: Color.defaultDark,
        borderLeftWidth: 5
    },
    textItemList: {
        marginLeft: 30,
        color: 'white',
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        fontWeight: "500",
    },
    iconItemList: {
        marginLeft: 30,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto-Light',
        fontWeight: "500",
    }

});

export default drawer;    