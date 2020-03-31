import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image, TextInput, Keyboard, TouchableHighlight, ActivityIndicator } from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Slideshow from 'react-native-slideshow';
import { LinearGradient } from 'expo-linear-gradient';

import {getTimeLeft, server} from '../../config';

// Header
class Header extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{ position: 'absolute', paddingTop: 20, zIndex: 2, width: '100%', }}
            >
                <TouchableWithoutFeedback onPress={this.props.onPressBackButton} >
                    <IconEntypo name="chevron-left" color="white" size={30} style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, opacity: 1 }} />
                </TouchableWithoutFeedback>
            </LinearGradient>
            );
    }
}

// Hình ảnh của sách
class ImageSlideShow extends React.Component {
    render() {

        // Set giá trị cho biến imagesLink lưu đường dẫn của các ảnh
        var imagesLink = [];
        for (var i = 0; i < this.props.images.length; i++) {
            imagesLink.push({ url: server + this.props.images[i].image_path })
        }

        return (
            <Slideshow
                dataSource={imagesLink}
                height={300}
            />
        );
    }
}

// Thông tin của sách (Tên, giá, trạng thái,...)
class BookInfo extends React.Component {

    render() {
        return (
            <View style={{ padding: 10, marginTop: 10 }}>

                <View style={{ paddingBottom: 20, borderBottomColor: '#cacaca', borderBottomWidth: 1 }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.props.details[0].title}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View style={[styles.box_info, { paddingBottom: 2 }]}>
                                <IconAntDesign name='pay-circle-o1' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                <Text style={{ fontSize: 22 }}>{this.props.details[0].price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ</Text>
                            </View>

                            <View style={[styles.box_info]}>
                                <IconAntDesign name='profile' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                <Text>{this.props.details[0].type_of_book}</Text>
                            </View>

                            {
                                this.props.details[0].author != "" ?
                                <View style={[styles.box_info]}>
                                    <IconAntDesign name='user' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                    <Text>{this.props.details[0].author}</Text>
                                </View> :
                                null
                            }

                            <View style={[styles.box_info]}>
                                <IconAntDesign name='infocirlceo' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                <Text>Mới {this.props.details[0].status}%</Text>
                            </View>

                            <View style={[styles.box_info]}>
                                <IconAntDesign name='clockcircleo' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                <Text style={{ color: '#6b6b6b' }}>{getTimeLeft(this.props.details[0].time_update)}</Text>
                            </View>
                        </View>

                        <View style={{ alignSelf: 'flex-end' }}>
                            <IconEntypo name='heart-outlined' color='#D96704' size={30} />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#D6D6D6', borderRadius: 5, padding: 10, marginTop: 10, marginBottom: 20 }}>
                        <Text>{this.props.details[0].describle}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: server + this.props.details[0].avatar }} style={{ borderRadius: 5, height: 50, width: 50 }} />
                            <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: 'center' }}>{this.props.details[0].name}</Text>
                        </View>

                        <View style={{ borderColor: '#D96704', borderWidth: 1, borderRadius: 3, alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }}>
                            <IconAntDesign name='eyeo' color='#D96704' size={20} />
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

// Cách liên lạc với người bán (Nhắn tin điện thoại, nhắn tin trực tiếp bằng chat trong ứng dụng)
class Contact extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, padding: 10, backgroundColor: 'transparent' }}>
                <View style={[styles.box_chat_button]} >
                    <Text style={[styles.text_chat_button]} >
                        <IconEntypo name='message' color='white' size={17} /> Nhắn tin
                            </Text>
                </View>

                <View style={[styles.box_chat_button]} >
                    <Text style={[styles.text_chat_button]} >
                        <IconEntypo name='chat' color='white' size={17} /> Chat
                            </Text>
                </View>
            </View>
            );
    }
}

// Một bình luận
class OneComment extends React.Component {
    render() {
        return (
            <View style={{ padding: 5, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: server + this.props.comments.avatar }} style={{ width: 40, height: 40, borderRadius: 100 }} />
                    <View style={[
                        styles.box_one_comment_content,
                        { maxWidth: 305 }]}
                    >
                        <Text style={{ fontWeight: '600' }}>{this.props.comments.name}</Text>
                        <Text>{this.props.comments.content}</Text>
                    </View>
                </View>

                <View style={[
                    styles.box_input_feild,
                    { marginLeft: 80 }]}
                >
                    <TextInput placeholder="Viết trả lời..." style={{ padding: 5, flex: 3 }}></TextInput>
                    <TouchableHighlight underlayColor='#dadada'>
                        <Text style={[styles.text_comment_btn]}>Gửi</Text>
                    </TouchableHighlight>
                </View>

                {
                    this.props.comments_reply.map(function (note, index) {
                        return (
                            <View style={{ paddingLeft: 45, paddingTop: 10, flexDirection: 'row' }} key={index}>
                                <Image source={{ uri: server + note.avatar }} style={{ width: 30, height: 30, borderRadius: 100 }} />
                                <View style={[
                                    styles.box_one_comment_content,
                                    { maxWidth: 265 }]}
                                >
                                    <Text style={{ fontWeight: '600' }}>{note.name}</Text>
                                    <Text>{note.content}</Text>
                                </View>
                            </View>
                        );
                    })
                }

                
            </View>
            );
    }
}
// Bình luân về sách
var comments;
class Comments extends React.Component {

    constructor(props) {
        super(props);
        comments = this;
        this.state = {
        }
    }

    render() {
        return (
            <View style={[{ margin: 10, paddingBottom: 10, borderBottomColor: '#cacaca', borderBottomWidth: 1 }]}>
                <View>
                    <Text style={[styles.category_text]}>Bình luận</Text>
                </View>

                {
                    this.props.comments.map(function (note, index) {
                        var reply = [];
                        for (var i = 0; i < comments.props.comments_reply.length; i++) {
                            if (comments.props.comments_reply[i].comment_id == note.comment_id) {
                                reply.push(comments.props.comments_reply[i])
                            }
                        }
                        return (
                            <OneComment
                                key={index}
                                comments={note}
                                comments_reply={reply}
                            />
                            )
                    })
                }               

                <View style={[
                    styles.box_input_feild,
                    { marginLeft: 50 }]}
                >
                    <TextInput placeholder="Viết bình luận..." style={{ flex: 3, padding: 5 }}></TextInput>
                    <TouchableHighlight underlayColor='#dadada'>
                        <Text style={[styles.text_comment_btn]}>Gửi</Text>
                    </TouchableHighlight>
                </View>

            </View>
            );
    }
}

// Một quyển sách gợi ý
class OneBookRecommend extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.onPressBook(this.props.book.book_id);
            }} >
                <View style={{ margin: 10, width: 150 }}>
                    <Image source={{ uri: server + this.props.book.image_path }} style={{ width: 150, height: 150 }} />
                    <Text style={{ fontWeight: '600', paddingTop: 10 }}>{this.props.book.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <IconAntDesign name='infocirlceo' color='#D96704' size={10} style={[styles.info_icon_style]} />
                        <Text style={{ fontSize: 13 }}>Mới {this.props.book.status}%</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <IconAntDesign name='pay-circle-o1' color='#D96704' size={10} style={[styles.info_icon_style]} />
                        <Text style={{ fontSize: 13 }}>{this.props.book.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>            
            );
    }
}
// Sách gợi ý
var book_recommended;
class BooksRecommend extends React.Component {

    constructor(props) {
        super(props);
        book_recommended = this;
    }

    render() {
        return (
            <View style={{ paddingBottom: 20 }}>
                <View style={{ padding: 10 }}>
                    <Text style={[styles.category_text]}>Sách cùng thể loại</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }} >
                    {
                        this.props.books.map(function (note, index) {
                            return (
                                <OneBookRecommend book={note} key={index} onPressBook={book_recommended.props.onPressBook} />
                                )
                        })
                    }
                </ScrollView>
            </View>
            );
    }
}

class BookDetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    //Hàm lấy dữ liệu từ server
    // Tham số truyền vào là id của sách
    getDataFromServer = (book_id) => {
        fetch(server + '/book-details/' + book_id + '/details')
            .then((response) => response.json())
            .then((responseJsonDetails) => {

                fetch(server + '/book-details/' + book_id + '/recommended')
                    .then((response) => response.json())
                    .then((responseJsonRecommended) => {
                        this.setState({
                            isLoading: false,
                            details: responseJsonDetails,
                            books_recommended: responseJsonRecommended
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        const { book_id } = this.props.route.params;
        this.getDataFromServer(book_id);
    }

    render() {
        // Biến lưu navigation của trang trước 
        // vd: Nếu book detail được hiển thị khi click vào sách ở trang home thì previousScreen là 'Home'
        // biến dùng để xác định screen trước đó khi click vào button quay lại ở header
        const { previousScreen } = this.props.route.params;
        const { book_id } = this.props.route.params;

        // Nếu chưa load được dữ liệu thì return ra màn hình trắng với icon loading
        // Nếu load được dữ liệu thì return ra nội dung
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{ paddingBottom: 50}}>
                <Header onPressBackButton={() => {
                    this.props.navigation.navigate(previousScreen);
                }} />

                <ScrollView>
                    <ImageSlideShow images={this.state.details.images} />
                    <BookInfo details={this.state.details.details} />
                    <Comments comments={this.state.details.comments} comments_reply={this.state.details.comments_reply} />
                    <BooksRecommend
                        books={this.state.books_recommended}
                        onPressBook={this.getDataFromServer}
                    />
                </ScrollView>

                <Contact />
            </View>
        );
    }
}
export default BookDetailScreen;

const styles = StyleSheet.create({
    info_icon_style: {
        alignSelf: 'center',
        paddingLeft: 3,
        paddingRight: 3
    },
    box_info: {
        flexDirection: 'row',
        paddingBottom: 5
    }, 
    box_chat_button: {
        borderRadius: 5,
        padding: 10,
        width: 100,
        backgroundColor: '#D96704',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 30,
        marginRight: 30
    },
    text_chat_button: { 
        color: 'white',
        textAlign: 'center',
        width: '100%'
    },

    box_one_comment_content: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#D6D6D6',
        marginLeft: 5 
    },
    text_comment_btn: {
        textAlign: 'center',
        color: 'blue',
        borderRadius: 20,
        padding: 5,
        flex: 1
    },
    box_input_feild: {
        backgroundColor: '#e6e6e6',
        padding: 5,
        borderRadius: 20,
        marginRight: 5,
        marginTop: 10,
        flexDirection: 'row' 
    },

    category_text: {
        fontSize: 18,
        fontWeight: '500'
    }
});