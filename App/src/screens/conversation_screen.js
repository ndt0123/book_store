/*
 Màn hình một cuộc trò chuyện
 */

import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, Image, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

/*
 Component hiển thị nội dung cuộc trò chuyện
    - Các <View/> tin nhắn của người dùng có style là box_one_left_message
    - Các <Text/> tin nhắn của người dùng có style là left_message
 */
class Content extends React.Component {

    render() {
        return (
            <ScrollView ref="scrollView" onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height, animated: false })}>
                <View style={{ margin: 10, flexDirection: 'row' }} >
                    <View style={styles.box_one_left_message}>
                        <Text style={styles.left_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 10 }} >
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 10 }} >
                    <View style={styles.box_one_left_message}>
                        <Text style={styles.left_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_left_message}>
                        <Text style={styles.left_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_left_message}>
                        <Text style={styles.left_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_left_message}>
                        <Text style={styles.left_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                </View>

                <View style={{ margin: 10 }} >
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View><View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View><View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View><View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View><View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>
                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View><View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are you doing right now
                        </Text>
                    </View>

                    <View style={styles.box_one_right_message} >
                        <Text style={styles.right_message} >
                            hi what are
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

/**
 * Component khung nhập tin nhắn
 * */
class InputFeild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardHeight: 0, /*Chiều cao của bàn phím bằng marginBottom của khung nhập tin nhắn*/
        }
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    /*Sự kiện bàn phím hiển thị: set chiều cao của keyboard */
    _keyboardDidShow(e) {
        this.setState({ keyboardHeight: e.endCoordinates.height });
    }
    /*Sự kiện bàn phím không hiển thị: set chiều cao của keyboard */
    _keyboardDidHide(e) {
        this.setState({ keyboardHeight: 0 });
    }

    render() {
        return (
            <View style={{
                borderTopColor: '#dadada',
                borderTopWidth: 1,
                padding: 7,
                flexDirection: 'row',
                marginBottom: this.state.keyboardHeight
            }}>
                <View style={{ flex: 5 }}>
                    <TextInput style={{
                        borderColor: '#dadada',
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingBottom: 5,
                        paddingTop: 5,
                        backgroundColor: '#efefef',
                    }}>
                    </TextInput>
                </View>
                <View style={{ flex: 1, alignConTent: 'center', alignSelf: 'center' }}>
                    <Icon name='send' color={'#D96704'} size={30} style={{ textAlign: 'center' }} />
                </View>
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
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <Content />
                <InputFeild />
            </View>
        );
    }
}
export default ConversationScreen;

const styles = StyleSheet.create({
    box_header: {
        paddingTop: 30,
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
    },
    avatar_img: {
        width: 40,
        height: 40,
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
        alignSelf: 'flex-end',
    },
});