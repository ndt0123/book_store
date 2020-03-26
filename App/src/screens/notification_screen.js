/*
 Màn hình thông báo
 */

import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

/* Header */
class Header extends React.Component {
    render() {
        return (
            <View style={styles.box_header}>
                <Text style={styles.header_text}>Thông báo</Text>
            </View>
			);
    }
}

/*
 * Một thông báo
 */
class OneNotification extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={{ paddingBottom: 10, paddingTop: 10, flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={require('../../images/book_1.jpg')}
                            style={{ width: 60, height: 60, borderRadius: 100 }}
                        />
                    </View>

                    <View style={{ flexDirection: 'column', flex: 4 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Tuoi tre dang gia bao nhieu</Text>
                        <Text>Nguyễn Duy Tâm đã bình luận về bài đă của bạn</Text>
                        <Text style={{ color: '#6b6b6b', fontSize: 12 }}>3 phút trước</Text>
                    </View>

                    <TouchableHighlight
                        underlayColor='#dadada'
                        style={{ padding: 5, borderRadius: 100, height: 30 }}
                        onPress={this.props.press_notifi_option_btn}
                    >
                        <View>
                            <IconEntypo name='dots-three-horizontal' color='#6b6b6b' size={18} />
                        </View>
                    </TouchableHighlight>                    
                </View>
            </TouchableWithoutFeedback>
			);
    }
}

/* Tùy chọn hiển thị khi click vào nút ba chấm của thông báo
 *  - Đánh dấu đã đọc thông báo
 *  - Xóa thông báo*/
class NotificationOption extends React.Component {

    render() {

        // Khai báo biến animation hiển thị notification option
        // Hiển thị từ dưới lên trên dựa vào props bottom
        const DisplayView = (props) => {
            const [displayAnimation] = useState(new Animated.Value(-150)) 

            React.useEffect(() => {
                Animated.timing(
                    displayAnimation,
                    {
                        toValue: 0,
                        duration: 400,
                    }
                ).start();
            }, [])

            return (
                <Animated.View 
                    style={{
                        bottom: displayAnimation,
                    }}
                >
                    {props.children}
                </Animated.View>
            );
        }


        return (
            <View
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end',
                    zIndex: 2,
                    padding: 10,
                    backgroundColor: ['rgba(0,0,0,0.2)', 'transparent'],
                }}
            >
                <DisplayView>
                    <View style={[styles.box_notification_option]}>                        
                        {
                            this.props.is_read_notifi === false ?
                                <TouchableWithoutFeedback
                                    underlayColor='#dadada'
                                    onPress={this.props.press_read_btn}
                                >
                                    <View style={[styles.box_one_notification_option]}>
                                        <Text style={[styles.text_notification_option]}>
                                            <IconEntypo name='pin' color='black' size={19} /> Đánh dấu là đã đọc
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback> :
                                null
                        }

                        <TouchableWithoutFeedback
                            underlayColor='#dadada'
                            onPress={this.props.press_delete_btn}
                        >
                            <View style={[styles.box_one_notification_option]}>
                                <Text style={[styles.text_notification_option]}>
                                    <IconEntypo name='circle-with-minus' color='black' size={19} /> Xóa thông báo
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={this.props.press_close_btn}
                        >
                            <View style={[
                                styles.box_one_notification_option, 
                                {
                                    borderTopColor: '#dadada',
                                    borderTopWidth: 1.5
                                }
                                ]}>
                                <Text style={[styles.text_notification_option]}>
                                    <IconEntypo name='circle-with-cross' color='black' size={19} /> Hủy
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </DisplayView>
            </View>            
        );
        
    }
}

/*Màn hình trang chủ */
class NotificationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display_notifi_option: false,
            is_read_notifi: false
        }
    }

    render() {
        return (
            <View style={styles.box_screen}>
                <Header />

                <ScrollView>
                    <View style={styles.box_notification} >
                        <View style={[styles.box_option]}>
                            <View style={[styles.box_text_option]}>
                                <Text style={[styles.text_option]}>Chưa xem</Text>
                            </View>
                            <View>
                                <OneNotification
                                    press_notifi_option_btn={() => {
                                        this.setState({
                                            display_notifi_option: true,
                                            is_read_notifi: false
                                        })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={[styles.box_option]}>
                            <View style={[styles.box_text_option]}>
                                <Text style={[styles.text_option]}>Đã xem</Text>
                            </View>
                            <View>
                                <OneNotification
                                    press_notifi_option_btn={() => {
                                        this.setState({
                                            display_notifi_option: true,
                                            is_read_notifi: true
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                
                {
                    this.state.display_notifi_option == true ?
                        <NotificationOption
                            is_read_notifi={this.state.is_read_notifi}
                            press_close_btn={() => {
                                this.setState({
                                    display_notifi_option: false
                                })
                            }}
                            press_read_btn={() => {
                                this.setState({
                                    display_notifi_option: false
                                })
                            }}
                            press_delete_btn={() => {
                                this.setState({
                                    display_notifi_option: false
                                })
                            }}
                        /> :
                        null

                }
            </View>
        );
    }
}
export default NotificationScreen;

const styles = StyleSheet.create({
    box_screen: {
        flex: 1,
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

    box_notification: {
        padding: 10,
        paddingTop: 0,
    },
    text_option: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    box_option: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    box_text_option: {
        borderBottomColor: '#dadada',
		borderBottomWidth: 2,
    },

    box_notification_option: {
        backgroundColor: 'white',
        padding: 5,
        width: '100%',
        borderRadius: 5,
    },
    box_one_notification_option: {
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    text_notification_option: {
        fontSize: 18,
        fontWeight: '500',
    }
});
