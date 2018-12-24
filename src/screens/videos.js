import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ALert,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Icon, Right, Left } from 'native-base';
import YouTube from 'react-native-youtube';
import Share from 'react-native-share';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

import HeaderGoBack from '../components/headerGoBack';
import Color from '../style/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: false,
            iconPlay: 'ios-pause-outline',
            plause: 'Pause',
            iconScreen: 'md-expand',
            isPlaying: true,
        }
        this.title = this.props.navigation.state.params.object.snippet.title;
        this.thumbnails = this.props.navigation.state.params.object.snippet.thumbnails.high.url;
        this.description = this.props.navigation.state.params.object.snippet.description;
        this.videoId = this.props.navigation.state.params.object.id.videoId;
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    statePlaying() {
        if (this.state.isPlaying == true) {
            this.setState({ isPlaying: false, plause: 'Play', iconPlay: 'ios-play-outline' })
        } else {
            this.setState({ isPlaying: true, plause: 'Pause', iconPlay: 'ios-pause-outline' })
        }
    }

    stateFullScreen() {
        if (this.state.isFullScreen == true) {
            this.setState({ isFullScreen: false, iconScreen: 'md-expand' })
        } else {
            this.setState({ isFullScreen: true, iconScreen: 'md-contract' })
        }
    }

    emptyAd() {
        return;
    }

    render() {

        let shareOptions = {
            title: "Share Video",
            message: this.title,
            url: "https://www.youtube.com/watch?v=" + this.videoId,
            subject: "Share a Video"
        };

        return (
            <View style={styles.container}>
                <HeaderGoBack pagetitle={this.title} onClose={this.onClose} />
                <View style={{ justifyContent: 'space-between', height: height - 80 }} >
                    {this.videoId
                        ? <ScrollView>
                            <YouTube
                                videoId={this.videoId}
                                play={this.state.isPlaying}
                                fullscreen={this.state.isFullScreen}
                                loop={false}
                                apiKey='AIzaSyAIeu723DYAFHN6XgJqmK-bUvi2fBf67S4'

                                style={{ alignSelf: 'stretch', height: 300 }}
                            />

                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center' }} onPress={() => this.statePlaying()} style={{ padding: 10, marginRight: 20 }} >
                                    <Icon name={this.state.iconPlay} />
                                    <Text style={{ marginLeft: 10, marginTop: 4 }} >{this.state.plause}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center' }} onPress={() => this.stateFullScreen()} style={{ padding: 10, marginRight: 20 }} >
                                    <Icon name={this.state.iconScreen} />
                                    <Text style={{ marginLeft: 10, marginTop: 4 }} >Full Screen</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'column', alignSelf: 'center' }} onPress={() => {
                                    Share.open(shareOptions);
                                }}>
                                    <Icon name='md-share' />
                                    <Text style={{ marginLeft: 10, marginTop: 4 }} >Share</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <Image source={{ uri: this.thumbnails }} style={{ width: 120, height: 90 }} />
                                <View style={{ width: width / 2, marginLeft: 10, }} >
                                    <Text style={{ color: Color.defaultDark }} >{this.title}</Text>
                                </View>
                            </View>
                            <Text style={{ marginLeft: 15, color: Color.defaultColor }}>Description :</Text>
                            <Text style={{ marginLeft: 15, color: Color.defaultDark }}>{this.description}</Text>
                        </ScrollView>
                        : <View>
                            <View style={{ flexDirection: 'row', margin: 5 }}>
                                <Image source={{ uri: this.thumbnails }} style={{ width: 120, height: 90 }} />
                                <View style={{ width: width / 2, marginLeft: 10, }} >
                                    <Text style={{ color: Color.defaultDark }} >{this.title}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    {/* <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-6004302968455654/8370873873"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => this.emptyAd()}
                    /> */}
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
