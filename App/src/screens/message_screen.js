
/*
 Màn hình các cuộc trò chuyện
 */


import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, AsyncStorage, ActivityIndicator } from 'react-native';
import io from "socket.io-client";

import {server_socket_io, server, setConversationInStorage} from '../../config';

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

    constructor(props) {
        super(props);
        this.state = {
            new_message_content_weight: {
                fontWeight: 'normal'
            },
            new_message_name_weight: {
                fontWeight: '600'
            }
        }
    }

    getTime = (time) => {
        var time_update = new Date(time);
        var month = time_update.getMonth();
        var day = time_update.getDate();
        var hours = time_update.getHours();
        var minute = time_update.getMinutes();
        return hours + ":" + minute + " " + day + " Th " + month;
    }

    // Thay đổi background của cuộc trò chuyện khi có tin nhắn mới
    newMessageChangeStyle = () => {
        this.setState({
            new_message_content_weight: {
                fontWeight: '700'
            },
            new_message_name_weight: {
                fontWeight: '700'
            }
        })
    }

    // Thay đổi background của cuộc trò chuyện khi người dùng click xem cuộc trò chuyện
    seenNewMessageChangeStyle = () => {
        this.setState({
            new_message_content_weight: {
                fontWeight: 'normal'
            },
            new_message_name_weight: {
                fontWeight: '600'
            }
        })
    }

    // Kiểm tra xem cuộc trò chuyện này có tin nhắn mới không
    checkNewMessage = async () => {
        // Dữ liệu về conversation của người dùng được lưu trong storage
        let conversationStorage = await AsyncStorage.getItem("conversations");
        let conversations_in_storage = JSON.parse(conversationStorage);

        for(var i=0; i<conversations_in_storage.length; i++) {
            if(conversations_in_storage[i].conversation_id == this.props.conversation.conversation_id) {
                if(conversations_in_storage[i].time != this.props.conversation.time) {
                    this.setState({
                        new_message_content_weight: {
                            fontWeight: '700'
                        },
                        new_message_name_weight: {
                            fontWeight: '700'
                        }
                    })
                }
            }
        }
    }

    componentDidMount() {
        // Gọi hàm kiểm tra xem có tin nhắn mới không
        this.checkNewMessage();

        // Khai báo socket
        this.socket = io(server_socket_io);

        // Gửi id của cuộc trò chuyện để thêm phòng trên server
        let conversation_id = this.props.conversation.conversation_id;
        this.socket.emit("join room", conversation_id);  

        // Nhận tin nhắn từ server gửi về
        this.socket.on("send message to client", messageContent => {

            // Gọi hàm thay đổi giá trị của conversation trong Storage
            setConversationInStorage(messageContent);

            // Nếu người gửi tin không phải là mình thì mới thay đổi giao diện
            if(this.props.logged_in_id != messageContent.sending_id) {
                // Thay đổi giao diện
                this.newMessageChangeStyle();

                // Gọi hàm để thêm một conversation_id mới vào danh sách các conversation có tin nhắn mới
                // Hàm được pass từ component MessageScreen
                this.props.have_new_message(messageContent.conversation_id);
            }
            
            // Lấy tin nhắn mới nhất của cuộc trò chuyện để hiển thị ra
            this.props.get_latest_message(messageContent);
            
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                // Gọi hàm thay đổi giao diện của cuộc trò chuyện khi người dùng click xem tin nhắn
                this.seenNewMessageChangeStyle();

                // Gọi hàm props khi người dùng xem tin nhắn mới
                // Hàm được pass từ component MessageScreen
                this.props.seen_new_message(this.props.conversation.conversation_id);
                
                this.props.navigation.navigate('Conversation', {
                    conversation_id: this.props.conversation.conversation_id,
                    partner_id: this.props.conversation.user_id,
                })
            }}>
                <View style={[styles.box_message]}>
                    <View style={styles.box_avatar_img}>
                        <Image source={{ uri: server + this.props.conversation.avatar}} style={styles.avatar_img} />
                    </View>
                    <View style={styles.right_content} >
                        <Text style={[{ fontSize: 15 }, this.state.new_message_name_weight]} numberOfLines={1}>{this.props.conversation.name}</Text>
                        <View style={{ paddingTop: 5 }}>
                            <Text numberOfLines={1} style={[this.state.new_message_content_weight]}>{ this.props.conversation.content}</Text>
                            <Text style={{fontSize: 11}}>{this.getTime(this.props.conversation.time)}</Text>
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
            conversation_have_new_message: [], // Lưu các cuộc trò chuyện có tin nhắn mới phục vụ cho thông báo
        }
    }

    // Lấy tất cả cuộc trò chuyện của người dùng
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

    // Thay đổi array state.conversation_have_new_message khi có tin nhắn mới
    // Kiểm tra xem cuộc trò chuyện đó có thuộc trò chuyện có tin nhắn mới trước đó không
    // Nếu không thì thêm vào danh sách cuộc trò chuyện có tin mới
    // Gọi hàm props.number_of_new_message pass từ bottom_tab_navigation để thay đổi thông báo số tin mới
    haveNewMessage = (conversation_id) => {
        var conversation_have_new_message = this.state.conversation_have_new_message;

        if(this.state.conversation_have_new_message.indexOf(conversation_id) < 0) {
            conversation_have_new_message.push(conversation_id);
            this.setState({
                conversation_have_new_message: conversation_have_new_message
            })
        }
        this.props.number_of_new_message(conversation_have_new_message.length);
    }

    // Thay đổi array state.conversation_have_new_message khi xem tin nhắn mới
    seenNewMessage = (conversation_id) => {
        var conversation_have_new_message = this.state.conversation_have_new_message;

        if(conversation_have_new_message.indexOf(conversation_id) >= 0) {
            let index = conversation_have_new_message.indexOf(conversation_id);
            conversation_have_new_message.splice(index, 1);
            this.setState({
                conversation_have_new_message: conversation_have_new_message
            })
        }
        this.props.number_of_new_message(conversation_have_new_message.length);
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
                            this.state.conversations.map( (note, index) => {
                                return(
                                    <Message
                                        key={index}
                                        navigation={this.props.navigation}
                                        conversation={note}
                                        logged_in_id={this.state.logged_in_id}
                                        have_new_message={this.haveNewMessage}
                                        seen_new_message={this.seenNewMessage}
                                        get_latest_message = {(messageContent) => {
                                            // tạo một biến mới để lưu các cuộc trò chuyện cũ
                                            let conversations = this.state.conversations;

                                            // dùng vòng for chạy toàn bộ cuộc trò chuyện và thay đổi nội dung của cuộc trò chuyện trùng
                                            for(var i=0; i<conversations.length; i++) {
                                                if(conversations[i].conversation_id == messageContent.conversation_id) {
                                                    conversations[i].content = messageContent.content;
                                                    conversations[i].time = messageContent.time;
                                                    i = conversations.length - 1;
                                                }
                                            }
                                            // set biến state.conversations với giá trị mới
                                            this.setState({
                                                conversations: conversations
                                            })
                                        }}
                                        />
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
    box_avatar_img: {

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