
/*
 Màn hình các cuộc trò chuyện
 */


import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import {getTimeLeft, server} from '../../config';

/*Header */
class MessageHeader extends React.Component {

    render() {
        return (
            <View style={styles.box_header}>
                <Text style={styles.header_text}>Tin nhắn</Text>
            </View>
        );
    }
}

/*Một cuộc trò chuyện */
class Message extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate('Conversation')
            }}>
                <View style={styles.box_message}>
                    <View style={styles.box_avatar_img}>
                        <Image source={require('../../images/book_1.jpg')} style={styles.avatar_img} />
                    </View>
                    <View style={styles.right_content} >
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} numberOfLines={1}>Nguyen Duy Tam</Text>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={{ color: '#6b6b6b' }} numberOfLines={1}>Tam: Gia bao nhieeu vaayj ban oid kdfjjshf jdh f dhfjks sdjhfk fahsfk</Text>
                            <Text style={{ color: '#6b6b6b' }}>14:35  17 Th 02</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/*Màn hình */
class MessageScreen extends React.Component {
    render() {
        return (
            <View style={styles.box_screen}>
                <MessageHeader />
                <ScrollView style={styles.box_conversations} >
                    <Message 
                        navigation={this.props.navigation}/>
                </ScrollView>
            </View>
            );
    }
}
export default MessageScreen;

const styles = StyleSheet.create({
    box_screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    box_header: {
        paddingTop: 30,
        paddingBottom: 7,
        backgroundColor: '#D96704',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    header_text: {
        textAlign: 'center',
        flex: 1,
        color: 'white',
        fontSize: 18,
        padding: 5
    },

    box_conversations: {
        flex: 1,
    },
    box_message: {
        padding: 10,
        flexDirection: 'row',
    },
    avatar_img: {
        width: 60,
        height: 60,
        borderRadius: 100,
        paddingRight: 10,
    },
    right_content: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 4
    }
});