
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Image } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {getTimeLeft, server} from '../../config.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searching_value: ''
        }
    }

    /*Sự kiện thay đổi nội dung khung tìm kiếm*/
    changeSearchingValue = (value) => {
        this.setState({
            searching_value: value,
        });
    }

    render() {
        return (
            <View style={styles.box_header}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Home');                  
                }}>
                    <View style={{ flex: 1 }}>
                        <IconEntypo name="chevron-left" color="white" size={30} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.searching_box}>
                    <TextInput style={styles.searching_input} value={this.state.searching_value} onChangeText={this.changeSearchingValue} placeholder='Tìm kiếm'></TextInput>
                    <IconFontAwesome name="search" color="#eee" size={24} style={{ padding: 2, flex: 1 }} />
                </View>

                <TouchableWithoutFeedback onPress={this.props.press_filter_btn}>
                    <View style={{ flex: 1 }}>
                        <IconAntDesign name="filter" color="white" size={30} style={{ alignSelf: 'flex-end' }} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class FilterOption extends React.Component {
    render() {
        return (
            <View style={styles.screen_filter_option}>
                <View style={styles.box_filter_option}>
                    <View style={ styles.box_header_filter_option}>
                        <Text style={{ fontSize: 25, fontWeight: '600'}}>Bộ lọc</Text>

                        <TouchableWithoutFeedback onPress={this.props.press_close_btn}>
                            <IconAntDesign name='close' color='#6b6b6b' size={25} />
                        </TouchableWithoutFeedback>
                    </View>

                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 18, color: '#6b6b6b' }}>Thể loại sách</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Sách trinh thám </Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Truyện tranh</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Tiểu thuyết</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Sách thiếu nhi</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Kỹ năng sống</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Ngôn tình</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Văn học</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Văn hóa xã hội</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Chính trị</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Pháp luật</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Khoa học công nghệ</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Kinh tế</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Văn học nghệ thuật</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Giáo trình</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Tâm lý</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Tôn giáo</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={styles.type_of_book_btn}>
                                        <Text style={{ color: '#D96704' }}>Lịch sử</Text>
                                        <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 18, color: '#6b6b6b' }}>Tình trạng sách</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20}}>
                            <TouchableWithoutFeedback>
                                <View style={styles.type_of_book_btn}>
                                    <Text style={{ color: '#D96704' }}>Sách cũ</Text>
                                    <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.type_of_book_btn}>
                                    <Text style={{ color: '#D96704' }}>Sách mới</Text>
                                    <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20, borderTopWidth: 1, borderTopColor: '#dadada'}}>
                        <TouchableWithoutFeedback>
                            <View style={styles.submit_filter_btn}>
                                <Text style={{ color: 'white', fontWeight: '600' }}>Lọc</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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

var books_searching;
class BooksSearching extends React.Component{

    constructor(props) {
        super(props);
        books_searching = this;
    }

    render() {
        return(
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {
                        this.props.books.map(function (note, index) {
                            return (
                                <Book
                                    key={index}
                                    book={note}
                                    onPressBooks={() => {
                                        books_searching.props.navigation.navigate('Book Detail', {
                                            previousScreen: 'Searching results',
                                            book_id: note.book_id,
                                        });
                                    }}
                                />
                                )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

class SearchingResultsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display_filter_option: false,
            is_loading: true,
        }
    }

    getDataFromServer = () => {
        if(typeof this.props.route.params.key != 'undefined' &&
            typeof this.props.route.params.book_status == 'undefined' &&
            typeof this.props.route.params.type_of_book == 'undefined' ) {

            fetch(server + '/searching?key=' + this.props.route.params.key)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    is_loading: false,
                    books: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
        } else if(typeof this.props.route.params.key == 'undefined' &&
                typeof this.props.route.params.book_status != 'undefined' &&
                typeof this.props.route.params.type_of_book == 'undefined' ) {

            var book_status = this.props.route.params.book_status;

            var url_param = "";
            for(var i=0; i<book_status.length; i++) {
                if(i != book_status.length-1) {
                    url_param += book_status[i] + ",";
                } else {
                    url_param += book_status[i]
                }
            }
            fetch(server + '/searching/filter?book_status=' + url_param)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    is_loading: false,
                    books: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });     
        } else if(typeof this.props.route.params.key == 'undefined' &&
                typeof this.props.route.params.book_status == 'undefined' &&
                typeof this.props.route.params.type_of_book != 'undefined' ) {
            var type_of_book = this.props.route.params.type_of_book;

            var url_param = "";
            for(var i=0; i<type_of_book.length; i++) {
                if(i != type_of_book.length-1) {
                    url_param += type_of_book[i] + ",";
                } else {
                    url_param += type_of_book[i]
                }
            }
            fetch(server + '/searching/filter?type_of_book=' + url_param)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    is_loading: false,
                    books: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });     
        }
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {        
        return (
            <View style={styles.box_screen}>
                <Header
                    navigation={this.props.navigation}
                    press_filter_btn={() => {
                        this.setState({
                            display_filter_option: true
                        })
                    }}
                /> 

                {
                    this.state.is_loading == true ? //Nếu chưa load xong dữ liệu thì hiển thị icon loading
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator style={{ flex: 1 }} />
                        </View> :
                        this.state.books.length > 0 ? //Nếu không có đầu sách phù hợp thì hiển thị thông báo
                            <BooksSearching 
                                books={this.state.books} 
                                navigation={this.props.navigation}
                            /> :
                            <Text style={{width: '100%', color: '#6b6b6b', padding: 20, fontSize: 16, textAlign: 'center'}}>Không có sách phù hợp</Text>
                }
                        
                {
                    this.state.display_filter_option == true ?
                        <FilterOption
                            press_close_btn={() => {
                                this.setState({
                                    display_filter_option: false
                                });
                            }}
                        /> :
                        null
                }
            </View>
            );
    }
}
export default SearchingResultsScreen;

const styles = StyleSheet.create({
    box_screen: {
        flex: 1
    },

    box_header: {
        padding: 5,
        paddingTop: 30,
        paddingBottom: 7,
        backgroundColor: '#D96704',
        flexDirection: 'row'
    },
    searching_box: {
        padding: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        height: 35,
        flexDirection: 'row',
        flex: 3
    },
    searching_input: {
        flex: 10,
    },

    screen_filter_option: {
        backgroundColor: ['rgba(0,0,0,0.2)', 'transparent'],
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: 80,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
    box_filter_option: {
        position: 'relative',
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10,
    },
    box_header_filter_option: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomColor: '#dadada', 
        borderBottomWidth: 1, 
        paddingBottom: 10,
        marginBottom: 10
    },
    type_of_book_btn: {
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#D96704',
        borderRadius: 5,
        margin: 10,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    submit_filter_btn: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#D96704',
        borderRadius: 5,
        alignSelf: 'center',
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
});
