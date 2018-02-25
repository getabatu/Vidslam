import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ALert,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import { Icon, Right, Left, Item, Input, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable';

import Color from '../style/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _onMenu = () => {
    const { navigate } = this.props.navigation
    navigate('DrawerOpen')
    this.forceUpdate();
  }

  ustadz = () => {
    const { navigate } = this.props.navigation
    navigate('Ustadz')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/welcome.jpg')} style={{ height: height/6, margin:20, width: width/1.3 }} />
        <Image source={require('../img/whitevidslam.png')} style={{ height: 100, margin:20, width: 100}} />        
        <TouchableOpacity style={{ height: 60, margin:20, width: width - 40, alignItems: 'center', justifyContent: 'center', borderColor: Color.defaultColor, borderWidth: 2, }} onPress={this._onMenu} >
          <Text style={{ color: Color.defaultColor }} >Pilih Channel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 60, margin:20, width: width - 40, alignItems: 'center', justifyContent: 'center', borderColor: Color.defaultColor, borderWidth: 2, }} onPress={this.ustadz} >
          <Text style={{ color: Color.defaultColor }} >Pilih Ustadz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
