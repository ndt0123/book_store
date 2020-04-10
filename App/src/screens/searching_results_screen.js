
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Image, Keyboard } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {getTimeLeft, server} from '../../config.js';

var searchingRecommend;
var header;
var books_searching;
var filter_option;

// Header
class Header extends React.Component {
    constructor(props) {
        super(props);
        header = this;
        this.state = {
            searching_value: ''
        }
    }

    /*Sự kiện thay đổi nội dung khung tìm kiếm*/
    changeSearchingValue = (value) => {
        this.setState({
            searching_value: value,
        });

        // Gọi callback function từ component cha SearchingResultScreen
        this.props.change_searching_value(value);
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
                    <TextInput 
                        style={styles.searching_input} 
                        value={this.state.searching_value} 
                        onChangeText={this.changeSearchingValue}
                        onBlur={this.props.blur_on_searching_input}
                        placeholder='Tìm kiếm'
                        ></TextInput>
                    <TouchableWithoutFeedback>
                        <IconFontAwesome name="search" color="#eee" size={24} 
                            style={{ padding: 2, flex: 1 }} 
                            onPress={() => {
                                if(this.state.searching_value.trim() != '') {
                                    this.props.get_searching_result(this.state.searching_value.trim());
                                    this.setState({
                                        searching_value: '',
                                    });
                                }
                            }}    
                        />
                    </TouchableWithoutFeedback>
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

//Gợi ý tìm kiếm
class SearchingRecommend extends React.Component {
    constructor(props) {
        super(props);
        searchingRecommend = this;
    }
    render() {
        return(
            <View style={{ paddingLeft: 20, paddingRight: 20}}>
                {
                        this.props.recommend_searching.map(function(note, index) {
                            return(
                                <TouchableWithoutFeedback 
                                    key={index} 
                                    onPress={() => {
                                        header.setState({
                                            searching_value: ''
                                        })
                                        searchingRecommend.props.get_searching_result(note);
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
        );
    }
}

// Tùy chọn lọc
class FilterOption extends React.Component {

    constructor(props) {
        super(props);
        filter_option = this;
        this.state = {
            book_status_filter: [],
            type_of_book_filter: [],
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

    // Nếu click vào các lựa chọn về type_of_book thì
    // Nếu trong mảng type_of_book_filter đã có thì xóa khỏi mảng
    // Nếu chưa có thì thêm vào
    onPressTypeFilterBtn = (type) => {
        var flag_type = this.state.type_of_book_filter;
        var index = flag_type.indexOf(type);

        if(index >= 0) {
            flag_type.splice(index, 1);
            this.setState({
                type_of_book_filter: flag_type
            })
        } else {
            flag_type.push(type);
            this.setState({
                type_of_book_filter: flag_type
            })
        }
    }

    // Nếu click vào các lựa chọn về status_book thì
    // Nếu trong mảng book_status_filter đã có thì xóa khỏi mảng
    // Nếu chưa có thì thêm vào
    onPressStatusFilterBtn = (status) => {

        var flag_status = this.state.book_status_filter;
        var index = flag_status.indexOf(status);

        if(index >= 0) {
            flag_status.splice(index, 1);
            this.setState({
                book_status_filter: flag_status
            })
        } else {
            flag_status.push(status);
            this.setState({
                book_status_filter: flag_status
            })
        }
    }

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
                            {
                                this.state.list_type_of_book.map( function (note, index) {
                                    if(index + 1 < filter_option.state.list_type_of_book.length && index % 2 == 0) {
                                        return(
                                            <View key={index}>
                                                <TouchableWithoutFeedback onPress={() => filter_option.onPressTypeFilterBtn(filter_option.state.list_type_of_book[index].type_of_book)}>
                                                    <View style={styles.type_of_book_btn}>
                                                        <Text style={{ color: '#D96704' }}>{filter_option.state.list_type_of_book[index].type_of_book}</Text>
                                                        {
                                                            filter_option.state.type_of_book_filter.indexOf(filter_option.state.list_type_of_book[index].type_of_book) >= 0 ?
                                                                <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} /> :
                                                                null
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => filter_option.onPressTypeFilterBtn(filter_option.state.list_type_of_book[index+1].type_of_book)}>
                                                    <View style={styles.type_of_book_btn}>
                                                        <Text style={{ color: '#D96704' }}>{filter_option.state.list_type_of_book[index+1].type_of_book}</Text>
                                                        {
                                                            filter_option.state.type_of_book_filter.indexOf(filter_option.state.list_type_of_book[index+1].type_of_book) >= 0 ?
                                                                <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} /> :
                                                                null
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        );
                                    } else if(index + 1 >= filter_option.state.list_type_of_book.length && index % 2 == 0) {
                                        return(
                                            <View key={index}>
                                                <TouchableWithoutFeedback onPress={() => filter_option.onPressTypeFilterBtn(filter_option.state.list_type_of_book[index].type_of_book)}>
                                                    <View style={styles.type_of_book_btn}>
                                                        <Text style={{ color: '#D96704' }}>{filter_option.state.list_type_of_book[index].type_of_book}</Text>
                                                        {
                                                            filter_option.state.type_of_book_filter.indexOf(filter_option.state.list_type_of_book[index].type_of_book) >= 0 ?
                                                                <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} /> :
                                                                null
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        );
                                    }
                                })
                            }
                            
                        </ScrollView>
                    </View>

                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 18, color: '#6b6b6b' }}>Tình trạng sách</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20}}>
                            <TouchableWithoutFeedback onPress={() => this.onPressStatusFilterBtn('Sách cũ')}>
                                <View style={styles.type_of_book_btn}>
                                    <Text style={{ color: '#D96704' }}>Sách cũ</Text>
                                    {
                                        this.state.book_status_filter.indexOf('Sách cũ') >= 0 ?
                                            <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} /> :
                                            null
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.onPressStatusFilterBtn('Sách mới')}>
                                <View style={styles.type_of_book_btn}>
                                    <Text style={{ color: '#D96704' }}>Sách mới</Text>
                                    {
                                        this.state.book_status_filter.indexOf('Sách mới') >= 0 ?                                        
                                            <IconEntypo name='check' color='green' size={16} style={{ paddingLeft: 3 }} /> : 
                                            null
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20, borderTopWidth: 1, borderTopColor: '#dadada'}}>
                        <TouchableWithoutFeedback onPress={() => this.props.press_on_filter_btn(this.state.type_of_book_filter, this.state.book_status_filter)}>
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
                        <Text style={{ fontWeight: 'bold', flex: 3, maxHeight: 50 }} >{this.props.book.title}</Text>
                        
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            {
                                this.props.book.status == 100 ?
                                    <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách mới (100%)</Text> :
                                    <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách cũ ({this.props.book.status}%)</Text> 
                            }
                            <Text style={{ flex: 1, textAlign: 'right', color: '#6b6b6b' }}>{this.props.book.type_of_book}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#6b6b6b' }}>{this.props.book.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ</Text>
                            <Text style={{ flex: 1, textAlign: 'right', color: '#6b6b6b', fontSize: 12 }}>{getTimeLeft(this.props.book.time_update)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

// Danh sách kết quả tìm kiếm
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
            display_searching_recommend: false,
            recommend_searching: [],
        }
    }

    // Lấy dữ liệu từ API khi hiển thị trang
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

            fetch(server + '/searching/filter?book_status=' + book_status)
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

            fetch(server + '/searching/filter?type_of_book=' + type_of_book)
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

    // Lấy dữ liệu về các gợi ý tìm kiếm từ server
    getSearchingRecommedFromServer = (key) => {
        fetch(server + '/searching/recommend?key=' + key)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    recommend_searching: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //Lấy dữ liệu từ API khi tìm kiếm trong khung tìm kiếm
    getResultWithKey = (key) => {        
        fetch(server + '/searching?key=' + key)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    books: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({
            display_searching_recommend: false
        })
        Keyboard.dismiss();
    }

    // Lấy dữ liệu khi sử dụng bộ lọc
    getResultWithFlter = (type, status) => {
        // Nếu có điều kiện lọc thì mới thực hiện lọc
        // Tức type và status phải có phần tử
        if(type.length > 0 || status.length > 0) {
            var url_param = '/searching/filter?'; // url

            if(type.length > 0) {
                url_param += 'type_of_book=';
                for(var i=0; i<type.length; i++) {
                    if(i != type.length-1) {
                        url_param += type[i] + ',';
                    } else {
                        url_param += type[i];
                    }
                }
            }
            if(status.length > 0) {
                if(type.length > 0) {
                    url_param += '&book_status=';
                } else {
                    url_param += 'book_status=';
                }
                
                for(var i=0; i<status.length; i++) {
                    if(i != status.length-1) {
                        url_param += status[i] + ',';
                    } else {
                        url_param += status[i];
                    }
                }
            }

            // fetch dữ liệu trên API
            fetch(server + url_param)
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

            this.setState({
                display_filter_option: false
            })
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
                    get_searching_result={this.getResultWithKey} //Hiển thị kết quả khi tìm kiếm trong khung tìm kiếm
                    press_filter_btn={() => {
                        // Ẩn đi bàn phím và blur khỏi khung tìm kiếm
                        Keyboard.dismiss();
                        //
                        this.setState({
                            display_filter_option: true
                        })
                    }}
                    change_searching_value={(value) => { //Sự kiện thay đổi nội dung khung tìm kiếm để hiển thị gợi ý
                        //Nếu value là các khoảng trắng thì không hiển thị khung gợi ý
                        if(value.trim() == '') {
                            this.setState({
                                display_searching_recommend: false
                            })
                        } else {
                            this.setState({
                                display_searching_recommend: true
                            })

                            // Gọi hàm lấy dữ liệu từ server
                            this.getSearchingRecommedFromServer(value.trim());
                        }
                        
                    }}
                    blur_on_searching_input={() => { //Nếu sự kiện blur khỏi khung tìm kiếm xảy ra thì không hiển thị gợi ý nữa
                        this.setState({
                            display_searching_recommend: false
                        })
                    }}
                /> 

                {
                    this.state.is_loading == true ? //Nếu chưa load xong dữ liệu thì hiển thị icon loading
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator style={{ flex: 1 }} />
                        </View> :

                        this.state.display_searching_recommend == true ? //Nếu focus vào khung tìm kiếm thì hiển thị danh sách gợi ý
                            <SearchingRecommend 
                                recommend_searching={this.state.recommend_searching}
                                get_searching_result={this.getResultWithKey} //Hiển thị kết quả khi tìm kiếm trong khung tìm kiếm
                            /> :

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
                            press_on_filter_btn = {this.getResultWithFlter}
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
