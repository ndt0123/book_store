/*
 Màn hình hiển thị thông tin của người dùng và các quyển sách người dùng đang bán, dừng bán và quan tâm
 */

import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import {getTimeLeft, server, isLoggedIn} from '../../config';

{/* Component hiển thị thông tin của người dùng */ }
class AccountInfo extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'column', padding: 10, paddingTop: 40, paddingBottom: 20, backgroundColor: '#D96704' }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        <View style={{ padding: 2, borderRadius: 100, borderColor: 'white', borderWidth: 1, height: 106, width: 106 }}>
                            <Image source={require('../../images/book_1.jpg')} style={{ height: 100, width: 100, borderRadius: 100 }} />
                            <Text style={{ fontSize: 13, paddingTop: 10, color: 'white' }}>3 người theo dõi</Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, flexDirection: 'column', paddingLeft: 10 }}>
                        <View style={[styles.white_border_bottom]}>
                            <Text style={[styles.text_info, { fontWeight: 'bold', fontSize: 20 }]}>Nguyễn Duy Tâm hjh dhkj dhk skjl </Text>
                        </View>
                        <View style={[styles.white_border_bottom, { paddingTop: 20 }]}>
                            <Text style={[styles.text_info]}>0965923824</Text>
                        </View>
                        <View style={[styles.white_border_bottom, { paddingTop: 20 }]}>
                            <Text style={[styles.text_info]}>Cá nhân</Text>
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

{/*Component hiển thị một quyển sách đang được bán*/ }
class Book extends React.Component {
    render() {
        return (
            <View style={styles.box_book}>
                <View style={{ flex: 3 }}>
                    <Image source={require('../../images/book_1.jpg')} style={styles.book_image} />
                </View>
                <View style={{ flex: 7, flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', flex: 3, height: 50 }} >n n n n n n n n n n n n n n n n n n n n n n n n n </Text>
                    <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách cũ (90%)</Text>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, fontWeight: 'bold', color: '#6b6b6b' }}>30.000 đ</Text>
                        <Text style={{ flex: 1, textAlign: 'right', color: '#6b6b6b' }}>3 phút trước</Text>
                    </View>
                </View>
            </View>
        );
    }
}

{/*Component hiển thị các quyển sách đang được người dùng rao bán*/ }
class BooksSelling extends React.Component {
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
            </View>
        );
    }
}

{/*Component hiển thị các quyển sách mà người dùng đã ngừng bán*/ }
class BooksStopSelling extends React.Component {
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
            </View>
        );
    }
}

{/*Component hiển thị các quyên sách mà người dùng quan tâm*/ }
class BooksFollowing extends React.Component {
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
            </View>
        );
    }
}

{/*Component chứa các component con hiển thị các đầu sách
    -Sách đang bán
    -Sách ngừng bán
    -Sách quan tâm
 */}
class OwnBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component_book_option: 'BooksSelling', /*biến state xác định list sách nào được hiển thị(đang bán, dừng bán, quan tâm)*/

            selling_button_style: { /*style cho button sách đang bán*/
                backgroundColor: '#D96704',
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            selling_text_color: {/*style màu chữ  cho button sách đang bán*/
                color: 'white'
            },
            stop_selling_button_style: {/*style cho button sách đã ngừng bán*/
                padding: 10,
                borderRadius: 5,
                flex: 1,
            },
            stop_selling_text_color: {/*style màu chữ cho sách đã ngừng bán*/
                color: 'black'
            },
            following_button: {/*style button cho sách đang quan tâm*/
                padding: 10,
                borderRadius: 5,
                flex: 1,
            },
            following_text_color: {/*style màu chữ cho sách quan tâm*/
                color: 'black'
            },
        }
    }

    /*
     * Sự kiện xảy ra khi click vào button sách đang bán:
     *  thay đổi style của các button
     *  chuyển biến component_book_option thành 'BooksSelling' để hiển thị list sách đang bán
     */
    onPressBooksSelling = () => { 
        this.setState({
            component_book_option: 'BooksSelling',
            selling_button_style: {
                backgroundColor: '#D96704',
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            selling_text_color: {
                color: 'white'
            },
            stop_selling_button_style: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            stop_selling_text_color: {
                color: 'black'
            },
            following_button: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            following_text_color: {
                color: 'black'
            },
        })
    }

    /*
     * Sự kiện xảy ra khi click vào button sách đang bán:
     *  thay đổi style của các button
     *  chuyển biến component_book_option thành 'BooksStopSelling' để hiển thị list sách đã ngừng bán
     */
    onPressBooksStopSelling = () => {
        this.setState({
            component_book_option: 'BooksStopSelling',
            selling_button_style: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            selling_text_color: {
                color: 'black'
            },
            stop_selling_button_style: {
                backgroundColor: '#D96704',
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            stop_selling_text_color: {
                color: 'white'
            },
            following_button: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            following_text_color: {
                color: 'black'
            },
        })
    }

    /*
     * Sự kiện xảy ra khi click vào button sách đang bán:
     *  thay đổi style của các button
     *  chuyển biến component_book_option thành 'BooksFollowing' để hiển thị list sách quan tâm
     */
    onPressBooksFollowing = () => {
        this.setState({
            component_book_option: 'BooksFollowing',
            selling_button_style: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            selling_text_color: {
                color: 'black'
            },
            stop_selling_button_style: {
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            stop_selling_text_color: {
                color: 'black'
            },
            following_button: {
                backgroundColor: '#D96704',
                padding: 10,
                borderRadius: 5,
                flex: 1
            },
            following_text_color: {
                color: 'white'
            },
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flexDirection: 'column', padding: 10, paddingTop: 20 }}>

                    <View style={{ paddingBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Danh mục sản phẩm</Text>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomColor: '#dadada', borderBottomWidth: 1, paddingBottom: 5 }}>
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksSelling}>
                            <View style={this.state.selling_button_style} >
                                <Text style={[styles.centerText, this.state.selling_text_color]} >Sách đang bán (0)</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksStopSelling}>
                            <View style={this.state.stop_selling_button_style}>
                                <Text style={[styles.centerText, this.state.stop_selling_text_color]}>Sách ngừng bán (0)</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onPressBooksFollowing}>
                            <View style={this.state.following_button}>
                                <Text style={[styles.centerText, this.state.following_text_color]}>Sách quan tâm (0)</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View>
                        {
                            /*
                             Nếu biến state component_book_option là BooksSelling thì render <BooksSelling />
                             Nếu biến state component_book_option là BooksStopSelling thì render <BooksStopSelling />
                             Nếu biến state component_book_option là BooksFollowing thì render <BooksFollowing />
                             */
                            this.state.component_book_option === 'BooksSelling' ? <BooksSelling />
                                : this.state.component_book_option === 'BooksStopSelling' ? <BooksStopSelling />
                                    : this.state.component_book_option === 'BooksFollowing' ? <BooksFollowing /> 
                                        : ''
                        }
                    </View>   
                </View>
            </ScrollView>
        );
    }
}

/*
 *Component màn hình account 
 */
class AccountScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.box_screen}>
                <AccountInfo />
                <OwnBooks />
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
    }

});
