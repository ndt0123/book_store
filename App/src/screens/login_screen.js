import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image, TextInput, Keyboard, TouchableHighlight, ActivityIndicator } from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Slideshow from 'react-native-slideshow';
import { LinearGradient } from 'expo-linear-gradient';

import {getTimeLeft, server} from '../../config';

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.box_screen}>
                <View style={styles.box_facebook_login_btn}>

                </View>
                <View style={styles.box_google_login_btn}>

                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    box_screen: {

    },
    box_facebook_login_btn: {

    },
    box_google_login_btn: {

    }
});