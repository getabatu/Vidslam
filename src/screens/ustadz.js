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
import { Theme, NavigationPage, Select, ListRow, Overlay } from 'teaset';
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
            isSpinner: false,
            isVisible: false,
            nextPage: '',
            nextPage1: '',
            prevPage: '',
            ustadz: '',
        };
        this.ustadz = [
            'Ust. Khalid Basalamah',
            'Ust. Maududi Abdullah',
            'Ust. Subhan Bawazier',
            'Ust. Syafiq Reza Basalamah',
            'Ust. Firanda Andirja',
        ]
    }

    componentWillMount() {
        var leadsRef = database.ref('apiKey');

        leadsRef.on('value', (childSnapshot) => {
            this.varAPIKey = childSnapshot.val().value;
        });
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
        fetch("https://www.googleapis.com/youtube/v3/search?key=" + varAPIKey + nextPage + previousPage + "&channelId=" + this.state.id + "&part=snippet,id&order=date", {
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
                            isVisible: true
                        });
                    }.bind(this));
                }
            }.bind(this)
            )
    }

    getFullYoutube(varAPIKey) {
        if (this.state.nextPage1 !== '&pageToken=' + undefined) {
            fetch("https://www.googleapis.com/youtube/v3/search?key=" + varAPIKey + this.state.nextPage1 + "&channelId=" + this.state.id + "&part=snippet,id&order=date", {
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
                                dataTemp: this.state.dataTemp.concat(data.items),
                                isVisible: true,
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

    selectItem(value) {
        setTimeout(() => {
            this.setState({ isSpinner: true, ustadz: value });
        }, 0);
        setTimeout(() => {
            if (value === 'Ust. Khalid Basalamah') {
                this.setState({ id: 'UCJHC3VbFsp7kJ2NxPGltwiw' })
            } else if (value === 'Ust. Subhan Bawazier') {
                this.setState({ id: 'UCg8JzBjneud5yc-2AM384cg' })
            } else if (value === 'Ust. Syafiq Reza Basalamah') {
                this.setState({ id: 'UC3_QdDQnRVRDJzq56JTO_Zw' })
            } else if (value === 'Ust. Firanda Andirja') {
                this.setState({ id: 'UCm44PmruoSbuNbZn7jFeXUw' })
            } else if (value === 'Ust. Maududi Abdullah') {
                this.setState({ id: 'UCUVoFiYKV4tGh9Z8R1FHRqw' })
            }
        }, 10);
        setTimeout(() => {
            this.getYoutube(this.varAPIKey, '', '');
            this.getFullYoutube(this.varAPIKey);
        }, 100);
    }

    emptyAd() {
        return;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderMenu pagetitle='Pilih Ustadz' openMenu={this._onMenu} openSearch={this._onSearch} />
                <View style={{ justifyContent: 'space-between', height: height - 80 }} >
                    {this.state.isSearch == false
                        ? <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }} >
                            <View />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15 }} >Pilih Ustadz :</Text>
                                <Select
                                    style={{ margin: 10, width: 200, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
                                    value={this.state.ustadz}
                                    items={this.ustadz}
                                    placeholder='Pilih Ustadz'
                                    onSelected={(item) => this.selectItem(item)}
                                    pickerTitle='Pilih Ustadz' />

                            </View>
                        </View>
                        : <View />
                    }
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
                        {this.state.ustadz
                            ? this.state.isSpinner == true
                                ? <Spinner color={Color.defaultColor} />
                                : this.state.isSearch == true
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
                            : null}
                    </View>
                    {this.state.isSearch == false && this.state.isVisible == true
                        ? <View style={{ flexDirection: 'row' }}>
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
                        </View>
                        : <View />}
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
});
