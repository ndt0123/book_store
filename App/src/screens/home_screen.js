/*
 Màn hình của trang chủ khi khởi động ứng dụng
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {getTimeLeft, server} from '../../config';

var book_option_home;
var searchingView;

/*Header của màn hình */
class HomeHeader extends React.Component {

    render() {
        return (
            <View style={styles.box_header}>
                <View style={styles.searching_box}>
                    <TouchableWithoutFeedback 
                        onPress = {() => {
                            this.props.navigation.navigate('Notification');
                        }}
                    >
                        <View style={styles.menu_option_btn}>
                            <IconFontAwesome name="bell" color="#eee" size={24} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.pressSearchingBtn} >
                        <View style={styles.menu_option_btn}>
                            <IconFontAwesome name="search" color="#eee" size={24} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

/*Một quyển sách */
class Book extends React.Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPressBooks}>
                <View style={styles.box_book}>
                    <View style={{ flex: 3 }}>
                        <Image source={{ uri: server + this.props.book.image_path }} style={styles.image} />
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
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

//Phần các tùy chọn cho bộ lọc sách
//      -Sách cũ, sách mới
//      -Các thể loại sách
class BookOptionHome extends React.Component {
    
    constructor(props) {
        super(props);
        book_option_home = this;
        this.state = {
            list_type_of_book: [{type_of_book: ''}]
        }
    }

    componentDidMount() {
        fetch(server + '/searching/list_type_of_book')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    list_type_of_book: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.box_option}>
                <View style={styles.box_old_new_book}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Searching results', {
                            book_status: 'Sách cũ'
                        });
                    }}>
                        <View style={[styles.box_old_new_book_btn, , styles.border_right]}>
                            <Text style={styles.old_new_book_btn}><Icon name="book-multiple-remove" color="#41B7F0" size={16} /> Sách cũ</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Searching results', {
                            book_status: 'Sách mới'
                        });
                    }}>
                        <View style={styles.box_old_new_book_btn}>
                            <Text style={styles.old_new_book_btn}><Icon name="book-multiple" color="#41B7F0" size={16} /> Sách mới</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.box_type_of_book}>
                    <ImageBackground source={require('../../images/background_image_home_option.jpg')} style={{ width: '100%', height: '100%' }}>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 40, paddingTop: 40 }}>
                        {
                            this.state.list_type_of_book.map( function (note, index) {
                                if(index + 1 < book_option_home.state.list_type_of_book.length && index % 2 == 0) {
                                    return(
                                        <View key={index}>
                                            <TouchableWithoutFeedback onPress={() => {
                                                var type = book_option_home.state.list_type_of_book[index].type_of_book;
                                                book_option_home.props.navigation.navigate('Searching results', {
                                                    type_of_book: type
                                                });
                                            }}>
                                                <Text style={styles.type_of_book_btn}>{book_option_home.state.list_type_of_book[index].type_of_book}</Text>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => {
                                                var type = book_option_home.state.list_type_of_book[index+1].type_of_book;
                                                book_option_home.props.navigation.navigate('Searching results', {
                                                    type_of_book: type
                                                });
                                            }}>                                    
                                                <Text style={styles.type_of_book_btn}>{book_option_home.state.list_type_of_book[index+1].type_of_book}</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    );
                                } else if(index + 1 >= book_option_home.state.list_type_of_book.length && index % 2 == 0) {
                                    return(
                                        <View key={index}>
                                            <TouchableWithoutFeedback onPress={() => {
                                                var type = book_option_home.state.list_type_of_book[index].type_of_book;
                                                book_option_home.props.navigation.navigate('Searching results', {
                                                    type_of_book: type
                                                });
                                            }}>
                                                <Text style={styles.type_of_book_btn}>{book_option_home.state.list_type_of_book[index].type_of_book}</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    );
                                }
                            })
                        }
                        </ScrollView>

                    </ImageBackground>

                </View>
            </View>
        );
    }
}

// Khung tìm kiếm khi click vào icon tìm kiếm trong header
class SearchingView extends React.Component {

    constructor(props) {
        super(props);
        searchingView = this;
        this.state={
            input_value: '',
            recommend_searching: []
        }
    }

    // Set biến lưu animation cho khung tìm kiếm
    // Khi SearchingView hiển thị, khung tìm kiếm sẽ hiển thị dần từ phí bên phải
    // Bằng cách set flex của khung tìm kiếm từ 0->6
    DisplayTextInput = (props) => {
        const [displayAnimation] = useState(new Animated.Value(0));

        React.useEffect(() => {
            Animated.timing(
                displayAnimation,
                {
                    toValue: 9,
                    duration: 600,
                }
            ).start();
        }, [])

        return (
            <Animated.View 
                style={{
                    flex: displayAnimation,
                    alignItems: 'flex-end',
                }}
            >
                {props.children}
            </Animated.View>
        );
    }

    // Set biến lưu animation cho toàn bộ SearchingView
    // Khi SearchingView hiển thị opacity sẽ chuyển từ 0->1
    DisplaySearchingView = (props) => {
        const [displayAnimation] = useState(new Animated.Value(0));

        React.useEffect(() => {
            Animated.timing(
                displayAnimation,
                {
                    toValue: 1,
                    duration: 600,
                }
            ).start();
        }, [])

        return (
            <Animated.View 
                style={{
                    opacity: displayAnimation,
                }}
            >
                {props.children}
            </Animated.View>
        );
    }

    // Hàm gọi khi thay đổi nội dung trong khung tìm kiếm
    changeTextInput = (v) => {
        var value = v;
        this.setState({
            input_value: value
        })

        if(value.trim() != "") {
            fetch(server + '/searching/recommend?key=' + value.trim())
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    recommend_searching: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            this.setState({
                recommend_searching: []
            })
        }
    }

    render() {

        var DisplaySearchingView = this.DisplaySearchingView;
        var DisplayTextInput = this.DisplayTextInput;

        return(
            <DisplaySearchingView>
                <View style={styles.box_header_searching_view}>
                    <TouchableWithoutFeedback onPress={this.props.pressCloseSearchingOption}>
                        <View style={{padding: 10, flex: 1}}>
                            <Text style={{color: 'blue', textAlign: 'right'}}>Hủy</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <DisplayTextInput>
                        <View style={{backgroundColor: '#CCCCCC', borderRadius: 20, padding: 10, width: '100%', flexDirection: 'row'}}>
                            <TextInput 
                                placeholder="Tìm kiếm" 
                                autoFocus={true}
                                value={this.state.input_value}
                                style={{ flex: 1}}
                                onChangeText={this.changeTextInput}
                            ></TextInput>

                            <TouchableWithoutFeedback onPress={() => {
                                if(this.state.input_value.trim() != '') {
                                    this.props.navigation.navigate("Searching results", {
                                        key: this.state.input_value.trim()
                                    })
                                }
                            }}>
                                
                                <IconFontAwesome name="search" color="white" size={23} style={{ alignSelf: 'flex-end' }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </DisplayTextInput>                        
                </View>

                <View style={{paddingLeft: 20, paddingRight: 20, flexDirection: 'column'}}>
                    {
                        this.state.recommend_searching.map(function(note, index) {
                            return(
                                <TouchableWithoutFeedback 
                                    key={index} 
                                    onPress={() => {
                                        searchingView.props.navigation.navigate("Searching results", {
                                            key: note
                                        })
                                    }}    
                                >
                                    <View style={{borderBottomColor: '#dadada', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
                                        <Text style={{fontWeight: '500' }}>{note}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </View>
            </DisplaySearchingView>
        );
    }
}

/*Màn hình trang chủ */
var home_screen;
class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        home_screen = this;
        this.state = {
            isLoading: true,
            display_searching_view: false
        }
    }

    componentDidMount() {
        return fetch(server + '/home/all-books')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    books: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        } 

        if(this.state.display_searching_view) {
            return(
                <SearchingView 
                    pressCloseSearchingOption={() => {
                        this.setState({
                            display_searching_view: false
                        })
                    }}
                    navigation={this.props.navigation} 
                />
            );
        }

        return(
            <View style={styles.box_screen}>
                <HomeHeader 
                    navigation={this.props.navigation} 
                    pressSearchingBtn={() => {
                        this.setState({
                            display_searching_view: true
                        })
                    }} 
                />

                <ScrollView style={styles.box_scrollView}>
                    <BookOptionHome navigation={this.props.navigation} />
                    <View style={{ marginTop: 180 }}>
                        {
                            this.state.books.map(function (note, index) {
                                return (
                                    <Book
                                        key={index}
                                        book={note}
                                        onPressBooks={() => {
                                            home_screen.props.navigation.navigate('Book Detail', {
                                                previousScreen: 'Home',
                                                book_id: note.book_id,
                                            });
                                        }}
                                    />
                                    )
                            })
                        }
                    </View>
                </ScrollView>

            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    /*Style cho View bao bọc toàn bộ màn hình*/
    box_screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    box_scrollView: {
        flex: 1,
    },

    /*Style cho phần option của sách*/
    box_option: {
        marginTop: 10,
        marginBottom: 10
    },
    box_old_new_book: {
        backgroundColor: 'white',
        height: 50,
        width: '60%',
        zIndex: 2,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    box_type_of_book: {
        height: 200,
        width: '100%',
        zIndex: 1,
        top: 30,
        position: 'absolute',
        flexDirection: 'row',

    },
    box_old_new_book_btn: {
        flex: 1,
    },
    old_new_book_btn: {
        textAlign: 'center',
        padding: 3
    },
    border_right: {
        borderRightColor: '#30DBD0',
        borderRightWidth: 1,
    },
    type_of_book_btn: {
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#41B7F0',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        color: '#41B7F0',
    },
    /*Style cho phần sách*/
    box_book: {
        padding: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        flex: 1,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },

    /*Style cho phần header*/
    box_header: {
        paddingTop: 30,
        backgroundColor: '#D96704',
        flexDirection: 'row',
    },
    searching_box: {
        paddingBottom: 10,
        flexDirection: 'row-reverse',
        width: '100%',

    },
    menu_option_btn: {
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    box_header_searching_view: {
        flexDirection: 'row-reverse', 
        padding: 20, 
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomColor: '#dadada',
        borderBottomWidth: 1
    }

});
