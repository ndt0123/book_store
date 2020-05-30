import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image, TextInput, Keyboard, TouchableHighlight, ActivityIndicator, AsyncStorage, Alert } from 'react-native';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Slideshow from 'react-native-slideshow';
import { LinearGradient } from 'expo-linear-gradient';

import {getTimeLeft, server} from '../../config';

var book_recommended;
var comments;

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
    constructor(props) {
        super(props);
        this.state = {
            imagesLink: []
        }
    }
    componentDidMount() {
        // Set giá trị cho biến imagesLink lưu đường dẫn của các ảnh
        var images = []
        for (var i = 0; i < this.props.images.length; i++) {
            images.push({ url: server + this.props.images[i].image_path })
        }
        this.setState({
            imagesLink: images
        })
    }

    render() {
        return (
            <Slideshow
                dataSource={this.state.imagesLink}
                height={300}
            />
        );
    }
}

// Thông tin của sách (Tên, giá, trạng thái,...)
class BookInfo extends React.Component {

    // Hàm xử lý để thêm người dùng theo dõi sách
    watchingBook = () => {
        fetch(server + '/book-details/' + this.props.details[0].book_id + '/watching?user_id=' + this.props.logged_in_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        {
                            text: 'OK',
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                )
            } else if(responseJson.status == 'success') {
                this.props.update_state_watching_following(this.props.details[0].book_id);
            }
        })
    }

    // Hàm xử lý khi người dùng hủy theo dõi sách
    unwatchingBook = () => {
        fetch(server + '/book-details/' + this.props.details[0].book_id + '/unwatching?user_id=' + this.props.logged_in_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        {
                            text: 'OK',
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                )
            } else if(responseJson.status == 'success') {
                this.props.update_state_watching_following(this.props.details[0].book_id);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Hàm xử lý để thêm người dùng theo dõi người dùng
    followingUser = () => {
        fetch(server + '/book-details/' + this.props.details[0].user_id + '/following?user_id=' + this.props.logged_in_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        {
                            text: 'OK',
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                )
            } else if(responseJson.status == 'success') {
                this.props.update_state_watching_following(this.props.details[0].book_id);
            }
        })
    }

    // Hàm xử lý khi người dùng hủy theo dõi người dùng
    unfollowingUser = () => {
        fetch(server + '/book-details/' + this.props.details[0].user_id + '/unfollowing?user_id=' + this.props.logged_in_id)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == 'error') {
                Alert.alert(
                    'Thông báo',
                    'Đã xảy ra lỗi',
                    [
                        {
                            text: 'OK',
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                )
            } else if(responseJson.status == 'success') {
                this.props.update_state_watching_following(this.props.details[0].book_id);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Khi press vào nút quan tâm sách
    pressOnWatchingBtn = () => {
        // Nếu người dùng đã theo dõi sách trước đó thì khi nhấn vào sẽ hiển thị thông báo hỏi xem có muốn hủy theo dõi không
        // Còn nếu chưa theo dõi thì hỏi xem có đồng ý thêm vào danh sách quan tâm không
        if(this.props.is_watching_book) {
            Alert.alert(
                "Thông báo",
                "Bỏ quan tâm sách?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                        // Gọi hàm xử lý hủy theo dõi sách
                        this.unwatchingBook();
                    } }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Thông báo",
                "Thêm vào danh sách quan tâm?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                        // Gọi hàm xử lý theo dõi sách
                        this.watchingBook();
                    } }
                ],
                { cancelable: false }
            );
        }
    }

    // Khi press vào nút theo dõi người dùng
    pressOnFollowingBtn = () => {
        // Nếu người dùng đã theo dõi người bán trước đó thì khi nhấn vào sẽ hiển thị thông báo hỏi xem có muốn hủy theo dõi không
        // Còn nếu chưa theo dõi thì hỏi xem có đồng ý theo dõi không
        if(this.props.is_following_user) {
            Alert.alert(
                "Thông báo",
                "Bỏ theo dõi người dùng này?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                        this.unfollowingUser()
                    } }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Thông báo",
                "Theo dõi người dùng này?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                        this.followingUser();
                    } }
                ],
                { cancelable: false }
            );
        }
    }

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

                            <View style={[styles.box_info]}>
                                <IconEntypo name='location' color='#D96704' size={10} style={[styles.info_icon_style]} />
                                <Text style={{ color: '#6b6b6b' }}>{this.props.details[0].position}</Text>
                            </View>
                        </View>

                        {
                            this.props.logged_in && this.props.logged_in_id != this.props.details[0].user_id ?
                            <TouchableWithoutFeedback onPress={this.pressOnWatchingBtn}>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    {
                                        this.props.is_watching_book ?
                                        <IconEntypo name='heart' color='#D96704' size={30} /> :
                                        <IconEntypo name='heart-outlined' color='#D96704' size={30} />
                                    }
                                </View>
                            </TouchableWithoutFeedback> : null
                        }
                    </View>

                    <View style={{ backgroundColor: '#D6D6D6', borderRadius: 5, padding: 10, marginTop: 10, marginBottom: 20 }}>
                        <Text>{this.props.details[0].describle}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: server + this.props.details[0].avatar }} style={{ borderRadius: 5, height: 50, width: 50 }} />
                            <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: 'center' }}>{this.props.details[0].name}</Text>
                        </View>

                        {
                            this.props.logged_in && this.props.logged_in_id != this.props.details[0].user_id ?
                            <TouchableWithoutFeedback onPress={this.pressOnFollowingBtn}>
                                {
                                    this.props.is_following_user ?
                                    <View style={{ borderColor: '#D96704', backgroundColor: '#D96704', borderWidth: 1, borderRadius: 3, alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <IconAntDesign name='eyeo' color='white' size={20} />
                                    </View> :
                                    <View style={{ borderColor: '#D96704', borderWidth: 1, borderRadius: 3, alignSelf: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <IconAntDesign name='eyeo' color='#D96704' size={20} />
                                    </View>
                                }
                            </TouchableWithoutFeedback> : null
                        }
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
                <TouchableWithoutFeedback>
                    <View style={[styles.box_chat_button, {backgroundColor: '#29a705'}]} >
                        <Text style={[styles.text_chat_button]} >
                            <IconEntypo name='phone' color='white' size={17} /> Gọi điện
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Conversation', {
                        partner_id: this.props.user_id,
                        partner_name: this.props.user_name,
                        partner_avatar: this.props.user_avatar,
                        logged_in_id: this.props.logged_in_id
                    })
                }}>
                    <View style={[styles.box_chat_button]} >
                        <Text style={[styles.text_chat_button]} >
                            <IconEntypo name='chat' color='white' size={17} /> Chat
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            );
    }
}

// Một bình luận
class OneComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment_reply_content: ""
        }
    }

    pressOnSubmitCommentBtn = () => {
        var comment_reply_content = this.state.comment_reply_content.trim();
        if(comment_reply_content != "") {
            // // Tiến hành thêm bình luận vào csdl
            fetch(server + '/book-details/comment/' + this.props.book_id + '/post-comment-reply', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user_comment: this.props.logged_in_id,
                    content: comment_reply_content,
                    comment_id: this.props.comments.comment_id
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status == 'error') {
                    Alert.alert(
                        'Thông báo',
                        'Đã xảy ra lỗi',
                        [
                            {
                                text: 'OK',
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    )
                } else if(responseJson.status == 'success') {
                    this.props.update_comment_content(this.props.book_id);
                }
                this.setState({
                    comment_reply_content: ""
                })
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

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

                {
                    this.props.logged_in ?
                    <View style={[
                        styles.box_input_feild,
                        { marginLeft: 80 }]}
                    >
                        <TextInput 
                            placeholder="Viết trả lời..." 
                            style={{ padding: 5, flex: 3 }}
                            value={this.state.comment_reply_content}
                            onChangeText={(value) => {
                                this.setState({
                                    comment_reply_content: value
                                })
                            }}></TextInput>
                        <TouchableHighlight 
                            underlayColor='#dadada'
                            onPress={this.pressOnSubmitCommentBtn}>
                            <Text style={[styles.text_comment_btn]}>Gửi</Text>
                        </TouchableHighlight>
                    </View> : null
                }

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
class Comments extends React.Component {

    constructor(props) {
        super(props);
        comments = this;
        this.state = {
            comment_content: ""
        }
    }

    // Xử lý khi có sự kiện press on nút "gửi"
    pressOnSubmitCommentBtn = () => {
        var comment_content = this.state.comment_content.trim();
        if(comment_content != "") {
            // Tiến hành thêm bình luận vào csdl
            fetch(server + '/book-details/comment/' + this.props.book_id + '/post-comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user_comment: this.props.logged_in_id,
                    content: comment_content
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status == 'error') {
                    Alert.alert(
                        'Thông báo',
                        'Đã xảy ra lỗi',
                        [
                            {
                                text: 'OK',
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    )
                } else if(responseJson.status == 'success') {
                    this.props.update_comment_content(this.props.book_id);
                }

                this.setState({
                    comment_content: ""
                })
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    render() {
        return (
            <View style={[{ margin: 10, paddingBottom: 10, borderBottomColor: '#cacaca', borderBottomWidth: 1 }]}>
                <View>
                    <Text style={[styles.category_text]}>Bình luận</Text>
                </View>

                {
                    this.props.comments.length == 0 ?
                    <View style={{ padding: 10}}>
                        <Text style={{color: '#6b6b6b'}}>Không có bình luận.</Text>
                    </View> : null
                }

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
                                logged_in={comments.props.logged_in}
                                logged_in_id={comments.props.logged_in_id}
                                update_comment_content={comments.props.update_comment_content}
                                book_id={comments.props.book_id}
                            />
                            )
                    })
                }               

                {
                    this.props.logged_in ?
                    <View style={[
                        styles.box_input_feild,
                        { marginLeft: 50 }]}
                    >
                        <TextInput 
                            placeholder="Viết bình luận..." 
                            style={{ flex: 3, padding: 5 }}
                            value={this.state.comment_content}
                            onChangeText={(value) => {
                                this.setState({
                                    comment_content: value
                                })
                            }}>
                        </TextInput>
                        <TouchableHighlight 
                            underlayColor='#dadada'
                            onPress={this.pressOnSubmitCommentBtn}>
                            <Text style={[styles.text_comment_btn]}>Gửi</Text>
                        </TouchableHighlight>
                    </View> : null
                }

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
class BooksRecommend extends React.Component {

    constructor(props) {
        super(props);
        book_recommended = this;
    }

    render() {
        return (
            <View style={{ paddingBottom: 40 }}>
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
            isLoadingInfo: true,
            isLoadingRecommended: true,
            logged_in: false,
            logged_in_id: 0,
            details: [],
            images: [],
            comments: [],
            comments_reply: [],
            books_recommended: [],
            is_watching_book: false,
            is_following_user: false,
            is_loading_new_data: false,
        }
    }

    // Hàm lấy dữ liệu về thông tin của sách từ server
    // Set giá trị cho biến state.details với thông tin vừa nhận và state.isLoading=false
    getBookInfo = (book_id) => {
        fetch(server + '/book-details/' + book_id + '/details')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoadingInfo: false,
                details: responseJson.details,
                images: responseJson.images,
                comments: responseJson.comments,
                comments_reply: responseJson.comments_reply
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Hàm lấy dữ liệu về các quyển sách được gợi ý
    // Set giá trị cho biến state.books_recommended
    getBookRecommended = (book_id) => {
        fetch(server + '/book-details/' + book_id + '/recommended')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoadingRecommended: false,
                books_recommended: responseJson
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Hàm kiểm tra xem người dùng đăng nhập có theo dõi sách hay theo dõi người dùng không
    getIsWatchingFollowing = async (book_id) => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let user_id = JSON.parse(userData);
            if(user_id != null) {
                fetch(server + '/book-details/' + book_id + '/watching-following?user_id=' + user_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        is_watching_book: responseJson.is_watching,
                        is_following_user: responseJson.is_following
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Lấy toàn bộ comment của sách
    getComment = (book_id) => {
        fetch(server + '/book-details/comment/' + book_id)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                is_loading_new_data: false,
                comments: responseJson.comments,
                comments_reply: responseJson.comments_reply
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Kiểm tra xem người dùng đã đăng nhập chưa
    // Bằng cách kiểm tra xem trong AsyncStorage có user_id không
    // Nếu đã đăng nhập thì set biến state.logged_in = true
    isLoggedIn = async () => {
        try {
            let userData = await AsyncStorage.getItem("user_id");
            let user_id = JSON.parse(userData);
            if(user_id == null) {
                this.setState({
                    logged_in: false
                })
            } else {
                this.setState({
                    logged_in: true,
                    logged_in_id: user_id,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        this.isLoggedIn();
        
        //Biến params được pass từ screen trước chứa id của quyển sách
        const { book_id } = this.props.route.params;
        
        // Gọi hàm lấy dữ liệu về quyến sách từ server
        this.getBookInfo(book_id);
        this.getBookRecommended(book_id);
        this.getIsWatchingFollowing(book_id);
    }

    render() {

        // Nếu chưa load được dữ liệu thì return ra màn hình trắng với icon loading
        // Nếu load được dữ liệu thì return ra nội dung
        if (this.state.isLoadingRecommended || this.state.isLoadingInfo) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{ flex: 1 }} />
                </View>
            )
        }
        return (
            <View>
                <Header onPressBackButton={() => {
                    this.props.navigation.goBack();
                }} />

                <ScrollView
                    onScroll = { (e) => {
                        if(e.nativeEvent.contentOffset.y == 0){
                            this.setState({
                                is_loading_new_data: true,
                            })
                            this.getComment(this.props.route.params.book_id);
                        }
                    }}>
                    {
                        this.state.is_loading_new_data ? 
                            <View style={{padding: 10}}>
                                <ActivityIndicator />
                            </View> : null
                    }
                    <ImageSlideShow 
                        images={this.state.images} />
                    <BookInfo 
                        details={this.state.details} 
                        logged_in={this.state.logged_in}
                        logged_in_id={this.state.logged_in_id}
                        is_watching_book={this.state.is_watching_book}
                        is_following_user={this.state.is_following_user}
                        update_state_watching_following={this.getIsWatchingFollowing}/>
                    <Comments 
                        comments={this.state.comments} 
                        comments_reply={this.state.comments_reply} 
                        logged_in={this.state.logged_in} 
                        logged_in_id={this.state.logged_in_id}
                        book_id={this.props.route.params.book_id}
                        update_comment_content={this.getComment}/>
                    <BooksRecommend
                        books={this.state.books_recommended}
                        onPressBook={(book_id) => {
                            this.setState({
                                isLoadingInfo: true,
                                isLoadingRecommended: true,
                            })
                            this.getBookInfo(book_id);
                            this.getBookRecommended(book_id);
                            this.getIsWatchingFollowing(book_id);
                        }}
                    />
                </ScrollView>

                {
                    this.state.logged_in && this.state.logged_in_id != this.state.details[0].user_id ?
                    <Contact
                        navigation={this.props.navigation}
                        user_id={this.state.details[0].user_id}
                        user_name={this.state.details[0].name}
                        user_avatar={this.state.details[0].avatar}
                        logged_in_id={this.state.logged_in_id}/> : null
                }
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