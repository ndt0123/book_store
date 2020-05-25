
/*
 Màn hình các cuộc trò chuyện
 */


import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, AsyncStorage, ActivityIndicator } from 'react-native';

import {getTimeLeft, server} from '../../config';

var messageScreen;

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

    getTime = (time) => {
        var time_update = new Date(time);
        var month = time_update.getMonth();
        var day = time_update.getDate();
        var hours = time_update.getHours();
        var minute = time_update.getMinutes();
        return hours + ":" + minute + " " + day + " Th " + month;
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate('Conversation', {
                    conversation_id: this.props.conversation.conversation_id,
                    partner_id: this.props.conversation.user_id
                })
            }}>
                <View style={styles.box_message}>
                    <View style={styles.box_avatar_img}>
                        <Image source={{ uri: server + this.props.conversation.avatar}} style={styles.avatar_img} />
                    </View>
                    <View style={styles.right_content} >
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} numberOfLines={1}>{this.props.conversation.name}</Text>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={{ color: '#6b6b6b' }} numberOfLines={1}>{ this.props.conversation.content}</Text>
                            <Text style={{ color: '#6b6b6b' }}>{this.getTime(this.props.conversation.time)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/*Màn hình */
class MessageScreen extends React.Component {
    constructor(props) {
        super(props);
        messageScreen = this;
        this.state = {
            is_loading_data: true,
            conversations: [],
            logged_in_id: 0,
        }
    }

    getAllConversation = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let user_id = JSON.parse(userData);
            if(user_id != null) {
                this.setState({
                    logged_in_id: user_id,
                })

                fetch(server + '/message/all-conversation/' + user_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        is_loading_data: false,
                        conversations: responseJson.conversations
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getAllConversation();
    }

    render() {
        if(this.state.is_loading_data) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        }
        return (
            <View style={styles.box_screen}>
                <MessageHeader />
                {
                    this.state.conversations.length == 0 ?
                    <Text style={{color: '#6b6b6b', width: '100%', textAlign: 'center'}}>Bạn không có cuộc trò chuyện nào</Text> :
                    <ScrollView style={styles.box_conversations} >
                        {
                            this.state.conversations.map( function(note, index) {
                                return(
                                    <Message 
                                        navigation={messageScreen.props.navigation}
                                        key={index}
                                        conversation={note}/>
                                );
                            })
                        }
                    </ScrollView>
                }
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