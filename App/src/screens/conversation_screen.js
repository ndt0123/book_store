/*
 Màn hình một cuộc trò chuyện
 */

import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, Image, Keyboard, TouchableWithoutFeedback, Alert, Animated, AsyncStorage } from 'react-native';
import io from "socket.io-client";

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';

import {server_socket_io, server} from '../../config';

var content;
var conversationScreen;

class Header extends React.Component {

    render() {
        return (
            <View style={styles.box_header}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.goBack();                  
                }}>
                    <View style={{paddingRight: 5, alignContent: 'center', alignSelf: 'center'}}>
                        <IconEntypo name="chevron-left" color="#D96704" size={30} />
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Image source={{ uri: server + this.props.partner_avatar}} style={styles.avatar_img} />
                </View>
                <View style={{paddingLeft: 5, alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '600', fontSize: 16, color: 'black'}}>{this.props.partner_name}</Text>
                </View>
                
            </View>
            
        );
    }
}

/*
 Component hiển thị nội dung cuộc trò chuyện
    - Các <View/> tin nhắn của người dùng có style là box_one_left_message
    - Các <Text/> tin nhắn của người dùng có style là left_message
 */
class Content extends React.Component {

    constructor(props) {
        super(props);
        content = this;
    }

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
            <ScrollView ref="scrollView">
                {
                    this.props.messages.map( function(note, index) {
                        if(note.sending_id == content.props.partner_id) {
                            return(
                                <View style={{flexDirection: 'row', margin: 2, marginLeft: 10}} key={index}>
                                    <View style={styles.box_one_left_message}>
                                        <Text style={styles.left_message} >{note.content}</Text>
                                    </View>
                                    <View style={styles.box_text_time_message}>
                                        <Text style={styles.text_time_message}>{content.getTime(note.time)}</Text>
                                    </View>
                                </View>
                            )
                        } else {
                            return(
                                <View style={{flexDirection: 'row', alignSelf: 'flex-end', margin: 2, marginRight: 10}} key={index}>
                                    <View style={styles.box_text_time_message}>
                                        <Text style={styles.text_time_message}>{content.getTime(note.time)}</Text>
                                    </View>
                                    <View style={styles.box_one_right_message}>
                                        <Text style={styles.right_message} >{note.content}</Text>
                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
        );
    }
}

/**
 * Component khung nhập tin nhắn
 * */
class InputFeild extends React.Component {

    render() {
        return (
            <View style={[styles.bottom_input_feild]}>
                <View style={styles.box_input_feild}>
                    <TextInput 
                        style={styles.input_feild}
                        value={this.props.chatMessage}
                        onChangeText={(value) => {
                            this.props.getMessageContent(value);
                        }}>
                    </TextInput>
                </View>
                <TouchableWithoutFeedback onPress={this.props.sendMessage}>
                    <View style={styles.box_sending_icon}>
                        <IconIonicons name='md-send' color={'#D96704'} size={30} style={styles.sending_icon} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

/**
 * Component chứa màn hình cuộc trò chuyện
 * Bao gồm: 
 *      - <Content />
 *      - <InputFeild />
 * */
class ConversationScreen extends React.Component {
    constructor(props) {
        super(props);
        conversationScreen = this;
        this.state = {
            partner_id: 0,
            partner_name: '',
            partner_avatar: '',
            logged_in_id: 0,
            messages: [],
            fadeAnim: new Animated.Value(0),
            chatMessage: ""
        }
    }

    // Lấy thông tin của partner
    getPartnerInfo = (user_id) => {
        fetch(server + '/message/account_info/' + user_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        { text: "OK", onPress: () => {
                            this.props.navigation.goBack();
                        },
                        style: 'cancel' }
                    ],
                    { cancelable: false }
                )
            } else {
                this.setState({
                    partner_id: responseJson.partner_info.user_id,
                    partner_avatar: responseJson.partner_info.avatar,
                    partner_name: responseJson.partner_info.name
                })
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Lấy toàn bộ tin nhắn của cuộc trò chuyện
    getAllMessages = (conversation_id) => {
        fetch(server + '/message/conversation/' + conversation_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        { text: "OK", onPress: () => {
                            this.props.navigation.goBack();
                        },
                        style: 'cancel' }
                    ],
                    { cancelable: false }
                )
            } else {
                this.setState({
                    messages: responseJson.messages
                })
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        
        // Khai báo socket
        this.socket = io(server_socket_io);

        // Nếu không có conversation_id từ Screen trước thì
        // Kiểm tra xem có cuộc trò chuyện nào trước đó giữa hai người không
        // Nếu có conversation thì tiến hành lấy data về cuộc trò chuyện từ server
        if(this.props.route.params.conversation_id == undefined ) {
            let user_id_1 = this.props.route.params.partner_id;
            let user_id_2 = this.props.route.params.logged_in_id;

            // Kiểm tra xem có cuộc trò chuyện nào giữa hai người không
            fetch(server + '/message/conversation?user_id_1=' + user_id_1 + '&user_id_2=' + user_id_2)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.conversation_id == "undefined") {
                    this.setState({
                        partner_id: this.props.route.params.partner_id,
                        partner_avatar: this.props.route.params.partner_avatar,
                        partner_name: this.props.route.params.partner_name,
                        logged_in_id: this.props.route.params.logged_in_id
                    })
                } else {
                    let conversation_id = responseJson.conversation_id;
                    let partner_id = this.props.route.params.partner_id;
                    this.getPartnerInfo(partner_id);
                    this.getAllMessages(conversation_id);
                }
            })
            .catch((error) => {
                console.error(error);
            });
            
        } else {
            var {conversation_id} = this.props.route.params;
            var {partner_id} = this.props.route.params;
            this.getPartnerInfo(partner_id);
            this.getAllMessages(conversation_id);

            // Gửi id của cuộc trò chuyện để thêm phòng trên server
            this.socket.emit("new room", this.props.route.params.conversation_id);            
        }

        // Nhận tin nhắn từ server gửi về
        this.socket.on("send message to client", function(messageContent) {
            conversationScreen.setState({
                messages: [...conversationScreen.state.messages, messageContent]
            })
            console.log(messageContent)
        });

        // Sự kiện hiển thị keyboard
        // Gọi đến hàm animation để show up khung input text lên trên
        Keyboard.addListener('keyboardWillShow', function(e){
            conversationScreen.inputFeildUp(e.endCoordinates.height);
        });
        //Sự kiện keyboard biến mất
        // Gọi đến hàm animation để show down khung input text
        Keyboard.addListener('keyboardWillHide', function(e) {
            conversationScreen.inputFeildDown();
        });
    }

    // Gửi tin nhắn lên socket
    sendMessage = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let data = JSON.parse(userData);

            let messageContent; // Biến lưu nội dung tin nhắn

            //
            if(this.props.route.params.conversation_id == undefined) {

            } else {
                messageContent = {
                    content: this.state.chatMessage,
                    sending_id: data,
                    receiving_id: this.state.partner_id,
                    type_of_message: "text",
                    time: new Date(),
                    conversation_id: this.props.route.params.conversation_id,
                }
            }

            // Gửi tin nhắn lên socket server
            this.socket.emit("send message to server", messageContent);
            this.setState({
                messages: [...conversationScreen.state.messages, messageContent]
            })
            this.setState({
                chatMessage: ""
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    // Lấy nội dung tin nhắn từ commponent ImputFeild
    getMessageContent = (value) => {
        this.setState({
            chatMessage: value
        })
    }

    // Hàm animation để show up input text
    inputFeildUp = (value) => {
        Animated.timing(this.state.fadeAnim,
        {
            toValue: value,
            duration: 200
        }).start()
    }

    // Hàm animation để show down input text
    inputFeildDown() {
        Animated.timing(this.state.fadeAnim,
        {
            toValue: 0,
            duration: 200
        }).start()
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, justifyContent: 'space-between', marginBottom: this.state.fadeAnim }}>
                <Header 
                    navigation={this.props.navigation}
                    partner_avatar={this.state.partner_avatar}
                    partner_name={this.state.partner_name}/>
                <Content 
                    messages={this.state.messages}
                    partner_id={this.state.partner_id}/>
                <InputFeild 
                    chatMessage={this.state.chatMessage}
                    sendMessage={this.sendMessage}
                    getMessageContent={this.getMessageContent}/>
            </Animated.View>
        );
    }
}
export default ConversationScreen;

const styles = StyleSheet.create({
    avatar_img: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },


    left_message: {
        color: 'black',
    },
    box_one_left_message: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 2,
        maxWidth: 200
    },
    right_message: {
        color: 'white',
    },
    box_one_right_message: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#D96704',
        marginTop: 2,
        marginBottom: 2,
        maxWidth: 200,
    },

    box_header: {
        padding: 5,
        paddingTop: 30,
        paddingBottom: 7,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%'
    },

    text_time_message: {
        fontSize: 10,
        color: '#6b6b6b',
    },
    box_text_time_message: {
        flexDirection: 'column-reverse',
        padding: 5
    },
    bottom_input_feild: {        
        borderTopColor: '#dadada',
        borderTopWidth: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    box_input_feild: {
        flex: 8,
        paddingRight: 10
    },
    input_feild: {
        borderColor: '#efefef',
        borderWidth: 1,
        borderRadius: 20,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#efefef',
    },
    box_sending_icon: {
        alignContent: 'center',
        alignSelf: 'center',
        flex: 1
    }, 
    sending_icon: {
        textAlign: 'center'
    }
});