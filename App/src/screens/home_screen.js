/*
 Màn hình của trang chủ khi khởi động ứng dụng
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

/*Header của màn hình */
class HomeHeader extends React.Component {
    state = {
        searchingValue: '', /*Biến lưu nội dung tìm kiếm*/
    }
    /*Sự kiện thay đổi nội dung khung tìm kiếm*/
    changeSearchingValue = (v) => {
        var value = v.trim();
        this.setState({
            searchingValue: value,
        });
    }

    render() {
        return (
            <View style={styles.box_header}>
                <View style={styles.searching_box}>
                    <TextInput style={styles.searching_input} value={this.state.searchingValue} onChangeText={this.changeSearchingValue} placeholder='Tìm kiếm'></TextInput>
                    <IconFontAwesome name="search" color="#eee" size={24} style={{ padding: 2, flex: 1 }} />
                </View>
            </View>
        );
    }
}

/*Một quyển sách */
class Book extends React.Component {

    // Lấy khoảng thời gian đã trôi qua từ lúc đăng bài (vd: 3 giờ trước)
    get_time_left = (time_update) => { 

        var time_present = new Date(); // Thời gian ở thời điểm hiện tại

        var time_update = new Date(this.props.book.time_update); // Thời điểm đăng bài

        var different_times = time_present.getTime() - time_update.getTime();

        var different_years = parseInt(different_times / (1000 * 3600 * 24 * 365));

        var different_months = parseInt(different_times / (1000 * 3600 * 24 * 30));

        var different_days = parseInt(different_times / (1000 * 3600 * 24));

        var different_hours = parseInt(different_times / (1000 * 3600));

        var different_minutes = parseInt(different_times / (1000 * 60));

        var different_seconds = parseInt(different_times / (1000));

        if (different_years > 0) {
            return different_years + ' năm trước';
        } else if (different_months > 0) {
            return different_months + ' tháng trước';
        } else if (different_days > 0) {
            return different_days + ' ngày trước';
        } else if (different_hours > 0) {
            return different_hours + ' giờ trước';
        } else if (different_minutes > 0) {
            return different_minutes + ' phút trước';
        } else if (different_seconds > 0) {
            return different_seconds + ' giây trước';
        }
    }

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
                            this.props.status == 100 ?
                                <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách mới (100%)</Text> :
                                <Text style={{ flex: 1, color: '#6b6b6b' }}>Sách cũ ({this.props.book.status}%)</Text>
                        }
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold', color: '#6b6b6b' }}>{this.props.book.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ</Text>
                            <Text style={{ flex: 1, textAlign: 'right', color: '#6b6b6b' }}>{this.get_time_left(this.props.book.time_update)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/*Phần các tùy chọn cho bộ lọc sách
 *      -Sách cũ, sách mới
 *      -Các thể loại sách
 * */
class BookOptionHome extends React.Component {

    render() {
        return (
            <View style={styles.box_option}>
                <View style={styles.box_old_new_book}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Searching', {
                            book_status: ['Sách cũ']
                        });
                    }}>
                        <View style={[styles.box_old_new_book_btn, , styles.border_right]}>
                            <Text style={styles.old_new_book_btn}><Icon name="book-multiple-remove" color="#41B7F0" size={16} /> Sách cũ</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Searching', {
                            book_status: ['Sách mới']
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
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Sách trinh thám']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Sách trinh thám</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Truyện tranh']
                                    });
                                }}>                                    
                                    <Text style={styles.type_of_book_btn}>Truyện tranh</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Tiểu thuyết']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Tiểu thuyết</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Sách thiếu nhi']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Sách thiếu nhi</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Kỹ năng sống']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Kỹ năng sống</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Ngôn tình']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Ngôn tình</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Văn học']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Văn học</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Văn hóa xã hội']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Văn hóa xã hội</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Chính trị']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Chính trị</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Pháp luật']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Pháp luật</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Khoa học công nghệ']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Khoa học công nghệ</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Kinh tế']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Kinh tế</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Văn học nghệ thuật']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Văn học nghệ thuật</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Giáo trình']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Giáo trình</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Tâm lý']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Tâm lý</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Tôn giáo']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Tôn giáo</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.navigation.navigate('Searching', {
                                        type_of_book: ['Lịch sử']
                                    });
                                }}>
                                    <Text style={styles.type_of_book_btn}>Lịch sử</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </ScrollView>

                    </ImageBackground>

                </View>
            </View>
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
        return (
            <View style={styles.box_screen}>
                <HomeHeader />

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
        paddingBottom: 7,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#D96704',
        flexDirection: 'row',
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
        width: '100%'
    },
    searching_input: {
        flex: 10
    }

});
