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
import * as firebase from 'firebase';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

var database = firebase.database();

import HeaderMenu from '../components/headerMenu';
import Color from '../style/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      listFullItem: [],
      dataTemp: [],
      refresh: false,
      isSearch: false,
      isSpinner: true,
      nextPage: '',
      nextPage1: '',
      prevPage: '',
    };
  }

  componentWillMount() {
    var leadsRef = database.ref('apiKey');

    leadsRef.on('value', (childSnapshot) => {
      this.varAPIKey = childSnapshot.val().value;
      this.getYoutube(childSnapshot.val().value, '', '');
      this.getFullYoutube(childSnapshot.val().value);
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  _onSearch = () => {
    if (this.state.isSearch == true) {
      this.setState({ aniView: 'bounceOut' });
      setTimeout(() => {
        this.setState({ isSearch: false, listItem: this.state.dataTemp });
      }, 1000);
      this.searchText('');
    } else {
      this.setState({ aniView: 'bounceInDown', isSearch: true });
      this.searchText('');
    }
  }

  _onMenu = () => {
    const { navigate } = this.props.navigation
    navigate('DrawerOpen')
    this.forceUpdate();
  }

  getYoutube(varAPIKey, previousPage, nextPage) {
    fetch("https://www.googleapis.com/youtube/v3/search?key=" + varAPIKey + nextPage + previousPage + "&channelId=UC3YmP7nqf514I1zh1eVbzrA&part=snippet,id&order=date", {
      method: 'GET',
      dataType: 'json',
    }).then(
      function (response) {
        if (response.status !== 200) {
          response.json().then(function (data) {
            alert(
              'Failed : ' +
              "Error occur seems there's a problem with the server"
            )
          }.bind(this));
        } else {
          response.json().then(function (data) {
            this.setState({
              nextPage: '&pageToken=' + data.nextPageToken,
              prevPage: '&pageToken=' + data.prevPageToken,
              listItems: data.items,
              isSpinner: false,
            });
          }.bind(this));
        }
      }.bind(this)
      )
  }

  getFullYoutube(varAPIKey) {
    if (this.state.nextPage1 !== '&pageToken=' + undefined) {
      fetch("https://www.googleapis.com/youtube/v3/search?key=" + varAPIKey + this.state.nextPage1 + "&channelId=UC3YmP7nqf514I1zh1eVbzrA&part=snippet,id&order=date", {
        method: 'GET',
        dataType: 'json',
      }).then(
        function (response) {
          if (response.status !== 200) {
            response.json().then(function (data) {
              alert(
                'Failed : ' +
                "Error occur seems there's a problem with the server"
              )
            }.bind(this));
          } else {
            response.json().then(function (data) {
              this.setState({
                nextPage1: '&pageToken=' + data.nextPageToken,
                listFullItem: this.state.listFullItem.concat(data.items),
                dataTemp: this.state.dataTemp.concat(data.items)
              });

              this.getFullYoutube(varAPIKey);
            }.bind(this));
          }
        }.bind(this)
        )
    }
  }

  goToVideos(obj) {
    this.props.navigation.navigate('Videos', { object: obj })
  }

  renderVideos(obj) {
    return (
      <TouchableOpacity onPress={() => this.goToVideos(obj)} style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5 }} >
        <Image source={{ uri: obj.snippet.thumbnails.high.url }} style={{ width: 120, height: 90 }} />
        <View style={{ width: width / 2, marginLeft: 10, }} >
          <Text>{obj.snippet.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  searchText = (e) => {
    setTimeout(() => {
      this.setState({ isSpinner: true });
    }, 0);
    setTimeout(() => {
      this.setState({ listFullItem: this.state.dataTemp });
    }, 10);
    setTimeout(() => {
      let text = e.toLowerCase();
      let filteredName = this.state.listFullItem.filter((item) => {
        return item.snippet.title.toLowerCase().match(text);
      });
      if (e === '') {
        this.setState({ isSpinner: false, listFullItem: this.state.dataTemp });
      } else if (Array.isArray(filteredName)) {
        this.setState({
          listFullItem: filteredName,
          isSpinner: false
        });
      }
    }, 100);
  }

  emptyAd() {
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderMenu pagetitle='ZAKIR NAIK (ENGLISH)' openMenu={this._onMenu} openSearch={this._onSearch} />
        <View style={{ justifyContent: 'space-between', height: height - 80 }} >
          {this.state.isSearch == true
            ? <View style={{ backgroundColor: 'white', padding: 10 }}>
              <Animatable.View animation={this.state.aniView}>
                <Item style={{ backgroundColor: '#FFF', borderRadius: 50 }} rounded>
                  <Input autoFocus={true} placeholder='Search' onChangeText={(text) => { this.searchText(text) }} />
                </Item>
              </Animatable.View>
            </View>
            : <View />
          }
          <View style={{ flex: 1 }}>
            {this.state.isSpinner == true
              ? <Spinner color={Color.defaultColor} />
              : this.state.listFullItem.length !== 0 && this.state.listItems.length !== 0
                ? this.state.isSearch == true
                  ? <FlatList
                    data={this.state.listFullItem}
                    renderItem={({ item }) => this.renderVideos(item)}
                    keyExtractor={item => item.etag}
                    refreshing={this.state.refresh}
                    onRefresh={() => this.getYoutube(this.varAPIKey, '', '')}
                  />
                  : <FlatList
                    data={this.state.listItems}
                    renderItem={({ item }) => this.renderVideos(item)}
                    keyExtractor={item => item.etag}
                    refreshing={this.state.refresh}
                    onRefresh={() => this.getYoutube(this.varAPIKey, '', '')}
                  />
                :
                <View style={styles.viewEmptyData}>
                  <Icon name='logo-youtube' style={{ color: 'gray', fontSize: 100 }} />
                  <Text note style={[{ marginTop: 10 }]}>There's no Videos</Text>
                  <Text note> check your input </Text>
                </View>}
          </View>
          {this.state.isSearch == true
            ? <View />
            : <View style={{ flexDirection: 'row' }}>
              <Left>
                {this.state.nextPage !== '&pageToken=' + undefined
                  ? <TouchableOpacity onPress={() => this.getYoutube(this.varAPIKey, '', this.state.nextPage)} style={{ flexDirection: 'row', margin: 20 }} >
                    <Icon name='ios-arrow-back' />
                    <Text style={{ marginLeft: 10, marginTop: 3 }} >Older Videos</Text>
                  </TouchableOpacity>
                  : <View />}
              </Left>
              <Right>
                {this.state.prevPage !== '&pageToken=' + undefined
                  ? <TouchableOpacity onPress={() => this.getYoutube(this.varAPIKey, this.state.prevPage, '')} style={{ flexDirection: 'row', margin: 20 }} >
                    <Text style={{ marginRight: 10, marginTop: 3 }} >Previous Videos</Text>
                    <Icon name='ios-arrow-forward' />
                  </TouchableOpacity>
                  : <View />}
              </Right>
            </View>}
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-6004302968455654/8370873873"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => this.emptyAd()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewEmptyData: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: height - 170
  },
});
