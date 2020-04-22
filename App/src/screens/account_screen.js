/*
 Màn hình hiển thị thông tin của người dùng và các quyển sách người dùng đang bán, dừng bán và quan tâm
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, AsyncStorage, ActivityIndicator, TouchableHighlight, Animated, Alert } from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';

import {getTimeLeft, server} from '../../config';

var book_selling;
var book_stop_selling;
var book_watching;
var setting_option;

/* Component hiển thị thông tin của người dùng */ 
class AccountInfo extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'column', padding: 10, paddingTop: 40, paddingBottom: 20, backgroundColor: '#D96704' }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        <View style={{ padding: 2, borderRadius: 100, borderColor: 'white', borderWidth: 1, height: 106, width: 106 }}>
                            <Image source={{ uri: server + this.props.user_info.avatar}} style={{ height: 100, width: 100, borderRadius: 100 }} />
                            <Text style={{ fontSize: 13, paddingTop: 10, color: 'white' }}>{this.props.num_of_follower.num_of_follower} người theo dõi</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, flexDirection: 'column', paddingLeft: 10 }}>
                        <View style={[styles.white_border_bottom]}>
                            <Text style={[styles.text_info, { fontWeight: 'bold', fontSize: 20 }]}>{this.props.user_info.name} </Text>
                        </View>
                        {
                            this.props.user_info.phone_number != '' ?
                            <View style={[styles.white_border_bottom, { paddingTop: 20 }]}>
                                <Text style={[styles.text_info]}>{this.props.user_info.phone_number}</Text>
                            </View> : 
                            null
                        }
                        <View style={[styles.white_border_bottom, { paddingTop: 20 }]}>
                            <Text style={[styles.text_info]}>{this.props.user_info.type_of_user}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingTop: 20 }}>
                    <Text style={{ textAlign: 'right' }}>Sửa hồ sơ</Text>
                </View>
            </View>

        );
    }
}

/*Component hiển thị một quyển sách đang được bán*/ 
class Book extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.press_on_book(this.props.book.book_id);
            }}>
                <View style={styles.box_book}>
                    <View style={{ flex: 3 }}>
                        <Image source={{ uri: server + this.props.book.image_path}} style={styles.book_image} />
                    </View>
                    <View style={{ flex: 7, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', flex: 3, height: 50 }} >{this.props.book.title}</Text>
                        {
                            this.props.book.status == 100 ?
                                <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách mới (100%)</Text> :                            
                                <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách cũ ({this.props.book.status}%)</Text>
                        }
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#6b6b6b' }}>{this.props.book.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ</Text>
                            <Text style={{ flex: 1, textAlign: 'right', color: '#6b6b6b' }}>{getTimeLeft(this.props.book.time_update)}</Text>
                        </View>
                        {
                            typeof this.props.book.selling_status != undefined ? 
                                <Text style={{ flex: 1, color: '#6b6b6b' }}>{this.props.book.selling_status}</Text> :
                                null
                        }
                    </View>
                    <TouchableHighlight
                            underlayColor='#dadada'
                            style={{ padding: 5, borderRadius: 100, height: 30 }}
                            onPress={() => {
                                this.props.press_on_setting_option(this.props.list_setting_option, this.props.book.book_id);
                            }}
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

/*Component hiển thị các quyển sách đang được người dùng rao bán*/
class BooksSelling extends React.Component {
    constructor(props) {
        super(props);
        book_selling = this;
    }
    render() {
        const list_setting_option = ["Ngừng bán", "Chỉnh sửa", "Xóa"];
        return (
            <View style={{ marginTop: 10 }}>
                {
                    this.props.selling_books.map( function(note, index) {
                        return(
                            <Book 
                                key={index}
                                book={note}
                                press_on_setting_option={book_selling.props.press_on_setting_option}
                                list_setting_option={list_setting_option}
                                press_on_book={book_selling.props.press_on_book}/>
                        )
                    })
                }
            </View>
        );
    }
}

/*Component hiển thị các quyển sách mà người dùng đã ngừng bán*/ 
class BooksStopSelling extends React.Component {
    constructor(props) {
        super(props);
        book_stop_selling = this;
    }
    render() {
        const list_setting_option = ["Tiếp tục bán", "Xóa"];
        return (
            <View style={{ marginTop: 10 }}>
                {
                    this.props.stop_selling_books.map( function(note, index) {
                        return(
                            <Book 
                                key={index} 
                                book={note}
                                press_on_setting_option={book_stop_selling.props.press_on_setting_option}
                                list_setting_option={list_setting_option}
                                press_on_book={book_stop_selling.props.press_on_book}/>
                        )
                    })
                }
            </View>
        );
    }
}

/*Component hiển thị các quyên sách mà người dùng quan tâm*/ 
class BooksWatching extends React.Component {
    constructor(props) {
        super(props);
        book_watching = this;
    }
    render() {
        const list_setting_option = ["Ngừng theo dõi"];
        return (
            <View style={{ marginTop: 10 }}>
                {
                    this.props.watching_books.map( function(note, index) {
                        return(
                            <Book 
                                key={index} 
                                book={note}
                                press_on_setting_option={book_watching.props.press_on_setting_option}
                                list_setting_option={list_setting_option}
                                press_on_book={book_watching.props.press_on_book}/>
                        )
                    })
                }
            </View>
        );
    }
}

/*Component chứa các component con hiển thị các đầu sách
    -Sách đang bán
    -Sách ngừng bán
    -Sách quan tâm
 */
class OwnBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selling: true,
            stop_selling: false,
            watching: false,
        }
    }

    onPressBooksSelling = () => { 
        this.setState({
            selling: true,
            stop_selling: false,
            watching: false
        })
    }

    onPressBooksStopSelling = () => {
        this.setState({
            selling: false,
            stop_selling: true,
            watching: false
        })
    }

    onPressBooksFollowing = () => {
        this.setState({
            selling: false,
            stop_selling: false,
            watching: true
        })
    }
    render() {
        // console.log(this.props.selling_books);
        // console.log(this.props.stop_selling_books);
        // console.log(this.props.watching_books);

        if (this.props.is_loading) {
            return (
                <View style={{}}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        } 
        return (
            <ScrollView>
                <View style={{ flexDirection: 'column', padding: 10, paddingTop: 20 }}>

                    <View style={{ paddingBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Danh mục sản phẩm</Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 5 }}>
                        
                        {
                            this.state.selling ? 
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksSelling}>
                                <View style={{
                                    backgroundColor: '#D96704',
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'white'}]} >Sách đang bán ({this.props.selling_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksSelling}>
                                <View style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'black'}]} >Sách đang bán ({this.props.selling_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }

                        {
                            this.state.stop_selling ? 
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksStopSelling}>
                                <View style={{
                                    backgroundColor: '#D96704',
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'white'}]} >Sách ngừng bán ({this.props.stop_selling_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksStopSelling}>
                                <View style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'black'}]} >Sách ngừng bán ({this.props.stop_selling_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }

                        {
                            this.state.watching ? 
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksFollowing}>
                                <View style={{
                                    backgroundColor: '#D96704',
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'white'}]} >Sách quan tâm ({this.props.watching_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksFollowing}>
                                <View style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    flex: 1
                                }} >
                                    <Text style={[styles.centerText, {color: 'black'}]} >Sách quan tâm ({this.props.watching_books.length})</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>

                    <View>
                        {
                            this.state.selling ? 
                                <BooksSelling 
                                    selling_books={this.props.selling_books} 
                                    press_on_setting_option={this.props.press_on_setting_option}
                                    press_on_book={this.props.press_on_book}/> :
                                null
                        }
                        {
                            this.state.stop_selling ? 
                                <BooksStopSelling 
                                    stop_selling_books={this.props.stop_selling_books} 
                                    press_on_setting_option={this.props.press_on_setting_option}
                                    press_on_book={this.props.press_on_book}/> :
                                null
                        }{
                            this.state.watching ? 
                                <BooksWatching 
                                    watching_books={this.props.watching_books} 
                                    press_on_setting_option={this.props.press_on_setting_option}
                                    press_on_book={this.props.press_on_book}/> :
                                null
                        }
                    </View>   
                </View>
            </ScrollView>
        );
    }
}

// Hộp thoại hiển thị các tùy chọn
class SettingOption extends React.Component {
    constructor(props) {
        super(props);
        setting_option = this;
    }

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
                            this.props.list_setting_option.map(function(note, index) {
                                return(
                                    <TouchableWithoutFeedback
                                        underlayColor='#dadada'
                                        key={index}
                                        onPress={() => {
                                            setting_option.props.press_on_one_option(note);
                                        }}
                                    >
                                        <View style={[styles.box_one_notification_option]}>
                                            
                                            {
                                                note == 'Ngừng bán' ? 
                                                <IconEntypo name='controller-stop' color='black' size={19} /> :
                                                    note == 'Chỉnh sửa' ?
                                                    <IconEntypo name='edit' color='black' size={19} /> :
                                                        note == 'Xóa' ?
                                                        <IconEntypo name='circle-with-minus' color='black' size={19} /> :
                                                            note == 'Tiếp tục bán' ?
                                                            <IconEntypo name='cw' color='black' size={19} /> :
                                                                note == 'Ngừng theo dõi' ?
                                                                <IconEntypo name='eye-with-line' color='black' size={19} /> :
                                                                null
                                            }
                                            <Text style={[styles.text_notification_option]}>{note}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }

                        <TouchableWithoutFeedback
                            onPress={this.props.press_on_close_btn}
                        >
                            <View style={[
                                styles.box_one_notification_option, 
                                {
                                    borderTopColor: '#dadada',
                                    borderTopWidth: 1.5
                                }
                                ]}>
                                <IconEntypo name='circle-with-cross' color='black' size={19} />
                                <Text style={[styles.text_notification_option]}>Hủy</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </DisplayView>
            </View>            
        );
        
    }
}

/*
 *Component màn hình account 
 */
class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,

            is_loading_info: true,
            is_loading_book_ower: true,
            user_info: '',
            num_of_follower: 0,
            selling_books: [],
            stop_selling_books: [],
            watching_books: [],

            display_setting_option: false,
            list_setting_option: [],
            book_id_of_setting_option: 0,
        }
    }

    //Và thực hiện fetch dữ liệu từ server
    //Lấy dữ liệu về thông tin user: tên, ảnh, sđt,...
    getAccountInfoFromServer = (user_id) => {
        fetch(server + '/account-info/info/' + user_id)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                is_loading_info: false,
                user_info: responseJson.user_info,
                num_of_follower: responseJson.num_of_follower,
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    //Lấy dữ liệu về các quyển sách của người dùng
    getBookOwnerFromServer = (user_id) => {
        fetch(server + '/account-info/book-owner/' + user_id)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                is_loading_book_ower: false,
                selling_books: responseJson.selling_books,
                stop_selling_books: responseJson.stop_selling_books,
                watching_books: responseJson.watching_books
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    //Lấy user_id của người dùng
    getUserId = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let data = JSON.parse(userData);

            //Gọi hàm lấy dữ liệu từ server
            this.getAccountInfoFromServer(data);
            this.getBookOwnerFromServer(data);

            this.setState({
                user_id: data
            })

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        //Gọi hàm lấy user_id
        this.getUserId();
    }

    render() {
        if (this.state.is_loading_info) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        } 
        return (
            <View style={styles.box_screen}>
                <AccountInfo 
                    user_info={this.state.user_info} 
                    num_of_follower={this.state.num_of_follower}/>
                <OwnBooks 
                    selling_books={this.state.selling_books} 
                    stop_selling_books={this.state.stop_selling_books} 
                    watching_books={this.state.watching_books} 
                    is_loading={this.state.is_loading_book_ower}
                    press_on_setting_option={(list, book_id) => {
                        this.setState({
                            display_setting_option: true,
                            list_setting_option: list,
                            book_id_of_setting_option: book_id,
                        })
                    }}
                    press_on_book={(book_id) => {
                        this.props.navigation.navigate('Book Detail', {
                            previousScreen: 'Tài khoản',
                            book_id: book_id,
                        });
                    }}/>

                {
                    this.state.display_setting_option ? 
                        <SettingOption 
                            press_on_close_btn={() => {
                                this.setState({
                                    display_setting_option: false
                                })
                            }}
                            press_on_one_option={(action) => {

                                if(action == 'Ngừng bán' || action == 'Xóa' || action == 'Tiếp tục bán') {
                                    fetch(server + '/account-info/edit/book-status/' + this.state.book_id_of_setting_option + '?action=' + action)
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        if(responseJson.status == 'success') {
                                            this.getBookOwnerFromServer(this.state.user_id);
                                            this.setState({
                                                display_setting_option: false
                                            })
                                        } else {
                                            Alert.alert(
                                                'Thông báo',
                                                'Đã xảy ra lỗi',
                                                [
                                                  {text: 'OK', onPress: () => {}},
                                                ],
                                                { cancelable: false }
                                            )
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                } else if(action == 'Chỉnh sửa') {
                                    this.setState({
                                        display_setting_option: false
                                    })
                                    this.props.navigation.navigate('Book editting', {
                                        book_id: this.state.book_id_of_setting_option
                                    })
                                } else if(action == 'Ngừng theo dõi') {
                                    fetch(server + '/account-info/edit/book-watching/' + this.state.user_id + '/' + this.state.book_id_of_setting_option)
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        if(responseJson.status == 'success') {
                                            this.getBookOwnerFromServer(this.state.user_id);
                                            this.setState({
                                                display_setting_option: false
                                            })
                                        } else {
                                            Alert.alert(
                                                'Thông báo',
                                                'Đã xảy ra lỗi',
                                                [
                                                  {text: 'OK', onPress: () => {}},
                                                ],
                                                { cancelable: false }
                                            )
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                }
                            }}
                            list_setting_option={this.state.list_setting_option}/> :
                        null
                }
            </View>
        );
    }
}
export default AccountScreen;

const styles = StyleSheet.create({

    box_screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    box_option_button: {
        padding: 10,
        borderRadius: 5,
    },


    white_border_bottom: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5
    },
    text_info: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    },

    box_book: {
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0,
        flex: 1,
        flexDirection: 'row'
    },
    book_image: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },

    box_book_menu_dropdown: {
        position: 'absolute',
        zIndex: 2,
        width: 40,
        top: 20,
        right: 10,
        width: 60,
        backgroundColor: 'white'
    },
    book_menu_dropdown: {
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: '#dadada',
        borderWidth: 1,
    },

    centerText: {
        textAlign: 'center'
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
        flexDirection: 'row'
    },
    text_notification_option: {
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: 15
    }

});
